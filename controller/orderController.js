const Order = require("../model/orderModel");
const Product = require("../model/productModel");
const catchAsyncError = require("../middlewares/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");




// new order creating
exports.newOrder = catchAsyncError(async (req, res, next) => {
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body;

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id,
    });

    return res.status(201).json({
        success: true,
        order
    });

});

//get single Order
exports.getSingleOrder = catchAsyncError(async (req, res, next) => {

    const order = await Order.findById(req.params.id).populate("user", "name email");

    if (!order) {
        return next(new ErrorHandler(`Order not found with this ID :${req.params.id}`, 404));
    }

    return res.status(200).json({
        success: true,
        order
    });

});

//get Logged in user Orders
exports.myOrders = catchAsyncError(async (req, res, next) => {

    const orders = await Order.find({ user: req.user._id });

    return res.status(200).json({
        success: true,
        orders
    });

});

//get All Orders --Admin
exports.getAllOrders = catchAsyncError(async (req, res, next) => {

    const orders = await Order.find();

    let totalAmount = 0;

    orders.forEach(order => {
        totalAmount += order.totalPrice;
    })

    return res.status(200).json({
        success: true,
        totalAmount,
        orders
    });

});

//Update Order Status --Admin
exports.updateOrder = catchAsyncError(async (req, res, next) => {

    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler(`Order not found with this ID :${req.params.id}`, 404));
    }

    if (order.orderStatus === "Delivered") {
        return next(new ErrorHandler(`Order is already delivered`, 400));
    }


    order.orderItems.forEach(async (item) => {
        await updateStock(item.product, item.quantity);
    })

    order.orderStatus = req.body.status;
    if (req.body.status === "Delivered") {
        order.deliveredAt = Date.now();
    }

    await order.save({ validateBeforeSave: false });

    return res.status(200).json({
        success: true,
    });

});

const updateStock = async (id, quantity) => {
    const product = await Product.findById(id);

    product.stock -= quantity;

    product.save({ validateBeforeSave: false });
}

//Delete Order  --Admin
exports.deleteOrder = catchAsyncError(async (req,res,next)=>{

    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler(`Order not found with this ID :${req.params.id}`, 404));
    }

    await order.remove();

    return res.status(200).json({
        success:true
    });


})