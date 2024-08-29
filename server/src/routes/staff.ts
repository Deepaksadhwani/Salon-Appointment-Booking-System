import express from "express";
import {
  addStaffMemberController,
  fetchAllStaffController,
} from "../controllers/staffController";
import { authenticateToken } from "../middleware/authentication";

export const staffRouter = express.Router();

staffRouter.post("/add-staff", authenticateToken, addStaffMemberController);
staffRouter.get("/stafflist", authenticateToken, fetchAllStaffController);
