import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
      resetToken: String,
      resetTokenExpire: Date,
    },

    role: {
      type: String,
      enum: ["admin", "contributor", "viewer"],
      default: "viewer",
    },
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);
export default mongoose.models.User || mongoose.model("User", userSchema);
