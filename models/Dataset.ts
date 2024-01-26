import mongoose, { models } from "mongoose";

const DatasetSchema = new mongoose.Schema(
  {
    fileUrl: {
      type: String,
    },
    key: {
      type: String,
    },
    openAPIFile: {
      type: mongoose.Schema.Types.Mixed,
    },
    name: {
      type: String,
    },
    description: {
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
        name: {
          type: String,
          required: true,
        },
        datatype: {
          type: String,
          enum: ["String", "Date", "Location", "Number"],
          default: "String",
        },
        columnType: {
          type: String,
          default: "Attribute",
        },
        defaultAggregate: {
          type: String,
          default: "No Aggregate",
        },
        dateFieldType: {
          type: String,
          default: "None",
        },
        geoFieldType: {
          type: String,
          default: "None",
        },
        isDisabled: {
          type: Boolean,
          default: false,
        },
        isHidden: {
          type: Boolean,
          default: false,
        },
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
    questions: [mongoose.Schema.Types.Mixed],
  },
  { timestamps: true }
);

export default models.Dataset || mongoose.model("Dataset", DatasetSchema);
