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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClips = exports.deleteClip = exports.verifyClip = exports.getClip = exports.createClip = void 0;
const Clip_1 = require("../models/Clip");
const createClip = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const clip = yield Clip_1.Clip.create(Object.assign(Object.assign({}, req.body), { status: "pending" }));
    return res.json({ clip });
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
    const { status = "pending" } = req.query;
    const clips = yield Clip_1.Clip.find({ category: categoryId, status });
    return res.json(clips);
});
exports.getClips = getClips;
