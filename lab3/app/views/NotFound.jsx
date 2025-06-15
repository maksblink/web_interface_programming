import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6 py-12">
      <h1 className="text-6xl font-extrabold text-[#183A37] dark:text-amber-200 mb-4">
        404
      </h1>
      <p className="text-2xl font-semibold text-gray-800 dark:text-gray-300 mb-2">
        Strona nie została znaleziona
      </p>
      <p className="text-md text-gray-600 dark:text-gray-400 mb-6">
        Nie możemy znaleźć strony, której szukasz.
      </p>
      <Link
        to="/"
        className="px-4 py-2 bg-[#EFD6AC] text-[#04151F] rounded-lg text-lg font-medium hover:opacity-90 transition"
      >
        Wróć do biblioteki
      </Link>
    </main>
  );
}
