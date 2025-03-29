const express = require("express");
const router = express.Router();
const {
    createOrder,
    getAllOrders,
    getUserOrders,
    getSingleOrder,
    updateOrderStatus,
    deleteOrder
} = require("../controllers/order.controllers.js");
const authMiddleware = require("../middlewares/auth.middlewares.js");
const rolesMiddleware = require("../middlewares/roles.middlewares.js");

//  Create an Order (Authenticated User)
router.post("/", authMiddleware, createOrder);

//  Get All Orders (Admin Only)
router.get("/", authMiddleware, rolesMiddleware(["admin"]), getAllOrders);

//  Get User's Orders (Authenticated User)
router.get("/my-orders", authMiddleware, getUserOrders);

//  Get a Single Order by ID (Admin & Owner)
router.get("/:id", authMiddleware, getSingleOrder);

//  Update Order Status (Admin Only)
router.put("/:id/status", authMiddleware, rolesMiddleware(["admin"]), updateOrderStatus);

//  Delete an Order (Admin Only)
router.delete("/:id", authMiddleware, rolesMiddleware(["admin"]), deleteOrder);

module.exports = router;

