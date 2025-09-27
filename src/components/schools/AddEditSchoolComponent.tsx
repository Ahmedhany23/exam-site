"use client";
import React from "react";

import { useParams } from "next/navigation";
import { AddEditSchool_form } from "./forms/AddEditSchool_form";

export const AddEditSchoolComponent = () => {
  const { schoolId } = useParams<{ schoolId: string }>();

  return (
    <div className="container mx-auto py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          {schoolId ? "تعديل بيانات مدرسة" : "إضافة مدرسة جديد"}
        </h1>
        <p className="text-gray-600 mt-2">
          {schoolId
            ? "قم بتعديل بيانات مدرسة أدناه"
            : "أدخل بيانات مدرسة الجديد"}
        </p>
      </div>
      <AddEditSchool_form schoolId={schoolId} />
    </div>
  );
};
