import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    }
  },
  {
    timestamps: true,
  }
);

export const Category = mongoose.model("Category", categorySchema);
