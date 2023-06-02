"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminAuth = void 0;
const UnauthorizedError_1 = require("../errors/UnauthorizedError");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const adminAuth = (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        throw new UnauthorizedError_1.UnauthorizedError("Token not provided");
    }
    try {
        const payload = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        // console.log(payload);
        if (payload.role !== "admin") {
            throw new UnauthorizedError_1.UnauthorizedError("Invalid token");
        }
        req.userInfo = Object.assign({}, payload);
        next();
    }
    catch (err) {
        throw new UnauthorizedError_1.UnauthorizedError("Invalid token");
    }
};
exports.adminAuth = adminAuth;
