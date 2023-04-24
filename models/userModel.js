const mongoose = require('mongoose');
const crypt = require('crypto');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { stringify } = require('querystring');
const AppError = require('./../utils/appError')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Enter the name']
    },
    email: {
        type: String,
        required: [true, 'Ente the Email'],
        unique: [true, 'Email is already exist.'],
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

  userSchema.methods.correctPassword = async function(
    candidatePassword,
    userPassword
  ) {
    return await bcrypt.compare(candidatePassword, userPassword);
  };

const User = mongoose.model('User', userSchema);

module.exports = User;