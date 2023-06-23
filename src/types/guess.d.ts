import mongoose from "mongoose";
import { Rank } from "./rank";
export type GuessSchema = {
  clip: mongoose.Types.ObjectId;
  rankGuess: mongoose.Types.ObjectId;
};

type Guess = {
  count: number;
  rank: Rank;
};

export type Guesses = Guess[];

type GuessWithPercentage = Guess & { percentage: string };

export type GuessesWithPercentage = GuessWithPercentage[];
