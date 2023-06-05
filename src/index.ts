//setting up express
import express, { Request, Response } from "express";
const app = express();

//Dot env'
import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, "../.env") });

//JWT
import jwt from "jsonwebtoken";

//cors
import cors from "cors";
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000", "127.0.0.1:5500", "192.168.0.182:3000"],
  })
);

//Express async errors
import "express-async-errors";

//Cookie parser
import cookieParser from "cookie-parser";
import { connectDB } from "./db/connectDB";
app.use(cookieParser());

//parse json
app.use(express.json());

//Passport
import passport from "passport";
import googleStrat from "passport-google-oauth20";
import { User } from "./models/User";
import { Category } from "./models/Category";
const GoogleStrategy = googleStrat.Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      const user = await User.findOne({
        id: profile.id,
      });

      let token;
      console.log(user);

      if (!user) {
        console.log({
          id: profile.id,
          username: profile.displayName,
        });
        const user = await User.create({
          id: profile.id,
          username: profile.displayName,
        });
        token = jwt.sign({ userId: user._id, username: profile.displayName, role: "user" }, process.env.JWT_SECRET!, {
          expiresIn: process.env.JWT_LIFETIME!,
        });
      } else {
        token = jwt.sign({ userId: user._id, username: profile.displayName, role: user.role }, process.env.JWT_SECRET!, {
          expiresIn: process.env.JWT_LIFETIME!,
        });
      }

      done(null, { token });
      // done(null, { token: "dlksjlkfjsldkj" });
    }
  )
);

app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"], session: false }));

// type GoogleCBRequest = Request & {user:{
//   token:string;
// }}

app.get("/auth/google/callback", passport.authenticate("google", { session: false }), (req: Request, res: Response) => {
  //Token passed by passport
  const { token } = req.user as { token: string };

  res.cookie("token", token, { sameSite: "none", secure: true, httpOnly: true }).json({ ok: true });
});

//Routes import
import { router as categoryRoutes } from "./routes/category";
import { router as clipRoutes } from "./routes/clip";
import { router as guessRoutes } from "./routes/guess";
import { router as rankRoutes } from "./routes/rank";
import mongoose from "mongoose";
import { errorHandler } from "./middleware/errorHandler";

app.use("/api/v1", categoryRoutes);
app.use("/api/v1/rank", rankRoutes);
app.use("/api/v1", clipRoutes);
app.use("/api/v1/guess", guessRoutes);

app.get("/test", async (req, res) => {
  // const result = await Category.create({ name: "Valorant", description: "Lorem ipsum only" });

  // res.json({ result });

  const categoryRes = await Category.findOne({}).populate({
    path: "ranks",
  });

  return res.json({ categoryRes });
});

//Error handler
app.use(errorHandler);

const PORT = 5000;

app.listen(PORT, async () => {
  try {
    console.log("Connecting to MongoDB");
    await mongoose.connect(process.env.MONGO_URI!, {});
    console.log("MongoDB connected");
    console.log(`Server is running on port ${PORT}`);
  } catch (err) {
    console.log(err);
    console.log("Cannot connect to MongoDB");
  }
});
