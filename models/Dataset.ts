import mongoose, { models } from "mongoose";

const DatasetSchema = new mongoose.Schema(
  {
    assistantId: {
      type: String,
    },
    threadId: {
      type: String,
    },
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
      enum: ["CSV", "XLS", "MySQL", "PostgreSQL"],
      required: true,
    },
    sql: {
      host: String,
      port: Number,
      database: String,
      user: String,
      password: String,
      connString: String,
      table: String,
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
    stories: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default models.Dataset || mongoose.model("Dataset", DatasetSchema);
