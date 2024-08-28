import express from "express";
import { userRouter } from "./user";
import { profileRouter } from "./profile";
import { serviceRouter } from "./service";
import { authenticateToken } from "../middleware/authentication";

export const rootRouter = express.Router();

rootRouter.use("/user", userRouter);
rootRouter.use("/profile", authenticateToken, profileRouter);
rootRouter.use("/service", serviceRouter);
