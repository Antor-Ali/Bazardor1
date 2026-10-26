
"use client";

import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("BazarDor page error:", error);
  }, [error]);

  return (
    <main className="container-main flex min-h-[60vh] items-center justify-center py-12">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center">
        <div className="text-5xl" aria-hidden="true">
          ⚠️
        </div>

        <h1 className="mt-4 text-2xl font-extrabold text-gray-900">
          দুঃখিত, সমস্যা হয়েছে
        </h1>

        <p className="mt-3 text-sm leading-6 text-gray-600">
          পেজটি লোড করা যায়নি। আপনার ইন্টারনেট সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।
        </p>

        <button
          type="button"
          onClick={() => reset()}
          className="mt-6 rounded-lg bg-[#078342] px-5 py-3 text-sm font-bold text-white hover:bg-[#056b35]"
        >
          আবার চেষ্টা করুন
        </button>
      </div>
    </main>
  );
}
