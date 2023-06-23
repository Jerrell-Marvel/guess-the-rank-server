import { Request, Response } from "express";
import { Guess } from "../models/Guess";
import { Clip } from "../models/Clip";
import { BadRequestError } from "../errors/BadRequestError";
import { Category } from "../models/Category";
import mongoose from "mongoose";
import { ClipWithRanks } from "../types/clip";
import { GuessWithPercentage, Guesses, GuessesWithPercentage } from "../types/guess";

export const submitGuess = async (req: Request, res: Response<{ isCorrect: boolean; guesses: GuessesWithPercentage; totalGuesses: number }>) => {
  const { clipId } = req.params;
  const { rankGuess } = req.body as { rankGuess: string | undefined };

  if (!rankGuess) {
    throw new BadRequestError("rank id isn't included");
  }

  const clip = (await Clip.findOne({ _id: clipId }).populate({
    path: "category",
    populate: {
      path: "ranks",
    },
  })) as ClipWithRanks | null;

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
  //       _id: new string(clipId),
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
  //       clip: new string(clipId),
  //     },
  //   },
  // ]);

  // console.log(test);

  const guesses = (await Guess.aggregate([
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
  ])) as Guesses;

  // console.log(documentCounts);

  const totalGuesses = await Guess.countDocuments({ clip: clipId });

  const guessesWithPercentage = guesses.map((doc) => {
    const percentage = (doc.count / totalGuesses) * 100;
    return { ...doc, percentage: percentage.toFixed(2) };
  });

  // const a = ranks.map((rank) => {
  //   const rankData = guesses.find((e) => e.rank._id == rank._id);
  //   return { ...rank, count: rankData?.count || 0, percentage: rankData?.percentage || "0" };
  // });

  // const result = { total: totalGuesses, isCorrect: isCorrect, ranks: a };
  // console.log(JSON.stringify(result));

  return res.json({ guesses: guessesWithPercentage, isCorrect, totalGuesses });
};
