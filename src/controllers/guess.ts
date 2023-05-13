import { Request, Response } from "express";
import { Guess } from "../models/Guess";
import { Clip } from "../models/Clip";
import { BadRequestError } from "../errors/BadRequestError";
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

  const count = await Guess.aggregate([{ $group: { _id: "$rankGuess", count: { $sum: 1 } } }]);

  return res.json({ count, isCorrect });
};
