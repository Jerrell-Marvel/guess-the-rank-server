import { Request, Response } from "express";
import { Category } from "../models/Category";
import { Rank } from "../models/Rank";

export const createCategory = async (req: Request, res: Response) => {
  const { filename } = req.file!;
  // const ranks = await Rank.create(...req.body.ranks);

  // const rankIds = ranks.map((rank) => rank._id);

  const category = await Category.create({ ...req.body, imgUrl: filename });

  return res.json({ category });
};

export const getCategories = async (req: Request, res: Response) => {
  const { ranks } = req.query;
  const categoriesQuery = Category.find({});

  if ((ranks as string) === "true") {
    categoriesQuery.populate("ranks");
  }

  const categories = await categoriesQuery;

  return res.json(categories);
};

export const getCategory = async (req: Request, res: Response) => {
  const { name } = req.params;

  const category = await Category.findOne({ name }).populate("ranks");

  return res.json(category);
};
