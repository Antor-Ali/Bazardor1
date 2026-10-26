
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container-main flex min-h-[70vh] items-center justify-center py-12">
      <div className="max-w-md text-center">
        <p className="text-7xl font-black text-[#078342]">404</p>

        <h1 className="mt-4 text-2xl font-extrabold text-gray-900">
          পেজটি খুঁজে পাওয়া যায়নি
        </h1>

        <p className="mt-3 text-sm leading-6 text-gray-600">
          আপনি যে পেজটি খুঁজছেন সেটি নেই অথবা ঠিকানাটি ভুল।
        </p>

        <Link
          href="/"
          className="mt-6 inline-flex rounded-lg bg-[#078342] px-5 py-3 text-sm font-bold text-white hover:bg-[#056b35]"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </main>
  );
}
