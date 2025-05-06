import { z } from "zod";

// Form validation schema
export const formSchema = z.object({
  topic: z.string().min(1, "Topic is required"),
  learningPace: z.string().min(1, "Learning pace is required"),
  preferredStyles: z.array(z.string()).min(1, "Select at least one learning style"),
  learningDepth: z.enum(["beginner", "intermediate", "advanced"], {
    required_error: "Learning depth is required"
  }),
});

export type FormValues = z.infer<typeof formSchema>;