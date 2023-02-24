const User = require('./../models/userModel');
const jwt =  require('jsonwebtoken');
const crypto = require('crypto');
const Email = require('./../utils/email');
const { promisify } = require('util')
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

const signToken = id => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};

const createsendToken = (user, statuscode, res) => {
    const token = signToken(user._id);
    const cookieOptions = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 *60 * 1000
        ),
        secure: true,
        httpOnly: true
    };
    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
    res.cookie('jwt', token, cookieOptions);
    user.password = undefined;
  
    res.status(statuscode).json({
      status: 'success',
      token,
      data: {
        user
      }
    });
};

exports.signup = catchAsync(async (req, res , next)=> {
    const newUser = await User.create(req.body);

    const url = `${req.protocol}://${req.get('host')}/me`;

    await new Email(newUser, url).sendWelcome();

    createsendToken(newUser, 200, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email, password);
    //check if email and password exist
    if (!email || !password) {
      return next(new AppError('please provide email and password!', 400));
    }
    //ckeck if user exists && password is correct
    const user = await User.findOne({ email }).select('+password');
  
    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError('Incorrect email or password', 401));
    }
  console.log('success');
    //if everything ok,send token to client
    createsendToken(user, 200, res);
  });
  
  exports.logout = (req, res) => {
    res.cookie('jwt', 'loggedout', {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true
    });
    res.status(200).json({
      status: 'success'
    });
  };

  exports.protect = catchAsync(async (req, res, next) => {
    //getting token and check of its there
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }
  
    if (!token) {
      return next(
        new AppError('you are not logged in! please log in to access.', 401)
      );
    }
  
    //verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  
    //check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next(
        new AppError('The user belonging to this token no longer exist.', 401)
      );
    }
  
    //check if user changed password after the token was issued
    // if (currentUser.changedPasswordAfter(decoded.iat)) {
    //   return next(
    //     new AppError('User recently changed password! please login again.', 401)
    //   );
    // }
    //grant access to protect route
    req.user = currentUser;
    res.locals.user = currentUser;
    next();
  });
  
  exports.isLoggedIn = async (req, res, next) => {
    try {
      if (req.cookies.jwt) {
        //verification token
        const decoded = await promisify(jwt.verify)(
          req.cookies.jwt,
          process.env.JWT_SECRET
        );
  
        //check if user still exists
        const currentUser = await User.findById(decoded.id);
        console.log(currentUser);
        if (!currentUser) {
          return next();
        }
  
        //check if user changed password after the token was issued
        // if (currentUser.changedPasswordAfter(decoded.iat)) {
        //   return next();
        // }
        //there is a logged in user
        res.locals.user = currentUser;
        return next();
      }
    } catch (err) {
      return next();
    }
    next();
  };
  