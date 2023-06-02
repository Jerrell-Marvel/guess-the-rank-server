import { Request, Response } from "express";
import { Rank } from "../models/Rank";
import { Category } from "../models/Category";
import { BadRequestError } from "../errors/BadRequestError";
export const createRank = async (req: Request, res: Response) => {
  const { categoryId } = req.params;

  const rank = await Rank.create({ ...req.body });

  const category = await Category.findOneAndUpdate(
    { _id: categoryId },
    {
      $push: {
        ranks: rank._id,
      },
    },
    { new: true }
  );

  if (!category) {
    throw new BadRequestError("Invalid category id");
  }

  return res.json({ category });
};
