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
exports.getClipDetail = exports.getClips2 = exports.getClips = exports.deleteClip = exports.verifyClip = exports.getClip = exports.createClip = void 0;
const Clip_1 = require("../models/Clip");
const BadRequestError_1 = require("../errors/BadRequestError");
const Guess_1 = require("../models/Guess");
const mongoose_1 = __importDefault(require("mongoose"));
const createClip = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.userInfo);
    const { userId } = req.userInfo;
    const clip = yield Clip_1.Clip.create(Object.assign(Object.assign({}, req.body), { status: "pending", createdBy: userId }));
    return res.json(clip);
    //   return res.json("sucess");
});
exports.createClip = createClip;
const getClip = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoryId } = req.params;
    const documentCount = yield Clip_1.Clip.countDocuments({ status: "verified", category: categoryId });
    const randomNum = Math.floor(Math.random() * documentCount);
    const clip = yield Clip_1.Clip.findOne({ status: "verified", category: categoryId }, { actualRank: 0 }).skip(randomNum);
    return res.json(clip);
});
exports.getClip = getClip;
const verifyClip = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { clipId } = req.params;
    const verifiedClip = yield Clip_1.Clip.findOneAndUpdate({ _id: clipId }, { status: "verified" }, { new: true });
    return res.json(verifiedClip);
});
exports.verifyClip = verifyClip;
const deleteClip = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { clipId } = req.params;
    const deletedClip = yield Clip_1.Clip.findOneAndDelete({ _id: clipId });
    return res.json(deletedClip);
});
exports.deleteClip = deleteClip;
const getClips = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoryId } = req.params;
    const { status = "verified" } = req.query;
    const { userId, role } = req.userInfo;
    const queryObject = { category: categoryId, status: status };
    if (role === "user") {
        queryObject.createdBy = userId;
    }
    const clips = yield Clip_1.Clip.find(queryObject);
    return res.json(clips);
});
exports.getClips = getClips;
const getClips2 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const { categoryId } = req.params;
    const { status = "verified", categoryId } = req.query;
    const { userId, role } = req.userInfo;
    const queryObject = { status: status };
    if (categoryId) {
        queryObject.category = categoryId;
    }
    if (role === "user") {
        queryObject.createdBy = userId;
    }
    const clips = yield Clip_1.Clip.find(queryObject);
    const clipIds = clips.map((clip) => clip._id);
    console.log(clipIds);
    // const result = clips.map(async (clip) => {
    //   const totalGuess = await Guess.countDocuments({ clip: clip._id });
    //   const totalCorrectGuess = await Guess.countDocuments({ clip: clip._id, rankGuess: clip.actualRank });
    //   return { ...clip, totalGuess, totalCorrectGuess };
    // });
    // console.log(result);
    // console.log(rankIds);
    // const guesses = await Guess.aggregate([
    //   {
    //     $match: {
    //       clip: { $in: rankIds },
    //     },
    //   },
    //   { $group: { _id: "$clip", count: { $sum: 1 } } },
    // ]);
    // console.log(guesses);
    return res.json(clips);
});
exports.getClips2 = getClips2;
const getClipDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, role } = req.userInfo;
    const { clipId } = req.params;
    const queryObject = { _id: clipId };
    if (role === "user") {
        queryObject.createdBy = userId;
    }
    const clip = yield Clip_1.Clip.findOne(queryObject).populate("actualRank");
    if (!clip) {
        throw new BadRequestError_1.BadRequestError("Clip not found");
    }
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
    const guesses = documentCounts.map((doc) => {
        const percentage = (doc.count / totalDocuments) * 100;
        return Object.assign(Object.assign({}, doc), { percentage: percentage.toFixed(2) });
    });
    return res.json({ clip, guesses, totalDocuments });
});
exports.getClipDetail = getClipDetail;
