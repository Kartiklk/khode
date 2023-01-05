const mongoose = require('mongoose');
const crypt = require('crypto');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { stringify } = require('querystring');
// const { stringify } = require('querystring');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Enter the name']
    },
    email: {
        type: String,
        required: [true, 'Enter the password'],
        unique: true,
        lowercase: true,
        validator: [validator.isEmail, 'Please enter valid email']
    },
    password: {
        type: String,
        required: [true, 'Password required'],
        minlength: 8,
        select: false
    },
    role: {
        type: String,
        default: 'user'
    }
});

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
  
    this.password = await bcrypt.hash(this.password, 12);
    next();
  });

const User = mongoose.model('User', userSchema);

module.exports = User;