import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserSchema } from "../types/user";

// type User = {
//   id: string;
//   username: string;
//   email: string;
//   password: string;
//   role: "admin" | "user";
// };

// type UserMethods = {
//   matchPassword: (userPassword: string) => Promise<boolean>;
//   createJWT: () => string;
// };

const UserSchema = new mongoose.Schema<UserSchema>({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    default: "user",
    enum: ["admin", "user"],
  },
});

// UserSchema.pre("save", async function (next) {
//   const salt = await bcrypt.genSalt(10);
//   const hashedPass = await bcrypt.hash(this.password, salt);
//   this.password = hashedPass;
// });

// UserSchema.methods.matchPassword = async function (userPassword) {
//   const isPasswordMatch = await bcrypt.compare(userPassword, this.password);
//   return isPasswordMatch;
// };

// UserSchema.methods.createJWT = function () {
//   return jwt.sign({ username: this.username, userId: this._id }, process.env.JWT_SECRET!, {
//     expiresIn: process.env.JWT_LIFETIME,
//   });
// };

export const User = mongoose.model<UserSchema>("User", UserSchema);
