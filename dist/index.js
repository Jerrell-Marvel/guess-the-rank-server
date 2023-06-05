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
app.use((0, cookie_parser_1.default)());
//parse json
app.use(express_1.default.json());
//Passport
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = __importDefault(require("passport-google-oauth20"));
const User_1 = require("./models/User");
const Category_1 = require("./models/Category");
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
    let token;
    console.log(user);
    if (!user) {
        console.log({
            id: profile.id,
            username: profile.displayName,
        });
        const user = yield User_1.User.create({
            id: profile.id,
            username: profile.displayName,
        });
        token = jsonwebtoken_1.default.sign({ userId: user._id, username: profile.displayName, role: "user" }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_LIFETIME,
        });
    }
    else {
        token = jsonwebtoken_1.default.sign({ userId: user._id, username: profile.displayName, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_LIFETIME,
        });
    }
    done(null, { token });
    // done(null, { token: "dlksjlkfjsldkj" });
})));
app.get("/auth/google", passport_1.default.authenticate("google", { scope: ["profile", "email"], session: false }));
// type GoogleCBRequest = Request & {user:{
//   token:string;
// }}
app.get("/auth/google/callback", passport_1.default.authenticate("google", { session: false }), (req, res) => {
    //Token passed by passport
    const { token } = req.user;
    res.cookie("token", token, { sameSite: "none", secure: true, httpOnly: true }).json({ ok: true });
});
//Routes import
const category_1 = require("./routes/category");
const clip_1 = require("./routes/clip");
const guess_1 = require("./routes/guess");
const rank_1 = require("./routes/rank");
const mongoose_1 = __importDefault(require("mongoose"));
const errorHandler_1 = require("./middleware/errorHandler");
app.use("/api/v1", category_1.router);
app.use("/api/v1/rank", rank_1.router);
app.use("/api/v1", clip_1.router);
app.use("/api/v1/guess", guess_1.router);
app.get("/test", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const result = await Category.create({ name: "Valorant", description: "Lorem ipsum only" });
    // res.json({ result });
    const categoryRes = yield Category_1.Category.findOne({}).populate({
        path: "ranks",
    });
    return res.json({ categoryRes });
}));
//Error handler
app.use(errorHandler_1.errorHandler);
const PORT = 5000;
app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Connecting to MongoDB");
        yield mongoose_1.default.connect(process.env.MONGO_URI, {});
        console.log("MongoDB connected");
        console.log(`Server is running on port ${PORT}`);
    }
    catch (err) {
        console.log(err);
        console.log("Cannot connect to MongoDB");
    }
}));
