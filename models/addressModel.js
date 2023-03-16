const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Fill the name']
    },
    phone: {
        type: String,
        trim: true,
        minLength: [10, 'Phone number is not correct'],
        required: [true, 'Fill the Phone number']
    },
    address: {
        type: String,
        required: [true, 'Fill the address']
    },
    city: {
        type: String,
        required: [true , 'A city name is required']
    },
    state: {
        type: String,
        required: [true, 'Mention your State']
    },
    citycode: {
        type: String,
        required: [true, 'A City code must required']
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }
});

const Address = mongoose.model('Address', addressSchema);

module.exports = Address;