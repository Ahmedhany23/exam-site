import { z } from "zod";

export const teacherSchema = z
  .object({
    first_name: z.string().min(1, "الاسم الأول مطلوب").max(50),
    second_name: z.string().min(1, "الاسم الثاني مطلوب").max(50),
    third_name: z.string().min(1, "الاسم الثالث مطلوب").max(50),
    fourth_name: z.string().min(1, "الاسم الرابع مطلوب").max(50),

    email: z.string().refine(
      (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value) && value.length <= 255;
      },
      { message: "البريد الإلكتروني غير صالح أو أطول من 255 حرف" }
    ),
    phone: z.string().min(1, "رقم الهاتف مطلوب").max(20),
    national_id: z
      .string()
      .length(14, "الرقم القومي يجب أن يكون 14 رقمًا")
      .regex(/^\d+$/, "الرقم القومي يجب أن يحتوي على أرقام فقط"),
    password: z.string().min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل"),
    password_confirmation: z.string().min(8, "تأكيد كلمة المرور مطلوب"),
    subject_specialization: z.string().min(1, "التخصص مطلوب").max(255),
    teacher_type: z.enum(["regular", "supervisor"]).optional(),
    can_create_exams: z.boolean().optional(),
    can_correct_essays: z.boolean().optional(),
    is_active: z.boolean().optional(),
    school_ids: z.array(z.string()).optional(),
    assignment_type: z
      .enum(["teaching", "supervision", "correction"])
      .optional(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "كلمة المرور وتأكيدها غير متطابقين",
    path: ["password_confirmation"],
  });
