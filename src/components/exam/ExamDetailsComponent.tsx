"use client";

import { useParams } from "next/navigation";
import {
  useAddorEditExamQuestion,
  useDeleteExamQuestion,
  useDeleteExamSection,
  useGetExamQuestions,
} from "./hooks/useExamApi";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Button } from "../ui/button";
import { Loader2Icon, Plus, Trash } from "lucide-react";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/src/components/ui/alert-dialog";

export const ExamDetailsComponent = () => {
  const { examId } = useParams<{ examId: string }>();
  const { data, isLoading } = useGetExamQuestions(examId);

  const { deleteExamQuestionMutation, deleteLoading } = useDeleteExamQuestion();

  const { deleteExamSectionMutation, deleteExamSectionLoading } =
    useDeleteExamSection();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-3">
          <div className="inline-block w-10 h-10 border-4 border-gray-300 border-t-black rounded-full animate-spin" />
          <p className="text-gray-600 font-medium">
            جاري تحميل بيانات الامتحان...
          </p>
        </div>
      </div>
    );
  }

  // Calculate totals
  const totalSectionPoints =
    data?.sections.reduce((sum, section) => sum + section.total_points, 0) || 0;
  const totalUnsectionedPoints =
    data?.unsectioned_questions?.reduce((sum, q) => sum + q.points, 0) || 0;
  const totalExamPoints = totalSectionPoints + totalUnsectionedPoints;
  const totalQuestions =
    (data?.sections.reduce(
      (sum, section) => sum + (section.questions?.length || 0),
      0
    ) || 0) + (data?.unsectioned_questions?.length || 0);

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8 font-[Cairo]">
      {/* Exam Summary Card */}
      <Card className="border border-gray-300 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-bold text-gray-800">
            ملخص الامتحان
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-sm text-gray-600 mb-1">عدد الأجزاء</p>
              <p className="text-2xl font-bold text-gray-900">
                {data?.sections.length || 0}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">عدد الأسئلة</p>
              <p className="text-2xl font-bold text-gray-900">
                {totalQuestions}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">مجموع الدرجات</p>
              <p className="text-2xl font-bold text-gray-900">
                {totalExamPoints}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <Button
          variant="outline"
          className="border-gray-400 text-gray-800 hover:bg-gray-100 cursor-pointer"
          asChild
        >
          <Link href={`/exams/${examId}/sections/add`}>
            <Plus /> إضافة قسم
          </Link>
        </Button>
        <Button
          asChild
          variant="outline"
          className="border-gray-400 text-gray-800 hover:bg-gray-100 cursor-pointer"
        >
          <Link href={`/exams/${examId}/questions/add`}>
            <Plus /> إضافة سؤال
          </Link>
        </Button>
      </div>

      {/* Sections */}
      <div className="space-y-6">
        <h2 className="text-lg font-semibold text-gray-800">أجزاء الامتحان</h2>

        {data?.sections && data.sections.length > 0 ? (
          <div className="space-y-4">
            {data.sections.map((section, index) => (
              <Card
                key={section.id}
                className="border border-gray-300 shadow-sm"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between flex-wrap">
                    <div>
                      <CardTitle className="text-base font-bold text-gray-800">
                        {index + 1}- {section.name}
                      </CardTitle>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="px-2 py-0.5 rounded bg-gray-200 text-gray-800">
                        {section.questions?.length || 0} سؤال
                      </span>
                      <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-800 font-bold">
                        {section.total_points} درجة
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm justify-end my-4">
                      {" "}
                      <Button asChild size={"sm"}>
                        <Link
                          href={`/exams/${examId}/sections/${section.id}/add-question`}
                        >
                          إضافة سؤال
                        </Link>
                      </Button>
                      <Button asChild size={"sm"}>
                        <Link
                          href={`/exams/${examId}/sections/${section.id}/edit`}
                        >
                          تعديل
                        </Link>
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button size="sm" variant="destructive">
                            حذف
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>تأكيد الحذف</AlertDialogTitle>
                            <AlertDialogDescription>
                              هل أنت متأكد أنك تريد حذف هذا القسم؟ لا يمكن
                              التراجع عن هذه العملية.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>إلغاء</AlertDialogCancel>
                            <AlertDialogAction
                              type="submit"
                              onClick={async () =>
                                await deleteExamSectionMutation(section.id)
                              }
                              className="bg-red-600 hover:bg-red-600 text-center"
                              disabled={deleteExamSectionLoading}
                            >
                              {deleteExamSectionLoading ? (
                                <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                              ) : (
                                <Trash className="mr-2 h-4 w-4" />
                              )}
                              حذف
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {section.questions && section.questions.length > 0 ? (
                    <div className="space-y-4">
                      {section.questions.map((q, qIndex) => (
                        <div
                          key={q.id}
                          className="p-4 rounded-lg border border-gray-200 bg-gray-50"
                        >
                          <div className="flex items-start gap-3">
                            <span className="text-sm font-bold text-gray-700 min-w-[24px]">
                              {qIndex + 1}-
                            </span>
                            <div className="flex-1 space-y-3">
                              <p className="text-base leading-relaxed text-gray-900">
                                {q.question_text}
                              </p>

                              {/* Question Actions */}
                              <div className="flex flex-wrap items-center gap-3 justify-end mt-3">
                                <Button
                                  asChild
                                  size="sm"
                                  className="min-h-[36px]"
                                >
                                  <Link
                                    href={`/exams/${examId}/sections/${section.id}/questions/${q.id}/edit`}
                                  >
                                    تعديل
                                  </Link>
                                </Button>

                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button
                                      size="sm"
                                      variant="destructive"
                                      className="min-h-[36px]"
                                    >
                                      حذف
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>
                                        تأكيد الحذف
                                      </AlertDialogTitle>
                                      <AlertDialogDescription>
                                        هل أنت متأكد أنك تريد حذف هذا السؤال؟
                                        لا يمكن التراجع عن هذه العملية.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>
                                        إلغاء
                                      </AlertDialogCancel>
                                      <AlertDialogAction
                                        type="submit"
                                        onClick={async () =>
                                          await deleteExamQuestionMutation(q.id)
                                        }
                                        className="bg-red-600 hover:bg-red-700 text-center focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                        disabled={deleteLoading}
                                      >
                                        {deleteLoading ? (
                                          <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                                        ) : (
                                          <Trash className="mr-2 h-4 w-4" />
                                        )}
                                        حذف
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </div>

                              {/* Options */}
                              {q.options && q.options.length > 0 && (
                                <div className="mt-2 space-y-2 pl-3 border-l-2 border-gray-300">
                                  {q.options.map((option, optIndex) => (
                                    <div
                                      key={optIndex}
                                      className="flex items-center gap-2 text-sm text-gray-800"
                                    >
                                      <span className="w-6 h-6 rounded-full border border-gray-400 flex items-center justify-center text-[11px] font-medium">
                                        {String.fromCharCode(65 + optIndex)}
                                      </span>
                                      <span>{option}</span>
                                    </div>
                                  ))}
                                </div>
                              )}

                              {/* Help text */}
                              {q.help_text && (
                                <p className="text-sm text-gray-700 italic pl-3 border-l-2 border-yellow-400">
                                  💡 {q.help_text}
                                </p>
                              )}
                            </div>
                            <span className="px-2 py-1 text-sm font-bold bg-gray-200 text-gray-800 rounded">
                              {q.points} د
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="py-8 text-center text-base text-gray-500">
                      لا يوجد أسئلة في هذا الجزء
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="border border-dashed">
            <CardContent className="py-10 text-center text-gray-500">
              لا يوجد أجزاء متاحة
            </CardContent>
          </Card>
        )}
      </div>

      {/* Unsectioned Questions */}
      {data?.unsectioned_questions && data.unsectioned_questions.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-lg font-semibold text-gray-800">أسئلة عامة</h2>

          <Card className="border border-gray-300 shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between flex-wrap">
                <CardTitle className="text-base font-bold text-gray-800">
                  أسئلة بدون جزء
                </CardTitle>
                <div className="flex items-center gap-3 text-sm">
                  <span className="px-2 py-0.5 rounded bg-gray-200 text-gray-800">
                    {data.unsectioned_questions.length} سؤال
                  </span>
                  <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-800 font-bold">
                    {totalUnsectionedPoints} درجة
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {data.unsectioned_questions.map((q, qIndex) => (
                  <div
                    key={q.id}
                    className="p-3 rounded border border-gray-200 bg-gray-50"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-xs font-bold text-gray-600 min-w-[24px]">
                        {qIndex + 1}-
                      </span>
                      <div className="flex-1 space-y-2">
                        <p className="text-sm leading-relaxed text-gray-800">
                          {q.question_text}
                        </p>
                        <div className="flex items-center gap-3 text-sm w-full justify-end my-4">
                          <Button asChild size={"sm"}>
                            <Link
                              href={`/exams/${examId}/questions/${q.id}/edit`}
                            >
                              تعديل
                            </Link>
                          </Button>

                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button size="sm" variant="destructive">
                                حذف
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>تأكيد الحذف</AlertDialogTitle>
                                <AlertDialogDescription>
                                  هل أنت متأكد أنك تريد حذف هذا السؤال؟ لا يمكن
                                  التراجع عن هذه العملية.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>إلغاء</AlertDialogCancel>
                                <AlertDialogAction
                                  type="submit"
                                  onClick={async () =>
                                    await deleteExamQuestionMutation(q.id)
                                  }
                                  className="bg-red-600 hover:bg-red-600 text-center"
                                  disabled={deleteLoading}
                                >
                                  {deleteLoading ? (
                                    <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                                  ) : (
                                    <Trash className="mr-2 h-4 w-4" />
                                  )}
                                  حذف
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>

                        {q.options && q.options.length > 0 && (
                          <div className="mt-2 space-y-1 pl-3 border-l border-gray-300">
                            {q.options.map((option, optIndex) => (
                              <div
                                key={optIndex}
                                className="flex items-center gap-2 text-xs text-gray-700"
                              >
                                <span className="w-5 h-5 rounded-full border border-gray-400 flex items-center justify-center text-[10px] font-medium">
                                  {String.fromCharCode(65 + optIndex)}
                                </span>
                                <span>{option}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {q.help_text && (
                          <p className="text-xs text-gray-600 italic pl-3 border-l border-yellow-400">
                            💡 {q.help_text}
                          </p>
                        )}
                      </div>
                      <span className="px-2 py-1 text-xs font-bold bg-gray-200 text-gray-800 rounded">
                        {q.points} د
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
