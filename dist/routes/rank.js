"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const rank_1 = require("../controllers/rank");
const fileUpload_1 = require("../middleware/fileUpload");
exports.router = express_1.default.Router();
exports.router.route("/:categoryId").post((0, fileUpload_1.fileUpload)("rankImg", "/public/rank-images"), rank_1.createRank);
