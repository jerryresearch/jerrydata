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
      enum: ["text", "chart"],
      required: true,
    },
    content: {
      type: String,
    },
    // imageIds: [
    //   {
    //     type: String,
    //   },
    // ],
    chartType: {
      type: String,
      enum: ["bar", "doughnut", "pie", "line", "polar area", "horizontal bar"],
    },
    title: {
      type: String,
    },
    xAxis: {
      type: String,
    },
    yAxis: {
      type: String,
    },
    xData: {
      type: mongoose.Schema.Types.Array,
    },
    yData: {
      type: mongoose.Schema.Types.Array,
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
