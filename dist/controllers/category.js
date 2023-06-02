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
exports.getCategories = exports.createCategory = void 0;
const Category_1 = require("../models/Category");
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const ranks = await Rank.create(...req.body.ranks);
    // const rankIds = ranks.map((rank) => rank._id);
    const category = yield Category_1.Category.create(Object.assign({}, req.body));
    return res.json({ category });
});
exports.createCategory = createCategory;
const getCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield Category_1.Category.find({});
    return res.json(categories);
});
exports.getCategories = getCategories;
