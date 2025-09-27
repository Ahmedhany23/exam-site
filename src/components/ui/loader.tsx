import React from "react";

export const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center space-y-3">
        <div className="inline-block w-10 h-10 border-4 border-gray-300 border-t-black rounded-full animate-spin" />
        <p className="text-gray-600 font-medium">جاري تحميل بيانات ...</p>
      </div>
    </div>
  );
};
