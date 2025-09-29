"use client";
import { useUserStore } from "@/src/hooks/useUserStore";
import Image from "next/image";
import { motion } from "framer-motion";

export const HomeComponent = () => {
  const user = useUserStore((state) => state.user);

  return (
    <div
      className="min-h-screen bg-gray-50 flex items-center justify-center px-4"
      dir="rtl"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-2xl bg-white rounded-xl shadow-xl border-t-4 border-blue-600 p-8 sm:p-12 text-center"
      >
        {/* Logo Image */}
        <motion.div
          initial={{ scale: 0, rotate: -90 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.6, ease: "backOut" }}
          className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md overflow-hidden"
        >
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={40}
            height={40}
            className="object-contain"
            priority
          />
        </motion.div>

        {/* Greeting */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-4xl font-bold text-gray-900 mb-3"
        >
          مرحباً
        </motion.h1>

        {/* Name */}
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-2xl sm:text-3xl font-semibold text-blue-600"
        >
          {user?.name}
        </motion.h2>

        {/* Optional Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-4 text-gray-600 text-base sm:text-lg"
        >
          يسعدنا رؤيتك مرة أخرى في منصتنا التعليمية
        </motion.p>
      </motion.div>
    </div>
  );
};
