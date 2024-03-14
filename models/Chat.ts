import mongoose, { models } from "mongoose";

const ChatSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    exploratoryAssistant: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    dissectAssistant: {
      type: mongoose.Schema.Types.Mixed,
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
    exploratoryThread: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    dissectThread: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
  },
  { timestamps: true }
);

// ChatSchema.virtual("messages", {
//   ref: "Message",
//   localField: "_id",
//   foreignField: "chat",
//   justOne: false,
// });

export default models.Chat || mongoose.model("Chat", ChatSchema);
