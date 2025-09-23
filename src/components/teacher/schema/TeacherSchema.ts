import { z } from "zod";

const baseTeacherSchema = z.object({
  first_name: z
    .string()
    .min(1, "الاسم الأول مطلوب")
    .max(50)
    .regex(/^\S+$/, "الاسم الأول يجب ألا يحتوي على مسافات"),

  second_name: z
    .string()
    .min(1, "الاسم الثاني مطلوب")
    .max(50)
    .regex(/^\S+$/, "الاسم الثاني يجب ألا يحتوي على مسافات"),

  third_name: z
    .string()
    .min(1, "الاسم الثالث مطلوب")
    .max(50)
    .regex(/^\S+$/, "الاسم الثالث يجب ألا يحتوي على مسافات"),

  fourth_name: z
    .string()
    .min(1, "الاسم الرابع مطلوب")
    .max(50)
    .regex(/^\S+$/, "الاسم الرابع يجب ألا يحتوي على مسافات"),

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
  subject_id: z.number({ message: "يجب اختيار المادة" }).optional(),
  teacher_type: z.enum(["regular", "supervisor"]).optional(),
  can_create_exams: z.boolean().optional(),
  can_correct_essays: z.boolean().optional(),
  is_active: z.boolean().optional(),
  school_ids: z.array(z.string()).optional(),
  assignment_type: z.enum(["teaching", "supervision", "correction"]).optional(),
});

export const addTeacherSchema = baseTeacherSchema
  .extend({
    password: z.string().min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل"),
    password_confirmation: z.string().min(8, "تأكيد كلمة المرور مطلوب"),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "كلمة المرور وتأكيدها غير متطابقين",
    path: ["password_confirmation"],
  });

export const editTeacherSchema = baseTeacherSchema
  .extend({
    password: z
      .string()
      .min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل")
      .optional()
      .or(z.literal("")),
    password_confirmation: z.string().optional().or(z.literal("")),
  })
  .refine(
    (data) => {
      if (data.password && data.password.trim() !== "") {
        return data.password === data.password_confirmation;
      }
      return true;
    },
    {
      message: "كلمة المرور وتأكيدها غير متطابقين",
      path: ["password_confirmation"],
    }
  );

export const teacherSchema = baseTeacherSchema
  .extend({
    password: z.string().min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل"),
    password_confirmation: z.string().min(8, "تأكيد كلمة المرور مطلوب"),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "كلمة المرور وتأكيدها غير متطابقين",
    path: ["password_confirmation"],
  });
