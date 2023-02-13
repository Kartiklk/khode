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

exports.AllCartItem = catchAsync(async(req, res, next) => {
  const item = await cart.find();

  res.status(201).json({
    status:"success",
    data:{
      data:item
    }
  });
});

exports.OneCartItem = catchAsync(async(req, res, next) =>{
  const query = cart.findById(req.params.id);

  const item = await query;

  res.status(201).json({
    status: "success",
    data:{
      data: item
    }
  });
});
