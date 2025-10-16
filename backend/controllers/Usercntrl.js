import { UserModel } from "../model/UserModel.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";

// 🧩 Register Controller
export const register = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    // 1️⃣ Validate input
    if (!email || !userName || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 2️⃣ Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already registered" });
    }

    // 3️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4️⃣ Create user
    const newUser = await UserModel.create({
      userName,
      email,
      password: hashedPassword,
    });

    // 5️⃣ Generate JWT Token
    generateToken(res, newUser._id);

    // 6️⃣ Respond with user data
    return res.status(201).json({
      _id: newUser._id,
      userName: newUser.userName,
      email: newUser.email,
    });
  } catch (error) {
    console.error("Register Error:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

// 🔐 Login Controller
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 2️⃣ Check if user exists
    const existingUser = await UserModel.findOne({ email });
    if (!existingUser) {
      return res
        .status(400)
        .json({ message: "User not registered. Please register." });
    }

    // 3️⃣ Compare password
    const isValidPassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // 4️⃣ Generate JWT Token
    generateToken(res, existingUser._id);

    // 5️⃣ Send user info
    return res.status(200).json({
      _id: existingUser._id,
      userName: existingUser.userName,
      email: existingUser.email,
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
