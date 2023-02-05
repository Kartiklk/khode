const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    title:{
        type:String,
        required: [true, 'Item name require']
    },
    price:{
        type: String,
        required:[true, 'item price require']
    }
})

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;