import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },

  imgBanner: {
    type: String,
  },

  description: {
    type: String,
  },

  ranks: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Rank",
    },
  ],
});

export const Category = mongoose.model("Category", CategorySchema);
