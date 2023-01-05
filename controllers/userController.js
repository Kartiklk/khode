const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');

exports.getAllUser = catchAsync(async (req, res, next) =>{
    const user = await User.find();

    res.status(201).json({
        status:'success',
        results: user.length,
        data:{
            data: user
        }
    });
});

exports.getOneUser = catchAsync(async(req, res, next) => {
    const query = User.findById(req.params.id);

    const user = await query;

    res.status(200).json({
        status: 'success',
        data: {
            data: user
        }
    });
});