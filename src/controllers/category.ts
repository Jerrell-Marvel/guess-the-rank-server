import { Request, Response } from "express";
import { Category } from "../models/Category";
import { Rank } from "../models/Rank";
import { Categories, CategoriesWithRanks, Category as CategoryType, CategoryWithRanks } from "../types/category";

export const createCategory = async (req: Request, res: Response<CategoryType>) => {
  const { filename } = req.file!;
  // const ranks = await Rank.create(...req.body.ranks);

  // const rankIds = ranks.map((rank) => rank._id);

  const category = (await Category.create({ ...req.body, imgUrl: filename })) as CategoryType;

  return res.json(category);
};

export const getCategories = async (req: Request, res: Response<Categories | CategoriesWithRanks>) => {
  const { ranks } = req.query;
  const categoriesQuery = Category.find({});

  if ((ranks as string) === "true") {
    categoriesQuery.populate("ranks");
  }

  const categories = (await categoriesQuery) as Categories | CategoriesWithRanks;

  return res.json(categories);
};

export const getCategory = async (req: Request, res: Response<CategoryWithRanks | null>) => {
  const { name } = req.params;

  const category = (await Category.findOne({ name }).populate("ranks")) as CategoryWithRanks | null;

  return res.json(category);
};
