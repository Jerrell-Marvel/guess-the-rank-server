"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const clip_1 = require("../controllers/clip");
exports.router = express_1.default.Router();
exports.router.route("/").post(clip_1.createClip);
exports.router.route("/:categoryId").get(clip_1.getClip);
