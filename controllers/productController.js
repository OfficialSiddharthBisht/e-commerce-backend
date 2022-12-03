const Product = require("../models/productModels");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");

// Create Product ---admin route--
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
    req.body.user = req.user.id;
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    })
})

// Get all products
exports.getAllProducts = catchAsyncErrors(async (req, res) => {

    const resultPerPage = 2;
    const productCount = await Product.countDocuments();
    const apiFeature = new ApiFeatures(Product.find(), req.query).search().filter().pagination(resultPerPage);
    // const products = await Product.find();
    const products = await apiFeature.query;

    res.status(200).json({
        success: true,
        products,
        productCount,
    });
})

// Update a product ---admin route--
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
        // return res.status(404).json({
        //     success: false,
        //     message: "Product not found"
        // })
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFFindAndModify: false
    });
    res.status(200).json({
        success: true,
        product
    })
})

// Delete a product --admin route--
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
        // return res.status(404).json({
        //     success: false,
        //     message: "Product not found"
        // })
    }
    await product.remove();
    res.status(200).json({
        success: true,
        message: "Product deleted successfully"
    })
})

// Get single product -- product details
exports.productDetails = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }
    // if(!product){
    //     return res.status(404).json({
    //         success: false,
    //         message: "Product not found"
    //     })
    // }
    res.status(200).json({
        success: true,
        product
    })
})

// Create New Review or Update the review

exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
    const { rating, comment, productId } = req.body
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    };
    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(rev => rev.user.toString() === req.user._id.toString());

    if (isReviewed) {
        product.reviews.forEach((rev) => {
            if (rev.user.toString() === req.user._id.toString()) {
                rev.rating = rating,
                    rev.comment = comment
            }
        })
    } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }

    // average review calculate
    let average = 0;
    product.ratings = product.reviews.forEach(rev => {
        average += rev.rating
    }) / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
    })
})