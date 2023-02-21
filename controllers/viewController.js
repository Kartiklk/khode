const catchAsync = require('../utils/catchAsync');
const Item = require('./../models/itemModel');


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

    res.status(200).render('login', {
        title: 'Login into your account'
    });
});

exports.cart = catchAsync(async(req, res, next) => {
    // get one data by id
    let query = Item.findById(req.params.id);

    const item = await query;

    res.status(201).render('cart', {
        title: "Add Cart",
        item
    })
});