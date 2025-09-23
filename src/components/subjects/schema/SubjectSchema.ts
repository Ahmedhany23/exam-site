import { z } from "zod";

export const AddEditSubjectSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  code: z.string().min(1, { message: "Code is required" }),
  section: z.enum(["scientific", "literature", "common"], {
    message: "Section is required",
  }),
  duration_minutes: z
    .number()
    .min(1, { message: "Duration must be at least 1 minute" }),
  max_score: z.number().min(1, { message: "Max score must be at least 1" }),
  has_essay_questions: z.boolean(),
  is_active: z.boolean(),
});

export type AddEditSubjectSchemaType = z.infer<typeof AddEditSubjectSchema>;
