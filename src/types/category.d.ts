import mongoose from "mongoose";

export type CategorySchema = {
  name: string;
  imgUrl: string;
  description: string;
  ranks: mongoose.Types.ObjectId[];
};

export type Category = {
  _id: mongoose.Types.ObjectId;
  name: string;
  imgUrl: string;
  description: string;
  ranks: mongoose.Types.ObjectId[];
};

export type CategoryWithRanks = Omit<Category, "ranks"> & { ranks: number };
