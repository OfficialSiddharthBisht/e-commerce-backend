const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const User = require("../models/userModels");
const sendToken = require("../utils/jwtToken");

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

    // const token = await user.getJWTToken();

    // res.status(201).json({
    //     success: true,
    //     token,
    // })
    sendToken(user,201,res);
})


// Login User 
exports.loginUser = catchAsyncErrors(async(req,res,next) =>{
    const {email, password} = req.body;

    // checking if user has given password and email both
    if(!email || !password){
        return next(new ErrorHandler("Please enter email and password",500));
    }

    const user = await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("Invalid email or password",401));
    }

    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email or password",401));
    }
    // const token = await user.getJWTToken();

    // res.status(200).json({
    //     success: true,
    //     token,
    // });
    sendToken(user,200,res);
});

