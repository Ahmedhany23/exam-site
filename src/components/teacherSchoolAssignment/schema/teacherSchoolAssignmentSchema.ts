import z from "zod";

export const teacherSchoolAssignmentSchema = z.object({
  teacher_id: z.string().min(1, { message: "المعلم مطلوب" }),
  school_id: z.string().min(1, { message: "المدرسة مطلوبة" }),
  assignment_type: z.enum(["teaching", "supervision", "correction"]).optional(),
  is_active: z.boolean().optional(),
});

export type TeacherSchoolAssignmentFormValues = z.infer<
  typeof teacherSchoolAssignmentSchema
>;
