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
        title: item.name,
        item
    })
});

exports.loginform = catchAsync(async(req, res, next)=>{

    res.status(200).render('login', {
        title: 'Login into your account'
    });
});

exports.getMycart = catchAsync(async(req, res, next) => {
    const carts = await Cart.find({ user: req.user.id });

    //find tours with the returned ids
    const itemID = carts.map(el => el.item);
    const items = await Item.find({ _id: { $in: itemID } });

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
})

exports.myorders = catchAsync(async(req, res, next) =>{
    const orders = await Order.find({user:req.user.id});

        const temp = new Array();
        for(var i=0; i<orders.length; i++){
             temp[i] = orders[i];
        }
        const items = temp.map(el => el.carts);
        const carts = new Array();
        if(items.length != 0){
          var a=0;
           for(var j=0; j<items.length; j++){
              for(var i=0; i<items[j].length; i++){
                carts[a++] = await Item.findById(items[j][i]);
               }
           }
        }

    res.status(201).render('myorders',{
        title: 'Your Orders',
        orders,carts
    });
})

exports.myorderdetails = catchAsync(async(req, res, next)=>{
    const orders = await Order.findById(req.params.id);

    const carts = new Array();
    if(orders.carts.length != 0){
          var total=0;
          for(var i=0; i<orders.carts.length; i++){
            carts[i] = await Item.findById(orders.carts[i]);
            total=total + carts[i].price;
       }
    }
    const address = await Address.findById(orders.address);
    var date = orders.orderDate;
    console.log(date)
    date = JSON.stringify(date)
    date = date.split('T')[0]
    date = date.split('"')[1]

    res.status(201).render('myorderdetails',{
        title:'My Order Details',
        carts, address, orders, total, date
    })
})