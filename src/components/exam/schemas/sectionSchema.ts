// schemas/sectionSchema.ts
import { z } from "zod";

export const sectionSchema = z.object({

  code: z
    .string()
    .min(1, "Code is required")
    .min(3, "Code must be at least 3 characters")
    .max(20, "Code must not exceed 20 characters"),

  name: z
    .string()
    .min(1, "Name is required")
    .min(3, "Name must be at least 3 characters")
    .max(100, "Name must not exceed 100 characters"),

  order_number: z
    .number()
    .int("Order number must be an integer")
    .nonnegative("Order number must be 0 or greater"),
});

export type SectionSchema = z.infer<typeof sectionSchema>;
