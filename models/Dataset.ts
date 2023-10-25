import mongoose, { models } from "mongoose";

const DatasetSchema = new mongoose.Schema(
  {
    fileUrl: {
      type: String,
    },
    key: {
      type: String,
    },
    name: {
      type: String,
    },
    datatype: {
      type: String,
      enum: ["CSV", "XLS"],
      required: true,
    },
    size: {
      type: String,
    },
    rows: {
      type: Number,
    },
    columns: {
      type: Number,
    },
    headers: [
      {
        type: String,
      },
    ],
    lastLoad: {
      type: String,
      default: new Date(),
    },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default models.Dataset || mongoose.model("Dataset", DatasetSchema);
