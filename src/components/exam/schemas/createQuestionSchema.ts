import z from "zod";

// Base schema
const baseSchema = z.object({
  question_text: z.string().min(1, "نص السؤال يجب أن لا يقل عن 1 أحرف."),
  question_image: z.string().nullable().optional().or(z.literal("")),
  points: z.number(),
  is_required: z.boolean(),
  help_text: z.string().nullable().optional(),
});

// Multiple choice
const multipleChoiceSchema = baseSchema.extend({
  question_type: z.literal("multiple_choice"),
  options: z
    .array(
      z.object({ value: z.string().min(1, "لا يمكن ترك الاختيار فارغًا.") })
    )
    .min(2, "يجب إضافة اختيارين على الأقل."),
  correct_answer: z.string().min(1, "الرجاء تحديد الإجابة الصحيحة."),
});

// True/False
const trueFalseSchema = baseSchema.extend({
  question_type: z.literal("true_false"),
  options: z.array(z.object({ value: z.string() })).optional(),
  correct_answer: z.union([z.literal("true"), z.literal("false")]),
});

// Essay
const essaySchema = baseSchema.extend({
  question_type: z.literal("essay"),
  options: z.array(z.object({ value: z.string() })).optional(),
  correct_answer: z.string().optional(),
});

// Fill in the blank
const fillBlankSchema = baseSchema.extend({
  question_type: z.literal("fill_blank"),
  options: z.array(z.object({ value: z.string() })).optional(),
  correct_answer: z.string().min(1, "الإجابة الصحيحة مطلوبة."),
});

// Discriminated union
export const formSchema = z
  .discriminatedUnion("question_type", [
    multipleChoiceSchema,
    trueFalseSchema,
    essaySchema,
    fillBlankSchema,
  ])
  .refine(
    (data) => {
      if (data.question_type === "multiple_choice") {
        return data.options.some((o) => o.value === data.correct_answer);
      }
      return true;
    },
    {
      message: "الإجابة الصحيحة يجب أن تكون أحد الاختيارات المتاحة.",
      path: ["correct_answer"],
    }
  );
