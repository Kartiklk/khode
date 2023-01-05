const mongoose = require('mongoose');
const slugify = require('slugify');

const itemSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required: [true, 'A item must have name'],
            unique: true
        },
        slug: String,
        price:{
            type:Number,
            required: [true, 'A item must have price']
        },
        OriginalPrice:{
            type:Number,
            required: [true, 'A item must have original price']
        },
        discount:{
            type:String,
            default: '5%'
        },
        photo:{
            type:String,
            required: [true, 'A item must have photo']
        },
        quantity: {
            type:String,
            default: '1'
        },
        stock: {
            type: Number,
            requied: [true, 'Mention the stock']
        },
        description: {
            type: String,
        }
    }
);

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;