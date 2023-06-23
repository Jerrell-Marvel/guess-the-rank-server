import mongoose from "mongoose";
import { RankSchema } from "../types/rank";

const RankSchema = new mongoose.Schema<RankSchema>({
  name: {
    type: String,
    required: true,
  },

  imgUrl: {
    type: String,
    required: true,
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

export const Rank = mongoose.model<RankSchema>("Rank", RankSchema);
