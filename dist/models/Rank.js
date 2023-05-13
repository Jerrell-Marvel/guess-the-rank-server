"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rank = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const RankSchema = new mongoose_1.default.Schema({
    name: {
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
exports.Rank = mongoose_1.default.model("Rank", RankSchema);
