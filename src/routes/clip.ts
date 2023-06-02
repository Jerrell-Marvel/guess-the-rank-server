import express from "express";
import { authentication } from "../middleware/authentication";
import { createClip, deleteClip, getClip, verifyClip } from "../controllers/clip";
import { adminAuth } from "../middleware/adminAuth";

export const router = express.Router();

router.route("/").post(createClip);
router.route("/:clipId").delete(adminAuth, deleteClip);
router.route("/:categoryId").get(getClip);
router.route("/verify/:clipId").post(adminAuth, verifyClip);
