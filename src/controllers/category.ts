import { Request, Response } from "express";
import { Category } from "../models/Category";
import { Rank } from "../models/Rank";

export const createCategory = async (req: Request, res: Response) => {
  // const ranks = await Rank.create(...req.body.ranks);

  // const rankIds = ranks.map((rank) => rank._id);

  const category = await Category.create({ ...req.body });

  return res.json({ category });
};

export const getCategories = async (req: Request, res: Response) => {
  const categories = await Category.find({});

  return res.json(categories);
};
