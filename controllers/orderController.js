const Order = require('./../models/orderModel');
const catchAsync = require('./../utils/catchAsync');
const Email = require('./../utils/email');

exports.CreateOrder = catchAsync(async(req, res, next) => {
    const newOrder = await Order.create(req.body);

    await new Email(newOrder).orderConform();

    res.status(201).json({
        status:'success',
        data:{
            data:newOrder
        }
    });
});

exports.getAllOrder = catchAsync(async(req, res, next) => {
    const order = await Order.find();

    res.status(201).json({
        status:'success',
        result:order.length,
        data:{
            data: order
        }
    });
});

exports.getoneOrder = catchAsync(async(req, res, next) => {
    const query = Order.findById(req.params.id);
    const order = await query;

    res.status(200).json({
        status: 'success',
        data: {
            data: order
        }
    });
});