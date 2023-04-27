import mongoose from "mongoose";

export const connectDB = (url: string | undefined) => {
  if (url) {
    return mongoose.connect(url, {});
  }
};
