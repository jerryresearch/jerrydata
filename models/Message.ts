import mongoose, { models } from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["user", "assistant"],
      required: true,
    },
    type: {
      type: String,
      enum: ["Text", "Chart"],
      required: true,
    },
    content: {
      type: String,
    },
    xAxis: {
      type: String,
    },
    yAxis: {
      type: String,
    },
    xData: {
      type: String,
    },
    yData: {
      type: String,
    },
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
      required: true,
    },
  },
  { timestamps: true }
);

export default models.Message || mongoose.model("Message", MessageSchema);
