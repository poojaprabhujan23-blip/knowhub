import mongoose from "mongoose";

const replySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    user: String,
    role: String,
    text: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: true }
);

const commentSchema = new mongoose.Schema(
  {
    resourceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resource",
      required: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    user: String,

    role: String,

    text: {
      type: String,
      required: true,
    },

    replies: [replySchema],
  },
  { timestamps: true }
);

export default mongoose.model("Comment", commentSchema);