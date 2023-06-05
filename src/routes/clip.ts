import express from "express";
import { authentication } from "../middleware/authentication";
import { createClip, deleteClip, getClip, getClipDetail, getClips, verifyClip } from "../controllers/clip";
import { adminAuth } from "../middleware/adminAuth";

export const router = express.Router();

router.route("/clip").post(authentication, createClip);
router.route("/clip/:clipId").delete(adminAuth, deleteClip);
router.route("/clip/details/:clipId").get(getClipDetail);
router.route("/clip/:categoryId").get(getClip);
router.route("/clip/verify/:clipId").post(adminAuth, verifyClip);

router.route("/clips/:categoryId").get(authentication, getClips);
