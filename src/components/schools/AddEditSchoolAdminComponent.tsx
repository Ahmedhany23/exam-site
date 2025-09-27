"use client";
import React from "react";
import { AddEditSchoolAdmin_form } from "./forms/AddEditSchoolAdmin_form";
import { useParams } from "next/navigation";

export const AddEditSchoolAdminComponent = () => {
  const { adminId } = useParams<{ adminId: string }>();

  return (
    <div className="container mx-auto py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          {adminId ? "تعديل بيانات المدير" : "إضافة المدير جديد"}
        </h1>
        <p className="text-gray-600 mt-2">
          {adminId
            ? "قم بتعديل بيانات المدير أدناه"
            : "أدخل بيانات المدير الجديد"}
        </p>
      </div>
      <AddEditSchoolAdmin_form adminId={adminId} />
    </div>
  );
};
