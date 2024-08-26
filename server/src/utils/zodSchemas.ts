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

