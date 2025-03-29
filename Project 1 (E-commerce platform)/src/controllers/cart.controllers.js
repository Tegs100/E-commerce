const asyncHandler = require("../utils/asyncHandler.utils");
const ApiError = require("../utils/ApiError.utils");
const ApiResponse = require("../utils/ApiResponse.utils");
const Cart = require("../models/cart.models");
const Product = require("../models/products.models");

// Get User's Cart
const getCart = asyncHandler(async (req, res) => {
    const cart = await Cart.findOne({ user: req.user._id }).populate("items.product", "name price");
    if (!cart) throw new ApiError(404, "Cart not found");

    res.status(200).json(new ApiResponse(200, cart, "Cart retrieved successfully"));
});

// Add Item to Cart
const addToCart = asyncHandler(async (req, res) => {
    const { productId, quantity } = req.body;

    if (!productId || !quantity) throw new ApiError(400, "Product ID and quantity are required");

    const product = await Product.findById(productId);
    if (!product) throw new ApiError(404, "Product not found");

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
        cart = await Cart.create({ user: req.user._id, items: [{ product: productId, quantity }] });
    } else {
        const existingItem = cart.items.find(item => item.product.toString() === productId);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({ product: productId, quantity });
        }
        await cart.save();
    }

    res.status(200).json(new ApiResponse(200, cart, "Item added to cart"));
});

// Update Cart Item Quantity
const updateCartItem = asyncHandler(async (req, res) => {
    const { productId, quantity } = req.body;

    if (!productId || quantity < 1) throw new ApiError(400, "Valid product ID and quantity are required");

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) throw new ApiError(404, "Cart not found");

    const item = cart.items.find(item => item.product.toString() === productId);
    if (!item) throw new ApiError(404, "Product not in cart");

    item.quantity = quantity;
    await cart.save();

    res.status(200).json(new ApiResponse(200, cart, "Cart updated successfully"));
});

// Remove Item from Cart
const removeFromCart = asyncHandler(async (req, res) => {
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) throw new ApiError(404, "Cart not found");

    cart.items = cart.items.filter(item => item.product.toString() !== productId);
    await cart.save();

    res.status(200).json(new ApiResponse(200, cart, "Item removed from cart"));
});

// 🔹 Clear Cart
const clearCart = asyncHandler(async (req, res) => {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) throw new ApiError(404, "Cart not found");

    cart.items = [];
    await cart.save();

    res.status(200).json(new ApiResponse(200, null, "Cart cleared successfully"));
});

module.exports = {
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
};
