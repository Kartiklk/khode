const Order = require('./../models/orderModel');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const Email = require('./../utils/email');

exports.CreateOrder = catchAsync(async(req, res, next) => {
    const newOrder = await Order.create(req.body);
    const user = await User.findById(newOrder.user)
    // const url = `${req.protocol}://${req.get('host')}/myorders`;
    // const user = newOrder.populate("user");
    // const query = await Order.find();
    // console.log(user, url)
    await new Email(user).orderConform();


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
             order
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