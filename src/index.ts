//setting up express
import express, { Request, Response } from "express";
const app = express();

//Dot env
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

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
const GoogleStrategy = googleStrat.Strategy;

const PORT = 5000;
app.listen(PORT, async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log(`Server is running on ${PORT}`);
  } catch (err) {
    console.log(err);
  }
});
