import { Request, Response } from "express";
import { Rank } from "../models/Rank";
import { Category } from "../models/Category";
import { BadRequestError } from "../errors/BadRequestError";
import { Rank as RankType } from "../types/rank";

export const createRank = async (req: Request, res: Response<RankType>) => {
  const { filename } = req.file!;
  const { categoryId } = req.params;
  const rank = await Rank.create({ ...req.body, imgUrl: filename });
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

  return res.json(rank);
};
