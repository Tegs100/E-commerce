const ApiError = require("../utils/ApiError.utils");

const rolesMiddleware = (requiredRole) => {
    return (req, res, next) => {
        if (!req.user || req.user.role !== requiredRole) {
            return next(new ApiError(403, "Access denied. Admins only."));
        }
        next();
    };
};

module.exports = rolesMiddleware;
