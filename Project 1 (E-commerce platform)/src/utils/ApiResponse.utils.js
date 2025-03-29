class ApiResponse {
    constructor(statusCode, data = {}, message = "") {
        this.statusCode = statusCode;
        this.data = data || {}; // Ensures data is never null/undefined
        this.message = message;
        this.success = statusCode >= 200 && statusCode < 300; // Explicit success check
    }
}

module.exports = ApiResponse;
