import express from "express";
import {
  signinController,
  signupController,
} from "../controllers/userController";

export const userRouter = express.Router();

userRouter.post("/sign-up", signupController);
userRouter.post("/sign-in", signinController);
