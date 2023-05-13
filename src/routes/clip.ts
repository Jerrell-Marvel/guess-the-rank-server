import express from "express";
import { authentication } from "../middleware/authentication";
import { createClip, getClip } from "../controllers/clip";

export const router = express.Router();

router.route("/").post(createClip);
router.route("/:categoryId").get(getClip);
