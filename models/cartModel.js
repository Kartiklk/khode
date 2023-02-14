const mongoose = require('mongoose');
const Item = require('./itemModel');
const User = require('./userModel');

const cartSchema = new mongoose.Schema({
    item:{
        type:mongoose.Schema.ObjectId,
        ref:Item,
        required:[true, 'Item must have']
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:User,
        required: [true, 'Cart Item must belong to User']
    }
});

cartSchema.pre(/^find/, function(next) {
    this.populate('item').populate({
      path: 'user',
      select: 'name'
    });
    next();
  });

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;