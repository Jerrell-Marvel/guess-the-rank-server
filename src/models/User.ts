import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

type User = {
  id: string;
  username: string;
  email: string;
  password: string;
};

// type UserMethods = {
//   matchPassword: (userPassword: string) => Promise<boolean>;
//   createJWT: () => string;
// };

const UserSchema = new mongoose.Schema<User>({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
  },

  // email: {
  //   type: String,
  //   required: [true, "Please provide email"],
  //   unique: true,
  // },

  // password: {
  //   type: String,
  //   required: true,
  // },
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

export const User = mongoose.model("User", UserSchema);
