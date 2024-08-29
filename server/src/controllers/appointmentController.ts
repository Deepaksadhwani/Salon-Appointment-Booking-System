import {
  getAllAppointments,
  getUserAppointments,
  insertAppointment,
} from "../services/appointmentService";
import { Request, Response } from "express";
import Razorpay from "razorpay";
import dotenv from "dotenv";
dotenv.config();

const key_id: any = process.env.RAZROPAY_API_KEY;
const key_secret = process.env.RAZORPAY_SECRET_KEY;

const razorpayInstance = new Razorpay({
  key_id,
  key_secret,
});

export const createAppointmentController = async (
  req: Request,
  res: Response
) => {
  const { amount } = req.body;

  try {
    const options = {
      amount: amount * 100, // Amount in paise
      currency: "INR",
      receipt: `receipt_order_${new Date().getTime()}`,
    };

    const order = await razorpayInstance.orders.create(options);
    console.log("createorder", order);
    res.status(201).json({
      orderId: order.id,
      amount: order.amount,
      key_id: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to create order" });
  }
};

/*------------------------verify Appointment------------------- */

export const verifyAppointmentController = async (req: any, res: any) => {
  const { razorpay_order_id, razorpay_payment_id, formData } = req.body;

  try {
    const data = {
      userId: req.userId,
      serviceId: parseInt(formData.serviceId),
      staffId: parseInt(formData.staffId),
      dateTime: new Date(formData.dateTime),
      status: "SUCCESSFUL",
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
    };
    const response = await insertAppointment(data);

    res
      .status(201)
      .json({ message: "Appointment booked successfully", data: response });
  } catch (error) {
    res.status(500).json({ error: "Failed to book appointment" });
  }
};

/*-------------------------fetch all expense---------------------- */

export const getAllAppointmentController = async (
  req: Request,
  res: Response
) => {
  try {
    const data = await getAllAppointments();
    res
      .status(200)
      .json({ Message: "admin data has been successfully fetched.", data });
  } catch (error) {
    res.status(500).json({ Message: "Internal server error." });
  }
};

export const getUserAppointmentController = async (req: any, res: Response) => {
  const userId: any = req.userId;
  try {
    const data = await getUserAppointments(userId);
    res
      .status(200)
      .json({ Message: "User appointment has been fetched.", data });
  } catch (error) {
    res.status(500).json({ Message: "Internal server error." });
  }
};
