import * as z from "zod";

export const userSchema = z.object({
  name: z.string().min(1).max(50),
  email: z.string().email().min(1).max(50),
  password: z.string().min(8).max(50),
  role: z.enum(["citizen", "collector", "centre", "admin"]),
  address: z.string().min(1).max(50),
  location: z.string().min(1).max(50),
  phone: z.string().min(1).max(50),
});

export const loginSchema = z.object({
  email: z.string().email().min(1).max(50),
  password: z.string().min(8).max(50),
});