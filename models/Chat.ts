import mongoose, { models } from "mongoose";

const ChatSchema = new mongoose.Schema(
  {
    chatName: {
      type: String,
      required: true,
    },
    datasetName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

ChatSchema.virtual("messages", {
  ref: "Message",
  localField: "_id",
  foreignField: "chat",
  justOne: false,
});

export default models.Chat || mongoose.model("Chat", ChatSchema);
