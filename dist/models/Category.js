"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const CategorySchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    imgUrl: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    ranks: [
        {
            type: mongoose_1.default.Types.ObjectId,
            ref: "Rank",
        },
    ],
});
exports.Category = mongoose_1.default.model("Category", CategorySchema);
