"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Guess = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Clip_1 = require("./Clip");
const BadRequestError_1 = require("../errors/BadRequestError");
const GuessSchema = new mongoose_1.default.Schema({
    clip: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Clip",
        required: true,
    },
    rankGuess: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Rank",
        required: true,
    },
});
GuessSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const clip = yield Clip_1.Clip.findOne({ _id: this.clip }).populate({
            path: "category",
            populate: {
                path: "ranks",
            },
        });
        if (!clip) {
            throw new BadRequestError_1.BadRequestError("Invalid clip");
        }
        // if(clip.category.ranks)
        // if (!clip.category.ranks.includes(this.rankGuess)) {
        //   throw new BadRequestError("Invalid rankGuess");
        // }
        const isRankValid = clip.category.ranks.some((rank) => rank._id.toString() == this.rankGuess);
        if (!isRankValid) {
            throw new BadRequestError_1.BadRequestError("Invalid rank");
        }
        next();
        // console.log(JSON.stringify(clip));
    });
});
exports.Guess = mongoose_1.default.model("Guess", GuessSchema);
