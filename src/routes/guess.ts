import express from "express";
import { submitGuess } from "../controllers/guess";
export const router = express.Router();

router.route("/:clipId").post(submitGuess);
