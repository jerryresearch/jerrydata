import mongoose, { models } from "mongoose";

const ChartSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    chartType: {
      type: String,
      required: true,
      enum: ["Bar", "Doughnut", "Pie", "Line"],
    },
    report: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Report",
      required: true,
    },
    dataset: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Dataset",
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    xAxis: {
      type: String,
      required: true,
    },
    yAxis: {
      type: String,
      required: true,
    },
    xData: {
      type: mongoose.Schema.Types.Array,
      required: true,
    },
    yData: {
      type: mongoose.Schema.Types.Array,
      required: true,
    },
    series: {
      type: String,
    },
  },
  { timestamps: true }
);

export default models.Chart || mongoose.model("Chart", ChartSchema);
