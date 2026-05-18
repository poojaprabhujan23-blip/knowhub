import User from "../models/User.js";
import bcrypt from "bcryptjs";

// ✅ REGISTER
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } =
      req.body;

    // CHECK USER
    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // HASH PASSWORD
    const hashedPassword =
      await bcrypt.hash(password, 10);

    // CREATE USER
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
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// ✅ LOGIN
export const loginUser = async (req, res) => {
  try {
    const { email, password, role } =
      req.body;

    // CHECK EMAIL
    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    // CHECK PASSWORD
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }

    // CHECK ROLE
    if (user.role !== role) {
      return res.status(400).json({
        message: "Role mismatch",
      });
    }

    // SUCCESS
    res.status(200).json({
      message: "Login successful",
      user,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};