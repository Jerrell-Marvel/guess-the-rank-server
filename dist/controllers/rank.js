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
exports.createRank = void 0;
const Rank_1 = require("../models/Rank");
const Category_1 = require("../models/Category");
const BadRequestError_1 = require("../errors/BadRequestError");
const createRank = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { filename } = req.file;
    const { categoryId } = req.params;
    const rank = yield Rank_1.Rank.create(Object.assign(Object.assign({}, req.body), { imgUrl: filename }));
    const category = yield Category_1.Category.findOneAndUpdate({ _id: categoryId }, {
        $push: {
            ranks: rank._id,
        },
    }, { new: true });
    if (!category) {
        throw new BadRequestError_1.BadRequestError("Invalid category id");
    }
    return res.json({ category });
});
exports.createRank = createRank;
