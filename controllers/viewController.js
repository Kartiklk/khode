const catchAsync = require('../utils/catchAsync');
const Item = require('./../models/itemModel');
const Cart = require('./../models/cartModel');
const User = require('./../models/userModel');
const Order = require('./../models/orderModel');
const Address = require('./../models/addressModel');


exports.overview = catchAsync(async(req, res, next)=>{
    const items = await Item.find();
    
    res.status(201).render('overview', {
        title: 'overview',
        items
    });
});
exports.itemList = catchAsync(async(req, res, next) => {
    //get data from collection
    const items = await Item.find();

    //build template
    //render that template using data
    res.status(201).render('itemslist',{
        title: 'All items',
        items
    });
});

exports.item = catchAsync(async(req, res, next) => {
    // get one data by id
    let query = Item.findById(req.params.id);

    const item = await query;
    res.status(201).render('item', {
        title: "One item",
        item
    })
});

exports.loginform = catchAsync(async(req, res, next)=>{
    // res
    // .status(200)
    // .set(
    //   'Content-Security-Policy',
    //   "connect-src 'self' https://cdnjs.cloudflare.com"
    // ) 
    res.status(200).render('login', {
        title: 'Login into your account'
    });
});

exports.getMycart = catchAsync(async(req, res, next) => {
    const carts = await Cart.find({ user: req.user.id });

    // console.log(cart);
    //find tours with the returned ids
    const itemID = carts.map(el => el.item);
    const items = await Item.find({ _id: { $in: itemID } });
    // const cart = await Cart.findById({user:req.user.id});
    // console.log(carts);
    res.status(201).render('cart', {
        title: 'cart',
       carts,items
    });
});

exports.Orderdetails = catchAsync(async(req, res, next) =>{
    const address = await Address.find({ user:req.user.id });

    res.status(201).render('orderdetails',{
        title: 'Order Now',
        address
    });
    console.log(address);
})

exports.myorders = catchAsync(async(req, res, next) =>{
    res.status(201).render('myorders',{
        title: 'Your Orders'
    });
})