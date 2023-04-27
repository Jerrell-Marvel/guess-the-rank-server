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
//setting up express
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
//Dot env
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: "../.env" });
//cors
const cors_1 = __importDefault(require("cors"));
app.use((0, cors_1.default)({
    credentials: true,
    origin: ["http://localhost:3000", "127.0.0.1:5500", "192.168.0.182:3000"],
}));
//Express async errors
require("express-async-errors");
//Cookie parser
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const connectDB_1 = require("./db/connectDB");
app.use((0, cookie_parser_1.default)());
const passport_google_oauth20_1 = __importDefault(require("passport-google-oauth20"));
const GoogleStrategy = passport_google_oauth20_1.default.Strategy;
const PORT = 5000;
app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, connectDB_1.connectDB)(process.env.MONGO_URI);
        console.log(`Server is running on ${PORT}`);
    }
    catch (err) {
        console.log(err);
    }
}));
