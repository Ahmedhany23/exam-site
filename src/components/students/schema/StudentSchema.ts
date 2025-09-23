// schema.ts
import { z } from "zod";

export const AddEditStudentSchema = z
  .object({
    first_name: z.string().min(1, "الاسم الأول مطلوب").max(50),
    second_name: z.string().min(1, "الاسم الثاني مطلوب").max(50),
    third_name: z.string().min(1, "الاسم الثالث مطلوب").max(50),
    fourth_name: z.string().min(1, "الاسم الرابع مطلوب").max(50),
    email: z.string().email("البريد الإلكتروني غير صالح").max(255),
    phone: z.string().min(1, "رقم الهاتف مطلوب").max(20),
    national_id: z
      .string()
      .length(14, "الرقم القومي يجب أن يكون 14 رقم")
      .regex(/^\d+$/, "الرقم القومي يجب أن يحتوي على أرقام فقط"),
    password: z.string().min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل"),
    password_confirmation: z
      .string()
      .min(8, "تأكيد كلمة المرور يجب أن يكون 8 أحرف على الأقل"),
    is_active: z.boolean().optional(),
    academic_year: z.string().min(1, "الصف الدراسي مطلوب"),
    birth_date: z
      .string()
      .min(1, "تاريخ الميلاد مطلوب")
      .refine(
        (val) => {
          const date = new Date(val);
          return date < new Date();
        },
        {
          message: "تاريخ الميلاد يجب أن يكون في الماضي",
        }
      ),

    gender: z.string().min(1, "الجنس مطلوب"),
    guardian_phone: z.string().min(1, "رقم هاتف ولي الأمر مطلوب"),
    section: z.string().min(1, "الشعبة مطلوبة"),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "كلمتا المرور غير متطابقتين",
    path: ["password_confirmation"],
  });

export type AddEditStudentSchemaType = z.infer<typeof AddEditStudentSchema>;
