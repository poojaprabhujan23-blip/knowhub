import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema({
  title: String,
  category: String,
  file: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Resource", resourceSchema);