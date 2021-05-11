import mongoose from "mongoose";

const subscriptionModel = new mongoose.Schema(
  {
    clientId: { type: String, required: true },
    paypalId: { type: String, required: true },
    status: { type: String, required: true },
    type: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.subscriptions ||
  mongoose.model("subscriptions", subscriptionModel);
