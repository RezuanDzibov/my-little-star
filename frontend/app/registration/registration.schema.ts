import * as z from "zod";

export const registrationFormSchema = z
  .object({
    username: z.string().min(8).max(36),
    email: z.string().email().min(8).max(64),
    password: z.string().min(8),
  });
