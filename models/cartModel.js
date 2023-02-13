const mongoose = require('mongoose');
const User = require('./userModel');

const cartSchema = new mongoose.Schema({
    title:{
        type:String,
        required: [true, 'Item name require']
    },
    price:{
        type: String,
        required:[true, 'item price require']
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:User,
        required: [true, 'Cart Item must belong to User']
    }
})

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;