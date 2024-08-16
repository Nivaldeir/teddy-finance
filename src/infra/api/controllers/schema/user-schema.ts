import { z } from "zod";

export const userCreate = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(8),
    username: z.string().optional(),
  }),
});

export const userUpdate = z.object({
  body: z.object({
    password: z.string().optional(),
    username: z.string().optional(),
    enabled: z.boolean().optional(),
  }),
  params: z.object({
    id: z.string(),
  }),
});

export const userDelete = z.object({
  params: z.object({
    id: z.string(),
  }),
});
