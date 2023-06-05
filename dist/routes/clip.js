"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const authentication_1 = require("../middleware/authentication");
const clip_1 = require("../controllers/clip");
const adminAuth_1 = require("../middleware/adminAuth");
exports.router = express_1.default.Router();
exports.router.route("/clip").post(authentication_1.authentication, clip_1.createClip);
exports.router.route("/clip/:clipId").delete(adminAuth_1.adminAuth, clip_1.deleteClip);
exports.router.route("/clip/details/:clipId").get(clip_1.getClipDetail);
exports.router.route("/clip/:categoryId").get(clip_1.getClip);
exports.router.route("/clip/verify/:clipId").post(adminAuth_1.adminAuth, clip_1.verifyClip);
exports.router.route("/clips/:categoryId").get(authentication_1.authentication, clip_1.getClips);
