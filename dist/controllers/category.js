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
exports.createCategory = void 0;
const Category_1 = require("../models/Category");
const Rank_1 = require("../models/Rank");
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ranks = yield Rank_1.Rank.create(...req.body.ranks);
    const rankIds = ranks.map((rank) => rank._id);
    const category = yield Category_1.Category.create(Object.assign(Object.assign({}, req.body), { ranks: rankIds }));
    return res.json({ category });
});
exports.createCategory = createCategory;
