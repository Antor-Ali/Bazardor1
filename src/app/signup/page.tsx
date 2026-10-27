
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signUp } from "@/app/lib/auth-client";
import AuthStatus from "@/app/components/layout/AuthStatus";


export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    try {
      const result = await signUp.email({
        name,
        email,
        password,
        callbackURL: "/",
      });

      if (result.error) {
        toast.error(result.error.message || "অ্যাকাউন্ট তৈরি করা যায়নি।");
        return;
      }

      toast.success("অ্যাকাউন্ট তৈরি হয়েছে!");
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
          অ্যাকাউন্ট তৈরি করুন
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          BazarDor-এ যোগ দিতে আপনার তথ্য দিন।
        </p>

        <form onSubmit={handleSubmit} className="mt-7 space-y-4">
          <div>
            <label htmlFor="name" className="mb-1.5 block text-sm font-semibold">
              আপনার নাম
            </label>
            <input
              id="name"
              type="text"
              autoComplete="name"
              required
              minLength={2}
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="আপনার নাম লিখুন"
              className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-[#078342]"
            />
          </div>

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
              autoComplete="new-password"
              required
              minLength={8}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="কমপক্ষে ৮ অক্ষর"
              className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-[#078342]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[#078342] px-4 py-3 font-bold text-white transition hover:bg-[#056b35] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "সাইন আপ"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          আগে থেকেই অ্যাকাউন্ট আছে?{" "}
          <div className="hidden items-center gap-3 md:flex">
  <AuthStatus />
</div>
        </p>
      </section>
    </main>
  );
}
