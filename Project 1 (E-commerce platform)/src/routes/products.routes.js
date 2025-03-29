const express = require("express");
const {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct
} = require("../controllers/products.controllers.js");
const authMiddleware = require("../middlewares/auth.middlewares.js");
const rolesMiddleware = require("../middlewares/roles.middlewares.js");

const router = express.Router();

//  Public Routes
router.get("/products", getAllProducts);
router.get("/:id/product", getSingleProduct);

//  Admin Routes (Protected)
router.post("/:c/product", authMiddleware, rolesMiddleware("admin"), createProduct);
router.put("/:id/update", authMiddleware, rolesMiddleware("admin"), updateProduct);
router.delete("/:id/delete", authMiddleware, rolesMiddleware("admin"), deleteProduct);

module.exports = router;
