const express = require("express");
const {
    getUserDetails,
    updateUserDetails,
    deleteUser,
    getAllUsers,
    getSingleUser,
    updateUserRole,
    toggleBanUser
} = require("../controllers/user.controllers.js");
const authMiddleware = require("../middlewares/auth.middlewares.js");
const rolesMiddleware = require("../middlewares/roles.middlewares.js");

const router = express.Router();

//  Authenticated User Routes
router.get("/user", authMiddleware, getUserDetails);
router.put("/update", authMiddleware, updateUserDetails);
router.delete("/delete", authMiddleware, deleteUser);

//  Admin Routes (Protected)
router.get("/users", authMiddleware, rolesMiddleware("admin"), getAllUsers);
router.get("/:id", authMiddleware, rolesMiddleware("admin"), getSingleUser);
router.put("/:id/role", authMiddleware, rolesMiddleware("admin"), updateUserRole);
router.put("/:id/ban", authMiddleware, rolesMiddleware("admin"), toggleBanUser);

module.exports = router;
