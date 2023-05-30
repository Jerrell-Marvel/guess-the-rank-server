"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const category_1 = require("../controllers/category");
const adminAuth_1 = require("../middleware/adminAuth");
exports.router = express_1.default.Router();
exports.router.route("/").post(adminAuth_1.adminAuth, category_1.createCategory);
