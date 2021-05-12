import mongoose from "mongoose";

const hashtagsModel = new mongoose.Schema(
  {
    clientId: { type: String, requires: true },
    name: { type: String, requires: true },
    hashtags: { type: [String], required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.hashtags ||
  mongoose.model("hashtags", hashtagsModel);
