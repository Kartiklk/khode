const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    cart: {
        type: [mongoose.Schema.ObjectId],
        ref: 'cart'
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
    this.populate('item').populate({
        path: 'user',
        select: 'name'
      });
      next();
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;