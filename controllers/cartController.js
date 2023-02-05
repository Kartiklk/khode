const catchAsync = require('../utils/catchAsync');
const cart = require('./../models/cartModel');

exports.createCartItem = catchAsync(async (req, res, next) => {
    const newCartItem = await cart.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      data: newCartItem,
    },
  });
});

