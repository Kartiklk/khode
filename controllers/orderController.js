const Order = require('./../models/orderModel');
const User = require('./../models/userModel');
const Item = require('./../models/itemModel');
const catchAsync = require('./../utils/catchAsync');
const Email = require('./../utils/email');
const AppError = require('./../utils/appError');
const Stripe = require('stripe');


exports.payment= catchAsync(async(req, res, next)=>{

    const stripe = Stripe(process.env.STRIPE_SECERT_KEY);

    const temp = req.body;
    // console.log(temp.carts.length)
       var total=0;
       const carts = new Array();
        for(var i=0; i<temp.carts.length; i++){
            carts[i] = await Item.findById(temp.carts[i]);
            total=total + carts[i].price;
         }
       const user = await User.findById(temp.user)
    //    console.log(carts, total, user)

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        success_url: hello(),
        cancel_url: `${req.protocol}://${req.get('host')}/cart`,
        customer_email: user.email,
        client_reference_id: user.id,
        mode: 'payment',
        line_items: [
        {
            quantity: 1,
            price_data: {
            currency: 'inr',
            unit_amount: total * 100,
            product_data: {
                name: `${user.name}`,
                description: user.name,
                images: [`img/general/${carts.photo}`]
            }
          }
        }
      ]
    });
    // console.log(session.url);
    const url = session.url;
    // console.log(url)

    res.status(200).json({
        status: 'success',
        url
      });
})

exports.CreateOrder = catchAsync(async(req, res, next) => {
    console.log(req.body);
    const newOrder = await Order.create(req.body);
    const user = await User.findById(newOrder.user)
    // const url = `${req.protocol}://${req.get('host')}/myorders`;
    // const user = newOrder.populate("user");
    // const query = await Order.find();
    console.log(newOrder)
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