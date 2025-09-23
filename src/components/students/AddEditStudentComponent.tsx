"use client";
import React from "react";
import { AddEditStudent_form } from "./forms/AddEditStudent_form";
import { useParams } from "next/navigation";

export const AddEditStudentComponent = () => {
  const { studentId } = useParams<{ studentId: string }>();

  return (
    <div className="container mx-auto py-6 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          {studentId ? "تعديل بيانات الطالب" : "إضافة الطالب جديد"}
        </h1>
        <p className="text-gray-600 mt-2">
          {studentId
            ? "قم بتعديل بيانات الطالب أدناه"
            : "أدخل بيانات الطالب الجديد"}
        </p>
      </div>
      <AddEditStudent_form studentId={studentId} />
    </div>
  );
};
