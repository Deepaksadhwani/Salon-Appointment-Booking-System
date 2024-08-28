import express from "express";
import { insertServicesController } from "../controllers/serviceController";

export const serviceRouter = express.Router();

serviceRouter.post("/add-service", insertServicesController);
