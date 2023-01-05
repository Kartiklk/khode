const catchAsync = require('../utils/catchAsync');
const Item = require('./../models/itemModel');


exports.overview = catchAsync(async(req, res, next)=>{
    
    res.status(201).render('overview', {
        title: 'overview'
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

    res.status(201).render('item', {
        title
    })
})