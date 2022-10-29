const mongoose = require('mongoose');
const validator = require('validator');


const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true,"Please enter your name"],
        maxLength : [50, "Cannot exceed 50 characters"],
        minLength : [2, "Name should have more then 2 characters"],
    },
    email : {
        type : String,
        required : [true, "Please enter your email"],
        unique : [true, "Email already exhists"],
        validate: [validator.isEmail,"Please enter valid email"],
    },
    password: {
        type: String,
        required : [true,"Please enter your password"],
        minLength : [8, "Password should be more then 8 characters for security purpose"],
        select: false, // when using find method in mongoose password will not be shown
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true,
        }
    },
    role: {
        type : String,
        default: "user",
    },
    resetPasswordToken :String,
    resetPasswordExpire : Date,
});

module.exports = mongoose.model("User",userSchema);