const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const User = require("../models/userModels");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail.js");

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

// Logout User
exports.logout = catchAsyncErrors(async(req,res,next)=>{
    res.cookie("token",null,{
        expires: new Date(Date.now()),
        httpOnly: true,
    })
    res.status(200).json({
        success: true,
        message : "Logged Out"
    })
})

// Forgot Password
exports.forgotPassword = catchAsyncErrors(async(req, res, next)=>{
    const user = await User.findOne({email: req.body.email});
    if(!user){
        return next(new ErrorHandler("User not found",404));
    }
    // Get reset password token
    const resetToken = user.getResetPasswordToken();
    await user.save({validateBeforeSave:false});

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;

    const message = `Your password reset token is :-
    
                     ${resetPasswordUrl}.
                     
                     If you have not requested this email then, please ignore it
                     `
    try{
        await sendEmail({
            email : user.email,
            subject : `Password recovery`,
            message,
        });
        res.status(200).json({
            success: true,
            message : `Email sent to ${user.email} successfully`,
        })
    }catch(error){
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({validateBeforeSave: false});
        return next(new ErrorHandler(error.message,500));
    }
                     
})