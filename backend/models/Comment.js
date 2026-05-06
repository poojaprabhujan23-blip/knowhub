import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  text: String,
  user: String,
  resourceId: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Comment", commentSchema);