import mongoose, { mongo } from "mongoose";

import { BadRequestError } from "../errors/BadRequestError";
import { ClipSchema } from "../types/clip";
import { Category as CategoryType } from "../types/category";
import { Category } from "./Category";

const ClipSchema = new mongoose.Schema<ClipSchema>({
  link: {
    type: String,
    required: true,
  },
  actualRank: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Rank",
    required: true,
  },

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },

  status: {
    type: String,
    enum: ["pending", "verified"],
    default: "pending",
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

ClipSchema.pre("save", async function (next) {
  const category = (await Category.findOne({ _id: this.category })) as CategoryType;

  // let isRankValid = false;

  if (!category) {
    throw new BadRequestError("invalid category");
  }

  const isRankValid = category.ranks;

  if (!isRankValid) {
    throw new BadRequestError("invalid rank");
  }
  next();
});

export const Clip = mongoose.model<ClipSchema>("Clip", ClipSchema);
// const ClipSchema = new mongoose.Schema({});
