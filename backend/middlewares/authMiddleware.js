import jwt from "jsonwebtoken";
import { UserModel } from "../model/UserModel.js";
export const authitacted = async (req, res, next) => {
  let token = req.cookies.jwt;
  try {
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded);
      req.user = await UserModel.findById(decoded.userId).select("-password");
      console.log(req.user);
      next();
    } else {
      return res.status(401).json({ error: "User is not authorized" });
    }
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    console.log(req.user.isAdmin);
    next();
  } else {
    res.status(403);
    throw new Error("Not authorized as an admin");
  }
};
