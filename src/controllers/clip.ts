import { Request, Response } from "express";
import { Clip } from "../models/Clip";
import { userInfo } from "os";
import { BadRequestError } from "../errors/BadRequestError";
export const createClip = async (req: Request<{}, {}>, res: Response) => {
  // console.log(req.userInfo);
  const { userId } = req.userInfo!;
  const clip = await Clip.create({ ...req.body, status: "pending", createdBy: userId });
  return res.json({ clip });

  //   return res.json("sucess");
};

export const getClip = async (req: Request, res: Response) => {
  const { categoryId } = req.params;
  const documentCount = await Clip.countDocuments({ status: "verified", category: categoryId });

  const randomNum = Math.floor(Math.random() * documentCount);

  const clip = await Clip.findOne({ status: "verified", category: categoryId }, { actualRank: 0 }).skip(randomNum);

  return res.json(clip);
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

export const getClips = async (req: Request, res: Response) => {
  const { categoryId } = req.params;
  const { status = "verified" } = req.query;
  const { userId, role } = req.userInfo!;

  const queryObject: { category: string; status: string; createdBy?: string } = { category: categoryId, status: status as string };

  if (role === "user") {
    queryObject.createdBy = userId;
  }

  const clips = await Clip.find(queryObject);

  return res.json(clips);
};

export const getClipDetail = async (req: Request, res: Response) => {
  const { userId, role } = req.userInfo!;
  const { clipId } = req.params;

  type b = {
    lol: string;
  };

  const queryObject: { _id: string; createdBy?: string } = { _id: clipId };

  if (role === "user") {
    queryObject.createdBy = userId;
  }

  const clip = await Clip.findOne(queryObject);

  if (!clip) {
    throw new BadRequestError("Clip not found");
  }

  return res.json(clip);
};
