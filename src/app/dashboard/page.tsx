import { Metadata } from "next";
import { User } from "lucide-react";

export const metadata: Metadata = {
  title: "مرحباً - الصفحة الرئيسية",
};

const page = () => {
  return (
    <div className="min-h-screen  flex items-center justify-center" dir="rtl">
      <div className="text-center bg-white rounded-lg shadow-lg p-12 max-w-4xl mx-auto border-t-4 border-blue-600">
        {/* Icon */}
        <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-8">
          <User className="w-10 h-10 text-white" strokeWidth={2} />
        </div>

        {/* Greeting */}
        <h1 className="text-4xl font-bold text-gray-800 mb-4">مرحباً</h1>

        {/* Name */}
        <h2 className="text-3xl font-semibold text-blue-600">أحمد</h2>
      </div>
    </div>
  );
};

export default page;
