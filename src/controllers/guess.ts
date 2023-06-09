import { Request, Response } from "express";
import { Guess } from "../models/Guess";
import { Clip } from "../models/Clip";
import { BadRequestError } from "../errors/BadRequestError";
import { Category } from "../models/Category";
import mongoose from "mongoose";
export const submitGuess = async (req: Request, res: Response) => {
  const { clipId } = req.params;
  const { rankGuess } = req.body as { rankGuess: string };
  const clip = await Clip.findOne({ _id: clipId }).populate({
    path: "category",
    populate: {
      path: "ranks",
    },
  });

  //   return res.json(clip);

  if (!clip) {
    throw new BadRequestError("Invalid clip id");
  }

  let isCorrect = false;
  //   console.log(clip.actualRank, rankGuess);
  if (String(clip.actualRank) === rankGuess) {
    isCorrect = true;
  }

  const submittedGuess = await Guess.create({ clip: clipId, rankGuess: rankGuess });

  // const clip2 = await Clip.aggregate([
  //   {
  //     $match: {
  //       _id: new mongoose.Types.ObjectId(clipId),
  //     },
  //   },
  //   {
  //     $lookup: {
  //       from: "categories",
  //       localField: "category",
  //       foreignField: "_id",
  //       as: "cats",
  //     },
  //   },

  //   {
  //     $lookup: {
  //       from: "ranks",
  //       localField: "cats.ranks",
  //       foreignField: "_id",
  //       as: "cats.rankks",
  //     },
  //   },
  // ]);
  // console.log(clip2);
  // console.log(JSON.stringify(clip2));

  // const test = await Guess.aggregate([
  //   {
  //     $match: {
  //       clip: new mongoose.Types.ObjectId(clipId),
  //     },
  //   },
  // ]);

  // console.log(test);

  const documentCounts = await Guess.aggregate([
    {
      $match: {
        clip: new mongoose.Types.ObjectId(clipId),
      },
    },
    { $group: { _id: "$rankGuess", count: { $sum: 1 } } },
    {
      $lookup: {
        from: "ranks",
        localField: "_id",
        foreignField: "_id",
        as: "rank",
      },
    },

    {
      $unwind: {
        path: "$rank",
      },
    },

    {
      $project: {
        _id: 0,
      },
    },
  ]);

  const totalDocuments = await Guess.countDocuments({ clip: clipId });

  const guesses = documentCounts.map((doc) => {
    const percentage = (doc.count / totalDocuments) * 100;
    return { ...doc, percentage: percentage.toFixed(2) };
  });

  guesses.forEach((res) => {
    //@ts-ignore
    const idx = clip.category.ranks;
  });

  //@ts-ignore

  return res.json({ guesses, isCorrect, totalDocuments });
};
