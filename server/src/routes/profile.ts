import express from "express";
import {
  getUserProfileDataController,
  updateUserProfileController,
} from "../controllers/profileController";
export const profileRouter = express.Router();

profileRouter.post("/update-profile", updateUserProfileController);

profileRouter.get("/get-user", getUserProfileDataController);
