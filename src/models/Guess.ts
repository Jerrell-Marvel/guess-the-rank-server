import mongoose from "mongoose";
import { Clip } from "./Clip";
import { BadRequestError } from "../errors/BadRequestError";
const GuessSchema = new mongoose.Schema({
  clip: {
    type: mongoose.Types.ObjectId,
    ref: "Clip",
    required: true,
  },

  rankGuess: {
    type: mongoose.Types.ObjectId,
    ref: "Rank",
    required: true,
  },
});

GuessSchema.pre("save", async function (next) {
  const clip: any = await Clip.findOne({ _id: this.clip }).populate({
    path: "category",
    populate: {
      path: "ranks",
    },
  });

  if (!clip) {
    throw new BadRequestError("Invalid clip");
  }

  // if(clip.category.ranks)

  // if (!clip.category.ranks.includes(this.rankGuess)) {
  //   throw new BadRequestError("Invalid rankGuess");
  // }

  const isRankValid = clip.category.ranks.some((rank: any) => rank._id.toString() == this.rankGuess);

  if (!isRankValid) {
    throw new BadRequestError("Invalid rank");
  }
  next();

  // console.log(JSON.stringify(clip));
});

export const Guess = mongoose.model("Guess", GuessSchema);
