import express from "express";
import { createRank } from "../controllers/rank";

export const router = express.Router();

router.route("/:categoryId").post(createRank);
