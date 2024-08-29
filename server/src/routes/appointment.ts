import express from "express";
import { authenticateToken } from "../middleware/authentication";
import {
  createAppointmentController,
  getAllAppointmentController,
  getUserAppointmentController,
  verifyAppointmentController,
} from "../controllers/appointmentController";

export const appointmentRouter = express.Router();

appointmentRouter.use(authenticateToken);
appointmentRouter.post("/create-appointment", createAppointmentController);
appointmentRouter.post("/verify-appointment", verifyAppointmentController);
appointmentRouter.get("/appointmentdata", getAllAppointmentController);
appointmentRouter.get("/user-appointment", getUserAppointmentController);
