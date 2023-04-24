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

    const temp = req.body;
      var total=0;
      let carts = new Array();
      for(var i=0; i<temp.carts.length; i++){
        carts[i] = await Item.findById(temp.carts[i]);
        total=total + carts[i].price;
      }
      const user = await User.findById(temp.user);
      const line_items = carts.map((el)=>{
        return {quantity: 1,
        price_data: {
        currency: 'inr',
        unit_amount: el.price * 100,
        product_data: {
            name:el.name,
            // description:el.name,
            // images:[`img/general/${el.photo}`]
        }
      }
    }
  });
    let tp = carts.toString();
    const customer = await stripe.customers.create({
      metadata:{
        user:req.body.user,
        carts:req.body.carts.toString(),
        address:req.body.address,
        payment:req.body.payment
      },
    });

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        success_url: `${req.protocol}://${req.get('host')}/myorders`,
        cancel_url: `${req.protocol}://${req.get('host')}/cart`,
        client_reference_id: user.id,
        mode: 'payment',
      //   line_items: [
      //   {
      //       quantity: 1,
      //       price_data: {
      //       currency: 'inr',
      //       unit_amount: total * 100,
      //       product_data: {
      //           name: name,
      //           description: desciption,
      //           images: [`img/general/${photo}`]
      //       }
      //     }
      //   }
      // ],
      line_items,
      customer:customer.id,
    });
    const url = session.url;

    res.status(200).json({
        status: 'success',
        url
      });
})

exports.CreateOrder = catchAsync(async(req, res, next) => {

    const newOrder = await Order.create(req.body);
    const user = await User.findById(newOrder.user)

    const url = `${req.protocol}://${req.get('host')}/myorders`;
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

//   WEBHOOK

const ordercreate = async(customer, data, res) => {
  let temp = customer.metadata.carts;
  let cart = new Array();
  cart=temp.split(',');

  const newOrder = await Order.create({
    carts:cart,
    user:customer.metadata.user,
    address:customer.metadata.address,
    payment:customer.metadata.payment
  });
    const user = await User.findById(newOrder.user)

    const url = data.success_url;
    await new Email(user, url).orderConform();


    res.status(201).json({
        status:'success',
        data:{
            data:newOrder
        }
    });

}

// This is your Stripe CLI webhook secret for testing your endpoint locally.

exports.web = (express.raw({type: 'application/json'}),(req, res) => {

  let endpointSecret;
  // endpointSecret = "whsec_8c5fcad5220f298b2ea446b73c6a557f78167bee3d4fc328bc0f0022c7fbb551";
  endpointSecret = "whsec_bnh76qDVOZrZgqh5J6u0L9C1ovEVLU6b";

  // express.raw({type: 'application/json'});
  const sig = req.headers['stripe-signature'];

  let data;
  let eventtype;

  if(endpointSecret){
    let event;
    
    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
      console.log(event);
    } catch (err) {
      console.log(err);
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
    data = event.data.object;
    eventtype = event.type;
  }
  else{
    data = req.body.data.object;
    eventtype = req.body.type
  }

  // Handle the event
  if(eventtype === "checkout.session.completed"){
    stripe.customers.retrieve(data.customer).then((customer)=>{
      ordercreate(customer, data)
    })
    .catch((err)=>
      console.log(err)
    )
  }
  

  // Return a 200 response to acknowledge receipt of the event
  res.send().end();
});

