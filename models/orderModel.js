const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    carts: {
        type: [mongoose.Schema.ObjectId],
        ref: 'Cart'
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
    },
    address: {
        type: mongoose.Schema.ObjectId,
        ref:'Address'
    },
    orderDate: {
        type: Date,
        default:Date.now()
    },
    payment: {
        type: String,
        required: [true, 'Payment method must mention']
    }
});

orderSchema.pre(/^find/, function(next){
    this.populate({
        path:"carts",
        populate:{
            path:"item"
        }
    });
      next();
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;