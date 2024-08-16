import { z } from "zod";

export const shortenedUrlsCreate = z.object({
  body: z.object({
    userId: z.string().optional(),
    url: z.string().url(),
  }),
});

export const shortenedUrlsUpdate = z.object({
  body: z.object({
    url: z.string().url(),
  }),
  params: z.object({
    id: z.string(),
  }),
});

export const shortenedUrlsDelete = z.object({
  params: z.object({
    id: z.string(),
  }),
});
