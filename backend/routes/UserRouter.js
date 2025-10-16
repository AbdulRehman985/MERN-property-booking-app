import express from "express";
import { login, register } from "../controllers/Usercntrl.js";

const userRouter = express.Router();

userRouter.route("/").post(register);
userRouter.route("/auth").post(login);

export default userRouter;
