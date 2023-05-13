import mongoose from "mongoose";
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

export const Guess = mongoose.model("Guess", GuessSchema);
