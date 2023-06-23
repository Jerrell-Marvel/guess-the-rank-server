import mongoose from "mongoose";

type RankSchema = {
  name: string;
  imgUrl: string;
};

type Rank = RankSchema & {
  _id: mongoose.Types.ObjectId;
};
