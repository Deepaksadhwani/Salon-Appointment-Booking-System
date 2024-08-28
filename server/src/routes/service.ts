import express from "express";
import {
  fetchServicesController,
  insertServicesController,
} from "../controllers/serviceController";
import { authenticateToken } from "../middleware/authentication";

export const serviceRouter = express.Router();

serviceRouter.post("/add-service", authenticateToken, insertServicesController);
serviceRouter.get("/get-services", fetchServicesController);
