"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authentication = void 0;
const UnauthorizedError_1 = require("../errors/UnauthorizedError");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authentication = (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        throw new UnauthorizedError_1.UnauthorizedError("Token not provided");
    }
    try {
        const payload = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.userInfo = {
            userId: payload.id,
            username: payload.username,
        };
        next();
    }
    catch (err) {
        throw new UnauthorizedError_1.UnauthorizedError("Invalid token");
    }
};
exports.authentication = authentication;
