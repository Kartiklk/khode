const catchAsync = require('../utils/catchAsync');
const cart = require('./../models/cartModel');
const Item = require('./../models/itemModel');
const AppError = require('./../utils/appError');

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

  const cart = await cart.find({ user: req.user.id });

  //find tours with the returned ids
  const itemID = cart.map(el => el.item);
  const items = await Item.find({ _id: { $in: itemID } });

  res.status(201).json({
    status: "success",
    data:{
      data: items
    }
  });
});


exports.deleteOne = catchAsync(async (req, res, next) => {
    const doc = await cart.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(201).json({
      status: 'success',
      data:'NO DATA'
    });
  });