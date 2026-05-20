"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html>
      <body className="flex flex-col items-center justify-center min-h-screen bg-[#0A1628] text-white p-6">
        <h2 className="text-2xl font-bold mb-4">Critical System Error</h2>
        <p className="text-gray-400 mb-8 max-w-md text-center">
          A global application error occurred. Our engineers have been notified.
        </p>
        <button
          onClick={() => reset()}
          className="bg-[#E7C85A] text-[#0A1628] px-6 py-2 rounded font-semibold hover:opacity-90 transition-opacity"
        >
          Restart Application
        </button>
      </body>
    </html>
  );
}
