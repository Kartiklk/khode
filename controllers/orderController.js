const Order = require('./../models/orderModel');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const Email = require('./../utils/email');
const AppError = require('./../utils/appError');
const Stripe = require('stripe');

const stripe = Stripe(process.env.STRIPE_SECERT_KEY);

exports.payment= catchAsync(async(req, res, next)=>{
    const paymentIntent = await stripe.paymentIntents.create({
        payment_method_types: ['card'],
        // success_url: `${req.protocol}://${req.get('host')}/?tour=${
        // req.params.tourId
        // }&user=${req.user.id}&price=${tour.price}`,
        // cancel_url: `${req.protocol}://${req.get('host')}/tour/${tour.slug}`,
        customer_email: req.user.email,
        // client_reference_id: req.params.tourId,
        mode: 'payment',
        line_items: [
        {
            quantity: 1,
            price_data: {
            currency: 'inr',
            // unit_amount: tour.price,
            product_data: {
                // name: `${tour.name} Tour`,
                // description: tour.summary,
                // images: [`https://www.natours.dev/img/tours/${tour.imageCover}`]
            }
          }
        }
      ]
    });

    res.status(200).json({
        status: 'success',
        paymentIntent
      });
})

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

exports.deleteOrder = catchAsync(async(req, res, next) =>{
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
        return next(new AppError('No document found with that ID', 404));
      }

    res.status(201).json({
        status:'success'
    })
})