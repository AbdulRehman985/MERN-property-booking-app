import { UserModel } from "../model/UserModel.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";

export const register = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    if (!email || !userName || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({
      userName,
      email,
      password: hashedPassword,
    });

    generateToken(res, newUser._id);

    return res.status(201).json({
      _id: newUser._id,
      userName: newUser.userName,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
    });
  } catch (error) {
    console.error("Register Error:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await UserModel.findOne({ email });
    if (!existingUser) {
      return res
        .status(400)
        .json({ message: "User not registered. Please register." });
    }

    const isValidPassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    generateToken(res, existingUser._id);

    return res.status(200).json({
      _id: existingUser._id,
      userName: existingUser.userName,
      email: existingUser.email,
      isAdmin: existingUser.isAdmin,
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
