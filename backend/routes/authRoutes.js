import express from "express";
import crypto from "crypto";
import User from "../models/User.js";

import {
  registerUser,
  loginUser,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.post("/forgot-password", async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("PASSWORD:", req.body.password);
    
    const { email } = req.body;

    const user = await User.findOne({ resetToken: req.params.token, });
    
    console.log("DB TOKEN:", user?.resetToken);
    console.log("URL TOKEN:", req.params.token)
    console.log("EXPIRE:", user?.resetTokenExpire);
    console.log("NOW:", Date.now());

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // generate token
    const token = crypto.randomBytes(32).toString("hex");

    user.resetToken = token;
    user.resetTokenExpire = Date.now() + 60 * 60 * 1000; 

    await user.save({ validateBeforeSave: false });

    const resetLink = `http://localhost:3000/reset/${token}`;

    console.log("RESET LINK:", resetLink);

    res.json({ message: "Reset link generated (check console)" });
  } catch (error) {
    res.status(500).json({ message: "Error", error });
  }
});

router.post("/reset-password/:token", async (req, res) => {
  try {
    const { password } = req.body;

    const user = await User.findOne({
      resetToken: req.params.token,
      resetTokenExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid or expired token" });
    }

    user.password = password;
    user.resetToken = undefined;
    user.resetTokenExpire = undefined;

    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ message: "Error", error });
  }
});

// TEST route
router.get("/", (req, res) => {
  res.send("Auth route working");
});

router.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});
export default router;