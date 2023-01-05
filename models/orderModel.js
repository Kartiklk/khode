const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    item: {
        type: mongoose.Schema.ObjectId,
        ref: 'Item'
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
        type: Date.now()
    },
    expectedOn: {
        default: Date.now() + 7,
    },
    payment: {
        type: String,
        required: [true, 'Payment method must mention']
    }
});

orderSchema.pre(/^find/, function(next){
    if(user.id === address.user) {
        next();
    }
    else{
        console.log('Give correct user address')
    }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;