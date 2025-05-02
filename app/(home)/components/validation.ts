import { z } from "zod";

export const deleteJobTrackerSchema = (name: string) => {
  return z.object({
    name: z.string().refine((value) => value.toString() === name.toString(), {
      message: `Job Tracker Title must be '${name}'`,
    }),
  });
}

export type deleteJobTrackerValues = z.infer<ReturnType<typeof deleteJobTrackerSchema>>;
