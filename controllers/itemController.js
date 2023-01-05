// const mongoose = require("mongoose");
const Item = require('./../models/itemModel')
const catchAsync = require("./../utils/catchAsync");
// const APIFeatures = require('./../utils/apiFeatures');

exports.createItem = catchAsync(async (req, res, next) => {
    const newItem = await Item.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      data: newItem,
    },
  });
});


exports.getAllItems = catchAsync(async (req, res) => {
  const item = await Item.find();

  res.status(201).json({
    status: 'success',
    results: item.length,
    data: {
      data: item,
    },
  });
});

exports.getoneItem = catchAsync(async (req, res, next) => {
  let query = Item.findById(req.params.id);

  const item = await query;

  res.status(200).json({
    status: "success",
    data: {
      data: item,
    },
  });
});
