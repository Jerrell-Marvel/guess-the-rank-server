import express from "express";
import { createRank } from "../controllers/rank";
import { fileUpload } from "../middleware/fileUpload";

export const router = express.Router();

router.route("/:categoryId").post(fileUpload("rankImg", "/public/rank-images"), createRank);
