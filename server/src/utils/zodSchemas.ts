import { z } from "zod";

export const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  fullName: z.string(),
});

export const signinSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const updateUserSchema = z.object({
  fullName: z.string().min(1),
  photoUrl: z.string().optional(),
  role: z.string().optional(),
});

export const servicesSchema = z.object({
  name: z.string(),
  description: z.string(),
  duration: z.number(),
  price: z.number(),
  imageUrl: z.string(),
});

export const StaffMemberSchema = z.object({
  fullName: z.string(),
  email: z.string(),
  photoUrl: z.string(),
  specialization: z.string(),
  availability: z.string(),
});
