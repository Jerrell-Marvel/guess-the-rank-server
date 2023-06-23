import mongoose from "mongoose";
import { Rank } from "./rank";
import { Category, CategoryWithRanks } from "./category";
import { User } from "./user";

export type ClipSchema = {
  link: string;
  actualRank: mongoose.Types.ObjectId | Rank;
  category: mongoose.Types.ObjectId | Category;
  status: "pending" | "verified";
  createdBy: mongoose.Types.ObjectId | User;
};

export type Clip = ClipSchema & {
  _id: mongoose.Types.ObjectId;
};

export type ClipWithRanks = Omit<Omit<ClipSchema, "category">, "actualRank"> & { actualRank: mongoose.Types.ObjectId; category: CategoryWithRanks };

export type ClipWithActualRank = Omit<ClipSchema, "actualRank"> & { actualRank: Rank };
