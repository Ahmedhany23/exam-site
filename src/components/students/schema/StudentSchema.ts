// schema.ts
import { z } from "zod";

 const baseStudentSchema = z
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



  export const addStudentSchema = baseStudentSchema
    .extend({
      password: z.string().min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل"),
      password_confirmation: z.string().min(8, "تأكيد كلمة المرور مطلوب"),
    })
    .refine((data) => data.password === data.password_confirmation, {
      message: "كلمة المرور وتأكيدها غير متطابقين",
      path: ["password_confirmation"],
    });
  
  export const editStudentSchema = baseStudentSchema
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
  
  



