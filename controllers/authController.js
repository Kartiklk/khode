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

// exports.signup = catchAsync(async (req, res, next) => {
//   const newUser = await User.create(req.body);


//   res.status(201).json({
//     status:"success",
//     data: {
//       data: newUser
//     }
//   });
// });

exports.signup = catchAsync(async (req, res , next)=> {
    const newUser = await User.create(req.body);

    const url = `${req.protocol}://${req.get('host')}/me`;

    await new Email(newUser, url).sendWelcome();

    createsendToken(newUser, 200, res);
});

exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    //check if email and password exist
    if (!email || !password) {
      return next(new AppError('please provide email and password!', 400));
    }
    //ckeck if user exists && password is correct
    const user = await User.findOne({ email }).select('+password');
  
    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError('Incorrect email or password', 401));
    }
  
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

  