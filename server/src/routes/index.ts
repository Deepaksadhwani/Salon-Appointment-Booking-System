import express from "express";
import { userRouter } from "./user";
import { profileRouter } from "./profile";

export const rootRouter = express.Router();

rootRouter.use("/user", userRouter);
rootRouter.use("/profile", profileRouter);
