const Address = require('./../models/addressModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.createAddress = catchAsync(async(req, res, next) => {

    // const add = await Address.find({user:req.user.id});
    // if(add){
    //     return next(new AppError('User Address already exist!', 401));
    // }

    const newAddress = await Address.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            data: newAddress
        }
    });
});

exports.getAllAddress = catchAsync(async(req, res, next) => {
    const address = await Address.find();

    res.status(201).json({
        status: 'success',
        result: address.length,
        data: {
            data: address
        }
    });
});

exports.getOneAddress = catchAsync(async(req, res, next) => {
    const query = Address.findById(req.params.id);

    const address = await query;

    res.status(200).json({
        status: 'success',
        data: {
            data: address
        }
    });
});

exports.deleteOne = catchAsync(async (req, res, next) => {
    const doc = await Address.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(201).json({
      status: 'success',
      data:'NO DATA'
    });
  });