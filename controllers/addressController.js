const Address = require('./../models/addressModel');
const catchAsync = require('./../utils/catchAsync');

exports.createAddress = catchAsync(async(req, res, next) => {
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
