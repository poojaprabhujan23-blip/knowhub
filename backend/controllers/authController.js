import User from "../models/User.js";
import bcrypt from "bcryptjs";

// ================= REGISTER =================
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } =
      req.body;

    const userExists = await User.findOne({
      email,
    });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // ONLY ONE ADMIN
    if (role === "admin") {
      const adminExists = await User.findOne({
        role: "admin",
      });

      if (adminExists) {
        return res.status(400).json({
          message: "Admin already exists",
        });
      }
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json({
      message: "Registration successful",
      user,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= LOGIN =================
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }

    res.status(200).json({
      message: "Login successful",
      user,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= FORGOT PASSWORD =================
export const forgotPassword = async (
  req,
  res
) => {
  try {
    const { email, newPassword } = req.body;

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const hashedPassword = await bcrypt.hash(
      newPassword,
      10
    );

    user.password = hashedPassword;

    await user.save();

    res.status(200).json({
      message:
        "Password reset successful",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};