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
      //  console.log(temp)
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
      // console.log(line_items.price_data)
      //  console.log(carts, total, user)
    let tp = carts.toString();
    // console.log(carts.name, tp, tp.name);
    const customer = await stripe.customers.create({
      metadata:{
        user:req.body.user,
        carts:req.body.carts.toString(),
        address:req.body.address,
        payment:req.body.payment
      },
    });

    // console.log(customer);
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        success_url: `${req.protocol}://${req.get('host')}/myorders`,
        cancel_url: `${req.protocol}://${req.get('host')}/cart`,
        // customer_email: user.email,
        client_reference_id: user.id,
        mode: 'payment',
      //   line_items: [
      //   {
      //       quantity: 1,
      //       price_data: {
      //       currency: 'inr',
      //       unit_amount: total * 100,
      //       product_data: {
      //           name: tp.name,
      //           description: tp.name,
      //           images: [`img/general/${tp.photo}`]
      //       }
      //     }
      //   }
      // ],
      line_items,
      customer:customer.id,
    });
    // console.log(session);
    const url = session.url;
    // console.log(url)
    // if(session.payment_status == 'unpaid'){
    //     console.log('pay')
    // }else{
    //     console.log('payed')
    // }

    // console.log(session)
    res.status(200).json({
        status: 'success',
        url
      });
})

exports.CreateOrder = catchAsync(async(req, res, next) => {

  // console.log(req.body)
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

// exports.createOne = Model =>
//   catchAsync(async (req, res, next) => {
//     const doc = await Model.create(req.body);

//     console.log(doc)
//     res.status(201).json({
//       status: 'success',
//       data: {
//         data: doc
//       }
//     });
//   });


//   WEBHOOK

const ordercreate = async(customer, req, res) => {
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

}

// app.use((req, res, next) => {
//   if (req.originalUrl === '/webhook') {
//     next(); // Do nothing with the body because I need it in a raw state.
//   } else {
//     express.json()(req, res, next);  // ONLY do express.json() if the received request is NOT a WebHook from Stripe.
//     console.log( express.json()(req, res, next));
//   }
// });

// This is your Stripe CLI webhook secret for testing your endpoint locally.

exports.web = (req, res) => {

  let endpointSecret;
  // endpointSecret = "whsec_8c5fcad5220f298b2ea446b73c6a557f78167bee3d4fc328bc0f0022c7fbb551";

  // express.raw({type: 'application/json'});
  // app.use(bodyParser.raw({type:'*/*'}))
  // app.use(bodyParser.json());
  // app.use(require('body-parser').text({type:'*/*'}))
  // express.raw({type: '*/*'});
  // console.log(req.body);
  // console.log(req.headers);
// console.log([req.body.toString()]);


// const rawBody = req.body.toString();
// const payload = JSON.stringify(rawBody);
// console.log(req.rawBody);
// const  body = req.body
// console.log(JSON.stringify(body.data));

  const sig = req.headers['stripe-signature'];

  // const sg = (sig.split(',')).toString();

  // const payload = JSON.stringify(body);
  // console.log(JSON.stringify(payload));
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

  // console.log(data);
  // console.log(eventtype)
  // Handle the event
  if(eventtype === "checkout.session.completed"){
    // console.log(eventtype)
    stripe.customers.retrieve(data.customer).then((customer)=>{
      ordercreate(customer)
      // console.log(customer),
      // console.log(data)
    })
    .catch((err)=>
      console.log(err)
    )
  }
  

  // Return a 200 response to acknowledge receipt of the event
  res.send().end();
};


// (async () => {
//   const {paymentIntent, error} = await stripe.confirmCardPayment(clientSecret);
//   if (error) {
//     // Handle error here
//     console.log(error);
//   } else if (paymentIntent && paymentIntent.status === 'succeeded') {
//     // Handle successful payment here
//     console.log('success');
//   }
// })();
