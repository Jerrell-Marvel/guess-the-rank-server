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
exports.submitGuess = void 0;
const Guess_1 = require("../models/Guess");
const Clip_1 = require("../models/Clip");
const BadRequestError_1 = require("../errors/BadRequestError");
const mongoose_1 = __importDefault(require("mongoose"));
const submitGuess = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { clipId } = req.params;
    const { rankGuess } = req.body;
    const clip = yield Clip_1.Clip.findOne({ _id: clipId }).populate({
        path: "category",
        populate: {
            path: "ranks",
        },
    });
    //   return res.json(clip);
    if (!clip) {
        throw new BadRequestError_1.BadRequestError("Invalid clip id");
    }
    let isCorrect = false;
    //   console.log(clip.actualRank, rankGuess);
    if (String(clip.actualRank) === rankGuess) {
        isCorrect = true;
    }
    const submittedGuess = yield Guess_1.Guess.create({ clip: clipId, rankGuess: rankGuess });
    console.log(clipId);
    // const test = await Guess.aggregate([
    //   {
    //     $match: {
    //       clip: new mongoose.Types.ObjectId(clipId),
    //     },
    //   },
    // ]);
    // console.log(test);
    const documentCounts = yield Guess_1.Guess.aggregate([
        {
            $match: {
                clip: new mongoose_1.default.Types.ObjectId(clipId),
            },
        },
        { $group: { _id: "$rankGuess", count: { $sum: 1 } } },
        {
            $lookup: {
                from: "ranks",
                localField: "_id",
                foreignField: "_id",
                as: "rank",
            },
        },
        {
            $unwind: {
                path: "$rank",
            },
        },
        {
            $project: {
                _id: 0,
            },
        },
    ]);
    const totalDocuments = yield Guess_1.Guess.countDocuments({ clip: clipId });
    const result = documentCounts.map((doc) => {
        const percentage = (doc.count / totalDocuments) * 100;
        return Object.assign(Object.assign({}, doc), { percentage: percentage.toFixed(2) });
    });
    return res.json({ result, isCorrect, totalDocuments });
});
exports.submitGuess = submitGuess;
