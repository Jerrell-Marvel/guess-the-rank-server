import { Request, Response } from "express";
import { Clip } from "../models/Clip";
export const createClip = async (req: Request<{}, {}>, res: Response) => {
  const clip = await Clip.create({ ...req.body, status: "verified" });
  return res.json({ clip });

  //   return res.json("sucess");
};

export const getClip = async (req: Request, res: Response) => {
  const { categoryId } = req.params;
  const documentCount = await Clip.countDocuments({ status: "verified", category: categoryId });

  const randomNum = Math.floor(Math.random() * documentCount);

  const clip = await Clip.findOne({ status: "verified", category: categoryId }).skip(randomNum);

  return res.json({ clip });
};
