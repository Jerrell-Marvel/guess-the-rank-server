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
exports.Clip = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Category_1 = require("./Category");
const BadRequestError_1 = require("../errors/BadRequestError");
const ClipSchema = new mongoose_1.default.Schema({
    link: {
        type: String,
        required: true,
    },
    actualRank: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Rank",
        required: true,
    },
    category: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "verified"],
        default: "pending",
    },
    createdBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});
ClipSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const category = yield Category_1.Category.findOne({ _id: this.category });
        // let isRankValid = false;
        if (!category) {
            throw new BadRequestError_1.BadRequestError("invalid category");
        }
        const isRankValid = category.ranks.includes(this.actualRank);
        if (!isRankValid) {
            throw new BadRequestError_1.BadRequestError("invalid rank");
        }
        next();
    });
});
exports.Clip = mongoose_1.default.model("Clip", ClipSchema);
// const ClipSchema = new mongoose.Schema({});
