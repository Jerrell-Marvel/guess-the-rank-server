import express from "express";
import { createCategory, getCategories } from "../controllers/category";
import { adminAuth } from "../middleware/adminAuth";
export const router = express.Router();

router.route("/category").post(adminAuth, createCategory);
router.route("/categories").get(getCategories);
