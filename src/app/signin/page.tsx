
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signIn } from "@/app/lib/auth-client";
import AuthStatus from "@/app/components/layout/AuthStatus";
import SocialLoginButtons from "@/app/components/auth/SocialLoginButtons";

export default function SigninPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    try {
      const result = await signIn.email({
        email,
        password,
        callbackURL: "/",
      });

      if (result.error) {
        toast.error(result.error.message || "সাইন ইন করা যায়নি।");
        return;
      }

      toast.success("সফলভাবে সাইন ইন হয়েছে!");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="container-main flex min-h-screen items-center justify-center py-12">
      <section className="w-full max-w-md rounded-2xl border border-[#e2eae2] bg-white p-6 shadow-sm sm:p-8">
        <Link href="/" className="text-sm font-semibold text-[#078342]">
          ← বাজার দর
        </Link>

        <h1 className="mt-6 text-3xl font-extrabold text-gray-900">
          আবার স্বাগতম!
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          আপনার অ্যাকাউন্টে প্রবেশ করুন।
        </p>

        <form onSubmit={handleSubmit} className="mt-7 space-y-4">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-semibold">
              ইমেইল
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-[#078342]"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-semibold">
              পাসওয়ার্ড
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="আপনার পাসওয়ার্ড"
              className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-[#078342]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[#078342] px-4 py-3 font-bold text-white transition hover:bg-[#056b35] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "সাইন ইন হচ্ছে..." : "সাইন ইন"}
          </button>
        </form>
        <SocialLoginButtons />

     <div className="mt-6 text-center text-sm text-gray-600">
  <p>
    অ্যাকাউন্ট নেই?{" "}
    <a
      href="/signup"
      className="font-medium text-green-700 hover:underline"
    >
      সাইন আপ করুন
    </a>
  </p>

  <div className="hidden items-center justify-center gap-3 md:flex">
    <AuthStatus />
  </div>
</div>




      </section>
    </main>
  );
}
