import express from "express";
import { userRouter } from "./user";
import { profileRouter } from "./profile";
import { serviceRouter } from "./service";
import { authenticateToken } from "../middleware/authentication";
import { staffRouter } from "./staff";

export const rootRouter = express.Router();

rootRouter.use("/user", userRouter);
rootRouter.use("/profile", authenticateToken, profileRouter);
rootRouter.use("/staff", staffRouter)
rootRouter.use("/service", serviceRouter);
