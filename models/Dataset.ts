import mongoose, { models } from "mongoose";

const DatasetSchema = new mongoose.Schema({
  fileUrl: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  datatype: {
    type: String,
    enum: ["CSV", "XLS"],
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  rows: {
    type: Number,
    required: true,
  },
  columns: {
    type: Number,
    required: true,
  },
  lastLoad: {
    type: String,
    required: true,
    default: new Date(),
  },
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export default models.Dataset || mongoose.model("Dataset", DatasetSchema);
