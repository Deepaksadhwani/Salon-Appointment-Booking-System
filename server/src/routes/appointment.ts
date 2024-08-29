import express from "express";
import { authenticateToken } from "../middleware/authentication";
import {
  createAppointmentController,
  verifyAppointmentController,
} from "../controllers/appointmentController";

export const appointmentRouter = express.Router();

appointmentRouter.use(authenticateToken);
appointmentRouter.post("/create-appointment", createAppointmentController);
appointmentRouter.post("/verify-appointment", verifyAppointmentController);
