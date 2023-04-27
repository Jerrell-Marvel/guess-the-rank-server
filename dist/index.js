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
//Dot env'
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, "../.env") });
//JWT
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
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
//Passport
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = __importDefault(require("passport-google-oauth20"));
const User_1 = require("./models/User");
const GoogleStrategy = passport_google_oauth20_1.default.Strategy;
passport_1.default.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
}, (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(profile);
    const user = yield User_1.User.findOne({
        id: profile.id,
    });
    if (!user) {
        yield User_1.User.create({
            id: profile.id,
            username: profile.displayName,
        });
    }
    const token = jsonwebtoken_1.default.sign({ userId: profile.id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME,
    });
    done(null, { token });
})));
app.get("/auth/google", passport_1.default.authenticate("google", { scope: ["profile", "email"], session: false }));
app.get("/auth/google/callback", passport_1.default.authenticate("google", { session: false }), (req, res) => {
    var _a;
    console.log(req.user);
    res.cookie("token", (_a = req.userInfo) === null || _a === void 0 ? void 0 : _a.token, { sameSite: "none", secure: true, httpOnly: true }).json({ ok: true });
});
app.get("/test", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.User.findOne({
        email: "ksdjfklsdjkfl",
    });
    res.json({ user });
}));
const PORT = 5000;
app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, connectDB_1.connectDB)(process.env.MONGO_URI);
        console.log("MongoDB connected");
        console.log(`Server is running on port ${PORT}`);
    }
    catch (err) {
        console.log("LOL ERROR");
    }
}));
