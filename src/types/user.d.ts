import mongoose from "mongoose";

export type UserSchema = {
  id: string;
  username: string;
  role: "admin" | "user";
};

export type User = UserSchema & { _id: mongoose.Types.ObjectId };
