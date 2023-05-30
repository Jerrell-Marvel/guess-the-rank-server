import express from "express";
import { createCategory } from "../controllers/category";
import { adminAuth } from "../middleware/adminAuth";
export const router = express.Router();

router.route("/").post(adminAuth, createCategory);
