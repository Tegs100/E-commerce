const asyncHandler = require("../utils/asyncHandler.utils");
const ApiError = require("../utils/ApiError.utils");
const ApiResponse = require("../utils/ApiResponse.utils");
const Product = require("../models/products.models");

//  Create a Product (Admin Only)
const createProduct = asyncHandler(async (req, res) => {
    const { name, description, price, category, stock, images } = req.body;

    if (!name || !description || !price || !category || !stock || !images) {
        throw new ApiError(400, "All product fields are required");
    }

    const product = await Product.create({
        name,
        description,
        price,
        category,
        stock,
        images,
        createdBy: req.user._id, // Admin ID
    });

    res.status(201).json(new ApiResponse(201, product, "Product created successfully"));
});

//  Get All Products (Public)
const getAllProducts = asyncHandler(async (req, res) => {
    const products = await Product.find();
    res.status(200).json(new ApiResponse(200, products, "Products retrieved successfully"));
});

//  Get a Single Product by ID (Public)
const getSingleProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) throw new ApiError(404, "Product not found");

    res.status(200).json(new ApiResponse(200, product, "Product details retrieved"));
});

//  Update a Product (Admin Only)
const updateProduct = asyncHandler(async (req, res) => {
    const { name, description, price, category, stock, images } = req.body;

    const product = await Product.findByIdAndUpdate(
        req.params.id,
        { name, description, price, category, stock, images },
        { new: true, runValidators: true }
    );

    if (!product) throw new ApiError(404, "Product not found");

    res.status(200).json(new ApiResponse(200, product, "Product updated successfully"));
});

//  Delete a Product (Admin Only)
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) throw new ApiError(404, "Product not found");

    res.status(200).json(new ApiResponse(200, null, "Product deleted successfully"));
});

module.exports = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct
};
