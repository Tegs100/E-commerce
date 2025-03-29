const asyncHandler = require("../utils/asyncHandler.utils");
const ApiError = require("../utils/ApiError.utils");
const ApiResponse = require("../utils/ApiResponse.utils");
const Order = require("../models/order.models");
const Product = require("../models/products.models");

// Create an Order (Authenticated User)
const createOrder = asyncHandler(async (req, res) => {
    const { products, shippingDetails } = req.body;

    if (!products || products.length === 0) {
        throw new ApiError(400, "Order must contain at least one product");
    }

    let totalPrice = 0;

    // Fetch product details and calculate total price
    for (const item of products) {
        const product = await Product.findById(item.product);
        if (!product) throw new ApiError(404, `Product not found: ${item.product}`);
        totalPrice += item.quantity * product.price;
    }

    const order = await Order.create({
        user: req.user._id,
        products: products.map(item => ({
            product: item.product,
            quantity: item.quantity,
            priceAtPurchase: item.priceAtPurchase,
        })),
        totalPrice,
        shippingDetails,
    });

    res.status(201).json(new ApiResponse(201, order, "Order created successfully"));
});

//  Get All Orders (Admin Only)
const getAllOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find().populate("user", "name email").populate("products.product", "name price");
    res.status(200).json(new ApiResponse(200, orders, "Orders retrieved successfully"));
});

//  Get User's Orders (Authenticated User)
const getUserOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id }).populate("products.product", "name price");
    res.status(200).json(new ApiResponse(200, orders, "User orders retrieved successfully"));
});

//  Get a Single Order by ID (Admin & Owner)
const getSingleOrder = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
        .populate("user", "name email")
        .populate("products.product", "name price");

    if (!order) throw new ApiError(404, "Order not found");

    // Allow only the owner or admin to view the order
    if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== "admin") {
        throw new ApiError(403, "Access denied");
    }

    res.status(200).json(new ApiResponse(200, order, "Order details retrieved"));
});

// Update Order Status (Admin Only)
const updateOrderStatus = asyncHandler(async (req, res) => {
    const { orderStatus } = req.body;

    const order = await Order.findById(req.params.id);
    if (!order) throw new ApiError(404, "Order not found");

    order.orderStatus = orderStatus;
    await order.save();

    res.status(200).json(new ApiResponse(200, order, "Order status updated successfully"));
});

// Delete an Order (Admin Only)
const deleteOrder = asyncHandler(async (req, res) => {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) throw new ApiError(404, "Order not found");

    res.status(200).json(new ApiResponse(200, null, "Order deleted successfully"));
});

module.exports = {
    createOrder,
    getAllOrders,
    getUserOrders,
    getSingleOrder,
    updateOrderStatus,
    deleteOrder,
};

