# E-commerce Backend API

# Description

This project is a backend API for an E-commerce platform. It allows users to browse products, add them to a cart, and make purchases. Admin users have additional privileges to manage products and orders.

# Features

## User Features

### User registration and login (authentication)

###  Browse product catalog with categories

### Add products to the shopping cart

### Place and track orders

## Admin Features

### Add, update, and delete products

### View all orders

### Update order status

### Manage users


# Tech Stack

 Node.js with Express.js (Backend framework)

MongoDB with Mongoose (Database & ORM)

JWT Authentication (User authentication)

Bcrypt (Password hashing)

## Project Structure

E-commerce-Backend/
│── controllers/
│── middlewares/
│── models/
│── routes/
│── utils/
│── config/
│── server.js
│── package.json
│── .env
│── README.md

## Installation & Setup

Clone the repository

git clone <repository_url>
cd E-commerce-Backend

## Install dependencies

npm install

## Set up environment variables
Create a .env file and add:

PORT=5000
MONGO_URI= process.env.MONGO_URI
JWT_SECRET= process.env.JWT_SECRET 

## Run the server

npm start

API Endpoints

## Authentication Routes

POST /api/auth/register – Register a new user

POST /api/auth/login – Log in a user

Product Routes

GET /api/products – Get all products

GET /api/products/:id – Get product by ID

POST /api/products – (Admin) Add a new product

PUT /api/products/:id – (Admin) Update a product

DELETE /api/products/:id – (Admin) Delete a product

Cart Routes

POST /api/cart – Add product to cart

GET /api/cart – Get user’s cart

DELETE /api/cart/:id – Remove product from cart

Order Routes

POST /api/orders – Place an order

GET /api/orders/my-orders – Get user orders

GET /api/orders – (Admin) Get all orders

PUT /api/orders/:id/status – (Admin) Update order status

## Future Improvements

Payment integration

Order tracking

User roles & permissions

Review & rating system

## Author

Oghenetega Godwin

## License

This project is licensed under the MIT License.

