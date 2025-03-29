const mongoose = require("mongoose");


const connectDB = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error("MongoDB URI is missing in .env file")
        }
        const connect = await mongoose
        .connect(
            process.env.MONGODB_URI
        )

        console.log(`Ecommerce Database connected successfully! DB host: ${connect.connection.host}`);
        
    }
    catch (error) {
        console.error ( "MongoDB connection failed", error)
        process.exit(1)
    }
}

module.exports = connectDB;