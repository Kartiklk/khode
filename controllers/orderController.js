const Order = require('./../models/orderModel');
const User = require('./../models/userModel');
const Item = require('./../models/itemModel');
const catchAsync = require('./../utils/catchAsync');
const Email = require('./../utils/email');
const AppError = require('./../utils/appError');
const Stripe = require('stripe');
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const stripe = Stripe(process.env.STRIPE_SECERT_KEY);

exports.payment= catchAsync(async(req, res, next)=>{


    // const {carts, user, address, payment} = req.body;
    // this.createOne(Order)
    // console.log(req.body);

    const temp = req.body;
       var total=0;
       console.log(temp)
       const carts = new Array();
        for(var i=0; i<temp.carts.length; i++){
            carts[i] = await Item.findById(temp.carts[i]);
            total=total + carts[i].price;
         }
       const user = await User.findById(temp.user)
    //    console.log(carts, total, user)

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        success_url: `${req.protocol}://${req.get('host')}/myorders`,
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
    // console.log(session);
    const url = session.url;
    // console.log(url)
    // if(session.payment_status == 'unpaid'){
    //     console.log('pay')
    // }else{
    //     console.log('payed')
    // }

    res.status(200).json({
        status: 'success',
        url
      });
})

exports.CreateOrder = catchAsync(async(req, res, next) => {

    const newOrder = await Order.create(req.body);
    const user = await User.findById(newOrder.user)
    // const url = `${req.protocol}://${req.get('host')}/myorders`;
    // const user = newOrder.populate("user");
    // const query = await Order.find();
    // console.log(newOrder)
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

exports.createOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    console.log(doc)
    res.status(201).json({
      status: 'success',
      data: {
        data: doc
      }
    });
  });


//   WEBHOOK

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = "whsec_8c5fcad5220f298b2ea446b73c6a557f78167bee3d4fc328bc0f0022c7fbb551";

app.use(bodyParser.json({
  verify:(req, res, buf) =>{
    req.body = buf;
    // console.log(req.body, buf);
  },
  raw:true
}));

exports.web = (req, res) => {
  // express.raw({type: 'application/json'});
  // app.use(bodyParser.raw({type:'*/*'}));
  // app.use(bodyParser.json());
  // express.raw({type: '*/*'});
  // console.log(req.body);
  // console.log(req.headers);
// console.log([req.body.toString()]);

const rawBody = req.body.toString();
const payload = JSON.stringify(rawBody);
console.log(payload);

console.log(req.originalUrl)
  const sig = req.headers['stripe-signature'];

  // const sg = sig.split(',');
  let event;

  console.log();
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    console.log(event);
  } catch (err) {
    console.log(err);
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  

  // Return a 200 response to acknowledge receipt of the event
  res.send();
};
