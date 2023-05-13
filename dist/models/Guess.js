"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Guess = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const GuessSchema = new mongoose_1.default.Schema({
    clip: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "Clip",
        required: true,
    },
    rankGuess: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "Rank",
        required: true,
    },
});
exports.Guess = mongoose_1.default.model("Guess", GuessSchema);
