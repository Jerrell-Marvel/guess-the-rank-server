import mongoose from "mongoose";

import { CategorySchema } from "../types/category";

const CategorySchema = new mongoose.Schema<CategorySchema>({
  name: {
    type: String,
    required: true,
    unique: true,
  },

  imgUrl: {
    type: String,
    required: true,
  },

  description: {
    type: String,
  },

  ranks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Rank",
    },
  ],
});

export const Category = mongoose.model<CategorySchema>("Category", CategorySchema);
