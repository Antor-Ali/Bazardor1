
"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserRound, Mail, Save, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/app/lib/auth-client";



export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  useEffect(() => {
  if (session?.user) {
    setName(session.user.name || "");
  }
}, [session?.user?.name]);
  

  const [name, setName] = useState("");
  
  
  const [saving, setSaving] = useState(false);

  if (isPending) {
    return (
      <main className="container-main py-16">
        <div className="mx-auto max-w-lg animate-pulse rounded-2xl bg-white p-8">
          <div className="h-8 w-40 rounded bg-gray-200" />
          <div className="mt-6 h-12 rounded bg-gray-100" />
          <div className="mt-4 h-12 rounded bg-gray-100" />
        </div>
      </main>
    );
  }

  if (!session?.user) {
    return (
      <main className="container-main py-16 text-center">
        <h1 className="text-2xl font-bold">সাইন ইন প্রয়োজন</h1>
        <p className="mt-3 text-gray-600">
          প্রোফাইল দেখতে প্রথমে আপনার অ্যাকাউন্টে প্রবেশ করুন।
        </p>
        <Link href="/signin" className="btn-primary mt-6">
          সাইন ইন করুন
        </Link>
      </main>
    );
  }
 


  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedName = name.trim();

    if (trimmedName.length < 2) {
      toast.error("নাম কমপক্ষে ২ অক্ষরের হতে হবে।");
      return;
    }

    setSaving(true);

    try {
      const result = await authClient.updateUser({
        name: trimmedName,
      });

      if (result.error) {
        toast.error(result.error.message || "নাম আপডেট করা যায়নি।");
        return;
      }

      toast.success("আপনার নাম আপডেট হয়েছে।");
      router.refresh();
    } catch {
      toast.error("সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setSaving(false);
    }
  }
  

  return (
    <main className="container-main py-10 sm:py-16">
      <div className="mx-auto max-w-lg">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#078342]"
        >
          <ArrowLeft size={17} />
          হোম পেজে ফিরে যান
        </Link>

        <section className="card-surface mt-6 p-6 sm:p-8">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#e5f5e9] text-[#078342]">
            <UserRound size={32} />
          </div>

          <h1 className="mt-5 text-2xl font-extrabold">
            আমার প্রোফাইল
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            আপনার অ্যাকাউন্টের তথ্য দেখুন ও নাম আপডেট করুন।
          </p>

          <form onSubmit={handleSubmit} className="mt-7 space-y-5">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-semibold">
                আপনার নাম
              </label>
              <input
                id="name"
                type="text"
                required
                minLength={2}
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-[#078342]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                ইমেইল
              </label>
              <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-gray-600">
                <Mail size={18} />
                <span className="break-all text-sm">
                  {session.user.email}
                </span>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                এই পেজ থেকে ইমেইল পরিবর্তন করা হচ্ছে না।
              </p>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Save size={17} />
              {saving ? "সেভ হচ্ছে..." : "নাম আপডেট করুন"}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
