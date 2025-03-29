const express = require("express");
const router = express.Router();
const {
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart
} = require("../controllers/cart.controllers.js");
const authMiddleware = require("../middlewares/auth.middlewares.js");

//  Get User's Cart (Authenticated User)
router.get("/", authMiddleware, getCart);

//  Add Item to Cart (Authenticated User)
router.post("/", authMiddleware, addToCart);

//  Update Cart Item Quantity (Authenticated User)
router.put("/:id", authMiddleware, updateCartItem);

//  Remove Item from Cart (Authenticated User)
router.delete("/:productId", authMiddleware, removeFromCart);

//  Clear Cart (Authenticated User)
router.delete("/", authMiddleware, clearCart);

module.exports = router;

