const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");


const healthCheckRoutes = require("./src/routes/healthCheck.routes");
const authRoutes = require("./src/routes/auth.routes.js");
const userRoutes = require("./src/routes/user.routes.js");
const productRoutes = require("./src/routes/products.routes.js");
const cartRoutes = require("./src/routes/cart.routes.js");
const orderRoutes = require("./src/routes/order.routes.js");
const errorHandler = require("./src/middlewares/error.middlewares.js");

const app = express();

// Middleware
app.use(cors({
     origin: process.env.CORS_ORIGIN,
     credentials: true
})); // This is used when the frontend is on a different than the backend
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api", healthCheckRoutes);

// Error Handling Middleware
app.use(errorHandler);

module.exports = app;
