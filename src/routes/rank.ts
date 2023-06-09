import express from "express";
import { createRank } from "../controllers/rank";
import { upload } from "../middleware/fileUpload";

export const router = express.Router();

router.route("/:categoryId").post(upload.single("rankImg"), createRank);
