import { Request, Response } from "express";
import { Clip } from "../models/Clip";
export const createClip = async (req: Request<{}, {}>, res: Response) => {
  const clip = await Clip.create({ ...req.body, status: "pending" });
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

export const verifyClip = async (req: Request, res: Response) => {
  const { clipId } = req.params;
  const verifiedClip = await Clip.findOneAndUpdate({ _id: clipId }, { status: "verified" }, { new: true });
  return res.json(verifiedClip);
};

export const deleteClip = async (req: Request, res: Response) => {
  const { clipId } = req.params;
  const deletedClip = await Clip.findOneAndDelete({ _id: clipId });
  return res.json(deletedClip);
};
