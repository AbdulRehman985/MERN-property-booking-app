import mongoose from "mongoose";

const userScehma = mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { timestamps: true }
);

export const UserModel = mongoose.model("User", userScehma);
