import express from "express";
import { createCategory, getCategories, getCategory } from "../controllers/category";
import { adminAuth } from "../middleware/adminAuth";
import { fileUpload } from "../middleware/fileUpload";
export const router = express.Router();

router.route("/category").post(adminAuth, fileUpload("categoryImg", "/public/category-images"), createCategory);
router.route("/categories").get(getCategories);
router.route("/category/:name").get(getCategory);
