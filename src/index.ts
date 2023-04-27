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

//Passport
import passport from "passport";
import googleStrat from "passport-google-oauth20";
import { User } from "./models/User";
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

      if (!user) {
        await User.create({
          id: profile.id,
          username: profile.displayName,
        });
      }

      const token = jwt.sign({ userId: profile.id }, process.env.JWT_SECRET!, {
        expiresIn: process.env.JWT_LIFETIME!,
      });

      done(null, { token });
    }
  )
);

app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"], session: false }));

app.get("/auth/google/callback", passport.authenticate("google", { session: false }), (req, res) => {
  console.log(req.user);
  res.cookie("token", req.userInfo?.token, { sameSite: "none", secure: true, httpOnly: true }).json({ ok: true });
});

app.get("/test", async (req, res) => {
  const user = await User.findOne({
    email: "ksdjfklsdjkfl",
  });

  res.json({ user });
});

const PORT = 5000;
app.listen(PORT, async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("MongoDB connected");
    console.log(`Server is running on port ${PORT}`);
  } catch (err) {
    console.log("LOL ERROR");
  }
});
