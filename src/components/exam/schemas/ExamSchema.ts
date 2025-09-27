// ExamSchema.ts
import { z } from "zod";

export const ExamSchema = z.object({
  subject_id: z.string().min(1, { message: "المادة مطلوبة" }),
  title: z.string().min(1, { message: "Title is required" }).max(255),
  description: z.string().max(1000).optional(),

  exam_type: z.enum(["practice", "final"], {
    message: "Exam type is required",
  }),
  academic_year: z.enum(["first", "second", "third"], {
    message: "Academic year is required",
  }),

  start_time: z.string().min(1, { message: "Start time is required" }),
  end_time: z.string().min(1, { message: "End time is required" }),

  duration_minutes: z.coerce
    .number()
    .min(1, { message: "Duration must be at least 1 minute" })
    .max(480, { message: "Duration cannot exceed 480 minutes" }),

  total_score: z.coerce.number().min(1),
  require_video_recording: z.coerce.boolean().default(false),

  minimum_battery_percentage: z.coerce
    .number()
    .min(0, { message: "Battery percentage cannot be below 0" })
    .max(100, { message: "Battery percentage cannot exceed 100" })
    .optional(),

  // new optional fields
  is_published: z.coerce.boolean().optional(),
  is_active: z.coerce.boolean().optional(),
});

export type ExamFormValues = z.infer<typeof ExamSchema>;
