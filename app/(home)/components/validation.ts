import { z } from 'zod';

export const CreateJobTrackerSchema = z.object({
  company: z.string().min(1, { message: "Company name is required" }),
  position: z.string().min(1, { message: "Position is required" }),
  location: z.string().min(1, { message: "Location is required" }),
  status: z.enum(["saved", "applied", "interview", "offer", "rejected"]),
  dateApplied: z.date(),
  url: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal("")),
  notes: z.string().optional(),
});

export type CreateJobTrackerValues = z.infer<typeof CreateJobTrackerSchema>;
