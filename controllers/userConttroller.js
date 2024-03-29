const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const User = require("../models/userModels");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail.js");
const crypto = require("crypto");

// Register a user
exports.registerUser = catchAsyncErrors(async (req, res, next) => {

    const { name, email, password } = req.body.payload;
    const user = await User.create({
        name,
        email,
        password,
        // !avatar
        avatar: {
            public_id: "sample id",
            url: "profile pic url",
        },
    });

    // const token = await user.getJWTToken();

    // res.status(201).json({
    //     success: true,
    //     token,
    // })
    sendToken(user, 201, res);
})


// Login User 
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body.payload;

    // checking if user has given password and email both
    if (!email || !password) {
        return next(new ErrorHandler("Please enter email and password", 500));
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }
    // const token = await user.getJWTToken();

    // res.status(200).json({
    //     success: true,
    //     token,
    // });
    sendToken(user, 200, res);
});

// Logout User
exports.logout = catchAsyncErrors(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    })
    res.status(200).json({
        success: true,
        message: "Logged Out"
    })
})

// Forgot Password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.payload.email });
    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }
    // Get reset password token
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;

    const message = `Your password reset token is :-
    
                     ${resetPasswordUrl}.
                     
                     If you have not requested this email then, please ignore it
                     `
    try {
        await sendEmail({
            email: user.email,
            subject: `Password recovery`,
            message,
        });
        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`,
        })
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });
        return next(new ErrorHandler(error.message, 500));
    }

})

// Reset Password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
    // creating token hash
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex")

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });
    if (!user) {
        return next(new ErrorHandler("Reset Password Token is invalid or has been expired", 400));
    }
    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password dosent match", 400))
    }
    user.password = req.body.payload.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res);
})

// Get user details -> works only after login 
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user,
    })
})

// Update user password when logged in
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password")
    const isPasswordMatched = await user.comparePassword(req.body.payload.oldPassword);
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Old password is incorrect", 400));
    }
    if (req.body.payload.newPassword !== req.body.payload.confirmPassword) {
        return next(new ErrorHandler("Passord does not match", 400));
    }

    user.password = req.body.payload.newPassword;
    await user.save();
    // res.status(200).json({
    //     success: true,
    //     user,
    // })
    sendToken(user, 200, res);
})

// Update User Profile when logged in
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.payload.name,
        email: req.body.payload.email,
        // ! avatar left
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
    })
})

// ! ADMIN
// Get all users - for admin
exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        success: true,
        users,
    })
})

// ! ADMIN
// Get selected single user details for admin
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(
            new ErrorHandler(`User does not exist with id: ${req.params.id}`)
        );
    }
    res.status(200).json({
        success: true,
        user,
    });
});

// User Role update by admin
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.payload.name,
        email: req.body.payload.email,
        role: req.body.payload.role,
    };

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
    res.status(200).json({
        success: true,
    })
})

// ! admin
// Delete / Remove User by admin
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {

    const user = await User.findById(req.params.id);
    // we will remove cloudnary

    if (!user) {
        return next(new ErrorHandler(`User does not exist with id: ${req.params.id}`));
    }

    await user.remove();
    res.status(200).json({
        success: true,
    })
})