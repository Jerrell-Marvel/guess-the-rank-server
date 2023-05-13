import express from "express";
import { createCategory } from "../controllers/category";
export const router = express.Router();

router.route("/").post(createCategory);
