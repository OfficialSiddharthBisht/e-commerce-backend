const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const User = require("../models/userModels");

// Register a user
exports.registerUser = catchAsyncErrors(async(req,res,next)=>{

    const {name , email, password} = req.body;
    const user = await User.create({
        name,
        email,
        password,
        // !avatar
        avatar : {
            public_id: "sample id",
            url: "profile pic url",
        },
    });

    res.status(201).json({
        success: true,
        user,
    })
})