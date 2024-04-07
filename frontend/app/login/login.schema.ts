import * as z from "zod";

export const loginSchema = z
  .object({
    login: z.string().min(8).max(64),
    password: z.string().min(8),
  })
