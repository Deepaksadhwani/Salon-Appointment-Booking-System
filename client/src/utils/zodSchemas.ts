import { z } from "zod";

export const authValidationSchema = z.object({
  fullName: z.string().optional(),
  email: z.string().email(),
  password: z.string().min(8),
});