import mongoose from "mongoose";

export type ClipSchema = {
  link: string;
  actualRank: mongoose.Types.ObjectId;
  category: mongoose.Types.ObjectId;
  status: "pending" | "verified";
  createdBy: mongoose.Types.ObjectId;
};

export type Clip = {
  _id: mongoose.Types.ObjectId;
  link: string;
  actualRank: mongoose.Types.ObjectId;
  category: mongoose.Types.ObjectId;
  status: "pending" | "verified";
  createdBy: mongoose.Types.ObjectId;
};
