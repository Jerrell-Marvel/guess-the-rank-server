"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileUpload = void 0;
const multer_1 = __importDefault(require("multer"));
const BadRequestError_1 = require("../errors/BadRequestError");
const path_1 = __importDefault(require("path"));
const fileUpload = (fieldName, destination) => {
    const upload = (0, multer_1.default)({
        storage: multer_1.default.diskStorage({
            destination: function (req, file, cb) {
                // console.log(path.resolve(__dirname, "..", "/public/rank-images", "rank-images"));
                // console.log(path.resolve(__dirname, "..", ...destination.split("/")));
                cb(null, path_1.default.resolve(__dirname, "..", ...destination.split("/")));
            },
            filename: function (req, file, cb) {
                const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
                cb(null, file.fieldname + "-" + uniqueSuffix + path_1.default.extname(file.originalname).toLowerCase());
            },
        }),
        limits: {
            fileSize: 1024 * 1024 * 3,
        },
        fileFilter: function (req, file, cb) {
            const filetypes = /jpeg|jpg|png/;
            const mimetype = filetypes.test(file.mimetype);
            const extname = filetypes.test(path_1.default.extname(file.originalname).toLowerCase());
            if (mimetype && extname) {
                return cb(null, true);
            }
            cb(new BadRequestError_1.BadRequestError("File upload only supports the following filetypes - " + filetypes));
        },
    });
    return upload.single(fieldName);
};
exports.fileUpload = fileUpload;
