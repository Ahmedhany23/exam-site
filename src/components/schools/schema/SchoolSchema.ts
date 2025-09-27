// schema.ts
import { z } from "zod";

export const schoolSchema = z.object({
  name: z.string().min(1, "الاسم  مطلوب").max(50, "الاسم  طويل جدًا"),
  code: z.string().min(1, "الكود مطلوب").max(50, "الكود طويل جدًا"),
  address: z
    .string()
    .min(1, "العنوان مطلوب")
    .max(500, "العنوان طويل جدًا")
    .optional(),
  phone: z
    .string()
    .min(1, "رقم الهاتف مطلوب")
    .max(20, "رقم الهاتف طويل جدًا")
    .optional(),
  governorate_id: z.number({ message: "المحافظة مطلوبة" }).or(z.string()).nullable(),
  is_active: z.boolean().default(false),
});
export type SchoolFormValues = z.infer<typeof schoolSchema>;
