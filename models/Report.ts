import mongoose, { models } from "mongoose";

const ReportSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    chartsCount: {
      type: Number,
      default: 0,
      required: true,
    },
    keyAnalytics: [
      {
        title: { type: String, required: true },
        value: { type: String, required: true },
      },
    ],
    charts: {
      type: [String],
    },
  },
  { timestamps: true }
);

export default models.Report || mongoose.model("Report", ReportSchema);
