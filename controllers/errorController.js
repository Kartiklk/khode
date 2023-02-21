const AppError = require('./../utils/appError');

const handleCastErrorDB = err => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = err => {
  // const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  // console.log(value);
  const message = `Duplicate field value: value: ${
    err.keyValue.name
  }. Please use another value!`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = err => {
  const errors = Object.values(err.errors).map(el => el.message);
  const message = `Invalid input data.${errors.join('. ')}`;
  return new AppError(message, 400);
};

const handleJWTError = () =>
  new AppError('Invalid token, please login again!.', 401);

const handleJWTExpiredError = () =>
  new AppError('your token has expired! please login again!.', 401);

const sendErrorDev = (err, req, res) => {
  //1)api
  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack
    });
  }
  //2)rendered website
  console.error('ERROR ', err);
  return res.status(err.statusCode).render('error', {
    title: 'Something went worng!',
    msg: err.message
  });
};

const sendErrorProd = (err, req, res) => {
  //1)api
  // Operational, trusted error: send message to client
  if (req.originalUrl.startsWith('/api')) {
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message
      });

      // Programming or other unknown error: don't leak error details
    }
    // a) Log error
    console.error('ERROR ', err);

    // b) Send generic message
    return res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!'
    });
  }
  //2)render website
  if (err.isOperational) {
    return res.status(err.statusCode).render('error', {
      title: 'Something went worng!',
      msg: err.message
    });
  }
  //a) Log error
  console.error('ERROR ', err);
  // b) Send generic message
  return res.status(500).json({
    status: 'error',
    message: 'Something went very wrong!'
  });
};

module.exports = (err, req, res, next) => {
  // console.log(err.stack);

  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = JSON.stringify(err);
    error = JSON.parse(error);
    error.message = err.message;
    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === 'ValidationError')
      error = handleValidationErrorDB(error);
    if (error.name === 'JsonWebTokenError') error = handleJWTError();
    if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();

    sendErrorProd(error, req, res);
  }
};
