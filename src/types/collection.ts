import z from "zod";

export const Collection = z.object({
  id: z.string(),
  name: z.string(),
  created: z.string(),
  updated: z.string()
});

export type CollectionType = z.infer<typeof Collection>;
