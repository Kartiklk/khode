const express = require('express');
const itemRoute = require('./routes/itemRoute');
const userRoute = require('./routes/userRoute');
const addressRoute = require('./routes/addressRoute');
const orderRoute = require('./routes/orderRoute');
const AppError = require('./utils/appError');
const viewRoute = require('./routes/viewRoute');
const cartRoute = require('./routes/cartRoute');
const path = require('path');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cookieParser = require('cookie-parser');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'))

//serving static file
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

//helmet
app.use(helmet({
  contentSecurityPolicy: false,
}));

//Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use((req, res, next) => {
  console.log('Hello from the middleware 👋');
  next();
});

//body parser,reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

app.use(mongoSanitize());

app.use(xss());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/', viewRoute);
app.use('/api/v1/items', itemRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/address', addressRoute);
app.use('/api/v1/order', orderRoute);
app.use('/api/v1/cart', cartRoute);

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
  });

module.exports = app;