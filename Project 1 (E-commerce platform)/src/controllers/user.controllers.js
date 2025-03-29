const asyncHandler = require("../utils/asyncHandler.utils");
const ApiError = require("../utils/ApiError.utils");
const ApiResponse = require("../utils/ApiResponse.utils");
const userModel = require("../models/user.models");

const VALID_ROLES = ["user", "admin"];

//  Helper function to find user by ID
const findUserById = async (id) => {
    const user = await userModel.findById(id).select("-password -refreshToken");
    if (!user) throw new ApiError(404, "User not found");
    return user;
};

//  Get User Details
const getUserDetails = asyncHandler(async (req, res) => {
    res.status(200).json(new ApiResponse(200, req.user, "Current user details"));
});

//  Update User Details
const updateUserDetails = asyncHandler(async (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) throw new ApiError(400, "Name and email are required");

    const user = await userModel.findByIdAndUpdate(
        req.user._id,
        { name, email },
        { new: true, runValidators: true }
    ).select("-refreshToken");

    res.status(200).json(new ApiResponse(200, user, "Account details updated successfully"));
});

//  Delete User
const deleteUser = asyncHandler(async (req, res) => {
    const user = await userModel.findByIdAndDelete(req.user._id);
    if (!user) throw new ApiError(404, "User not found");

    res.status(200).json(new ApiResponse(200, null, "User account deleted successfully"));
});

//  Get All Users (Admin)
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await userModel.find().select("-password -refreshToken");
    res.status(200).json(new ApiResponse(200, users, "All users retrieved successfully"));
});

//  Get Single User (Admin)
const getSingleUser = asyncHandler(async (req, res) => {
    const user = await findUserById(req.params.id);
    res.status(200).json(new ApiResponse(200, user, "User details retrieved successfully"));
});

//  Update User Role (Admin)
const updateUserRole = asyncHandler(async (req, res) => {
    const { role } = req.body;
    if (!VALID_ROLES.includes(role)) throw new ApiError(400, "Invalid role value");

    const user = await userModel.findByIdAndUpdate(
        req.params.id,
        { role },
        { new: true, runValidators: true }
    );

    res.status(200).json(new ApiResponse(200, user, "User role updated successfully"));
});

//  Ban/Unban User (Admin)
const toggleBanUser = asyncHandler(async (req, res) => {
    const { isBanned } = req.body;
    if (typeof isBanned !== "boolean") throw new ApiError(400, "isBanned must be a boolean");

    const user = await userModel.findByIdAndUpdate(
        req.params.id,
        { isBanned },
        { new: true, runValidators: true }
    );

    res.status(200).json(new ApiResponse(200, user, `User has been ${isBanned ? "banned" : "unbanned"}`));
});

module.exports = {
    getUserDetails,
    updateUserDetails,
    deleteUser,
    getAllUsers,
    getSingleUser,
    updateUserRole,
    toggleBanUser
};
