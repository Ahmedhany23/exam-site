// schema.ts
import { z } from "zod";

export const adminPermissionsKeys = [
  "manage_students",
  "view_reports",
  "manage_school_settings",
  "manage_exams",
] as const;

const baseSchoolAdminSchema = z.object({
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
  school_id: z.string().min(1, "المدرسة مطلوبة"),
  is_active: z.boolean().optional(),
  admin_permissions: z
    .object(
      adminPermissionsKeys.reduce((acc, key) => {
        acc[key] = z.boolean().optional();
        return acc;
      }, {} as Record<(typeof adminPermissionsKeys)[number], z.ZodTypeAny>)
    )
    .optional(),
  governorate_id: z
    .number({ message: "المحافظة مطلوبة" })
    .or(z.string())
    .nullable(),
});

export const addSchoolAdminSchema = baseSchoolAdminSchema
  .extend({
    password: z.string().min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل"),
    password_confirmation: z
      .string()
      .min(8, "تأكيد كلمة المرور يجب أن يكون 8 أحرف على الأقل"),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "كلمتا المرور غير متطابقتين",
    path: ["password_confirmation"],
  });

export const editSchoolAdminSchema = baseSchoolAdminSchema
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

export const AddEditSchoolAdminSchema = baseSchoolAdminSchema
  .extend({
    password: z.string().min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل"),
    password_confirmation: z.string().min(8, "تأكيد كلمة المرور مطلوب"),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "كلمة المرور وتأكيدها غير متطابقين",
    path: ["password_confirmation"],
  });
