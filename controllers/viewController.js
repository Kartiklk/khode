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
    const addresses = await Address.find({ user:req.user.id });
    const carts = await Cart.find({ user:req.user.id });

    res.status(201).render('orderdetails',{
        title: 'Order Now',
        addresses, carts
    });
    // console.log(addresses, carts);
})

exports.myorders = catchAsync(async(req, res, next) =>{
    const orders = await Order.find({user:req.user.id});
    // const carts = orders.carts;
    // for(var i=0; i<carts.lenght; i++){
            // console.log(orders[0])
        // }
        // const temp = orders.populate('carts');
        // const cart = cartID.map(el => el.item);
        const temp = new Array();
        for(var i=0; i<orders.length; i++){
             temp[i] = orders[i];
            // console.log(temp);
        }
        const items = temp.map(el => el.carts);
        //    console.log(items.length);
        // console.log(items.length)
        // console.log(items.length != 0)
        const carts = new Array();
        if(items.length != 0){
        //    console.log(items[0][1]);
        //   for(var i=0; i<items[0].length; i++){
        //     carts[i] = await Item.findById(items[0][i]);
            
        //    }
        // console.log(items[0][1])
        var a=0;
        // console.log(items[1]);
           for(var j=0; j<items.length; j++){
            // carts[carts.length+1] = await Item.findById(items[j][]);
            //   console.log(j);
              for(var i=0; i<items[j].length; i++){
                // console.log(i)
                carts[a++] = await Item.findById(items[j][i]);
               }
           }
        // console.log(items[1][1]);
        }
        console.log(orders)
        // const temp = items;
        // console.log(items.name)
        // const carts = await Item.find({ _id: { $in: orders.carts } });
        // const doc = orders.popuplate('');
        // console.log(orders);
        // console.log(carts.length === 0);
        // const doc = await orders;

    res.status(201).render('myorders',{
        title: 'Your Orders',
        orders,carts
    });
})