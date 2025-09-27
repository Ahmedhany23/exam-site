import { z } from "zod";

export const AddSectionSchema = z.object({
  name: z.string().min(1, { message: "اسم القسم مطلوب" }),
  code: z.string().min(1, { message: "الكود مطلوب" }),
  total_points: z.coerce
    .number()
    .min(0, { message: "النقاط يجب أن تكون 0 أو أكثر" }),
});

export type AddSectionValues = z.infer<typeof AddSectionSchema>;

export const AddQuestionSchema = z.object({
  text: z.string().min(1, { message: "نص السؤال مطلوب" }),
  type: z.enum(["mcq", "true_false", "short_answer", "essay"], {
    message: "نوع السؤال مطلوب",
  }),
  points: z.coerce.number().min(1, { message: "النقاط 1 على الأقل" }),
  section_id: z.union([z.literal("none"), z.coerce.number()]),
  choices: z
    .array(
      z.object({
        id: z.string(),
        text: z.string().min(1, { message: "النص مطلوب" }),
        is_correct: z.boolean().optional(),
      })
    )
    .optional(),
}).superRefine((val, ctx) => {
  // MCQ must have at least 2 choices and 1 correct
  if (val.type === "mcq") {
    const choices = val.choices ?? [];
    if (choices.length < 2) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "الاختيارات يجب أن تكون على الأقل 2",
        path: ["choices"],
      });
    }
    const hasCorrect = choices.some((c) => c.is_correct === true);
    if (!hasCorrect) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "يجب اختيار إجابة صحيحة واحدة على الأقل",
        path: ["choices"],
      });
    }
  }
  // true/false should not have custom choices
  if (val.type === "true_false" && val.choices && val.choices.length > 0) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "سؤال صح/خطأ لا يحتوي على اختيارات",
      path: ["choices"],
    });
  }
});

export type AddQuestionValues = z.infer<typeof AddQuestionSchema>;