import mongoose from "mongoose";
import { Rank } from "./rank";
import { Category, CategoryWithRanks } from "./category";
import { User } from "./user";

export type ClipSchema = {
  link: string;
  actualRank: string | Rank;
  category: string | Category;
  status: "pending" | "verified";
  createdBy: string | User;
};

export type Clip = ClipSchema & {
  _id: mongoose.Types.ObjectId;
};

export type Clips = Clip[];

export type ClipWithRanks = Omit<Omit<ClipSchema, "category">, "actualRank"> & { actualRank: string; category: CategoryWithRanks };

export type ClipWithActualRank = Omit<ClipSchema, "actualRank"> & { actualRank: Rank };
