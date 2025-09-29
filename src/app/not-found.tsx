// app/not-found.tsx
export default function NotFound() {
  return (
    <main className="flex h-screen flex-col items-center justify-center bg-gray-100 text-center">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="mt-4 text-lg text-gray-600">
        عذرًا! الصفحة التي تبحث عنها غير موجودة.
      </p>
      <a
        href="/"
        className="mt-6 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition"
      >
        العودة إلى الصفحة الرئيسية
      </a>
    </main>
  );
}
