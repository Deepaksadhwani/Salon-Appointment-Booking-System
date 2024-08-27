import express from "express";
import { authenticateToken } from "../middleware/authentication";
import {
  getUserProfileDataController,
  updateUserProfileController,
} from "../controllers/profileController";
export const profileRouter = express.Router();

profileRouter.post(
  "/update-profile",
  authenticateToken,
  updateUserProfileController
);

profileRouter.get("/get-user", authenticateToken, getUserProfileDataController);
