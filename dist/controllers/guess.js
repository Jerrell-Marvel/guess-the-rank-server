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
    if (!rankGuess) {
        throw new BadRequestError_1.BadRequestError("rank id isn't included");
    }
    const clip = (yield Clip_1.Clip.findOne({ _id: clipId }).populate({
        path: "category",
        populate: {
            path: "ranks",
        },
    }));
    if (!clip) {
        throw new BadRequestError_1.BadRequestError("Invalid clip id");
    }
    let isCorrect = false;
    //   console.log(clip.actualRank, rankGuess);
    if (String(clip.actualRank) === rankGuess) {
        isCorrect = true;
    }
    const submittedGuess = yield Guess_1.Guess.create({ clip: clipId, rankGuess: rankGuess });
    // const clip2 = await Clip.aggregate([
    //   {
    //     $match: {
    //       _id: new mongoose.Types.ObjectId(clipId),
    //     },
    //   },
    //   {
    //     $lookup: {
    //       from: "categories",
    //       localField: "category",
    //       foreignField: "_id",
    //       as: "cats",
    //     },
    //   },
    //   {
    //     $lookup: {
    //       from: "ranks",
    //       localField: "cats.ranks",
    //       foreignField: "_id",
    //       as: "cats.rankks",
    //     },
    //   },
    // ]);
    // console.log(clip2);
    // console.log(JSON.stringify(clip2));
    // const test = await Guess.aggregate([
    //   {
    //     $match: {
    //       clip: new mongoose.Types.ObjectId(clipId),
    //     },
    //   },
    // ]);
    // console.log(test);
    const guesses = (yield Guess_1.Guess.aggregate([
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
    ]));
    // console.log(documentCounts);
    const totalGuesses = yield Guess_1.Guess.countDocuments({ clip: clipId });
    const guessesWithPercentage = guesses.map((doc) => {
        const percentage = (doc.count / totalGuesses) * 100;
        return Object.assign(Object.assign({}, doc), { percentage: percentage.toFixed(2) });
    });
    // const a = ranks.map((rank) => {
    //   const rankData = guesses.find((e) => e.rank._id == rank._id);
    //   return { ...rank, count: rankData?.count || 0, percentage: rankData?.percentage || "0" };
    // });
    // const result = { total: totalGuesses, isCorrect: isCorrect, ranks: a };
    // console.log(JSON.stringify(result));
    return res.json({ guesses: guessesWithPercentage, isCorrect, totalGuesses });
});
exports.submitGuess = submitGuess;
