import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  imgBanner: {
    type: String,
  },

  description: {
    type: String,
  },
});

export const Category = mongoose.model("Category", CategorySchema);
