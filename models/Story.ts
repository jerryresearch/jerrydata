import mongoose, { models } from "mongoose";

const StorySchema = new mongoose.Schema(
  {
    dataset: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Dataset",
      required: true,
    },
    insight: {
      type: String,
    },
    impact: {
      type: String,
      // enum: ["positive", "negative"],
    },
    // status: {
    //   type: String,
    //   enum: ["good", "bad"],
    // },
    read: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
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
  },
  { timestamps: true }
);

export default models.Story || mongoose.model("Story", StorySchema);
