import express from "express";
import {
  fetchServicesController,
  insertServicesController,
} from "../controllers/serviceController";

export const serviceRouter = express.Router();

serviceRouter.post("/add-service", insertServicesController);
serviceRouter.get("/get-services", fetchServicesController);
