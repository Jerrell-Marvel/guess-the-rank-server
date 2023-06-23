import mongoose from "mongoose";
import { Rank } from "./rank";

export type CategorySchema = {
  name: string;
  imgUrl: string;
  description: string;
  ranks: mongoose.Types.ObjectId[] | Rank[];
};

export type Category = CategorySchema & {
  _id: mongoose.Types.ObjectId;
};

// export type CategoryWithRanks = Omit<Category, "ranks"> & { ranks: number };

export type CategoryWithRanks = Omit<Category, "ranks"> & { ranks: Rank[] };
