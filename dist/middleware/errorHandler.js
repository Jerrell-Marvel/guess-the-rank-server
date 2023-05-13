"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const http_status_codes_1 = require("http-status-codes");
const errorHandler = (err, req, res, next) => {
    console.log(JSON.stringify(err));
    let customError = {
        success: false,
        name: err.name || "Internal server error",
        statusCode: err.statusCode || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
        message: err.message || "Something went wrong try again later",
    };
    if (err.code === 11000 || err.name === "ValidationError") {
        customError.statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST;
    }
    // return res.json(err);
    // next(err);
    return res.status(customError.statusCode).json(customError);
};
exports.errorHandler = errorHandler;
