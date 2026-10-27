
"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { LogOut, UserRound } from "lucide-react";
import { authClient } from "@/app/lib/auth-client";

export default function AuthStatus() {
  const { data: session, isPending } = authClient.useSession();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSignOut() {
    setLoading(true);

    try {
      const result = await authClient.signOut();

      if (result.error) {
        toast.error("সাইন আউট করা যায়নি।");
        return;
      }

      toast.success("সাইন আউট হয়েছে।");
      router.refresh();
      router.push("/");
    } catch {
      toast.error("আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  }

  if (isPending) {
    return (
      <div className="h-9 w-24 animate-pulse rounded-lg bg-gray-100" />
    );
  }

  if (!session?.user) {
    return (
      <div className="flex items-center gap-2">
        <Link
          href="/signin"
          className="rounded-lg px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100"
        >
          সাইন ইন
        </Link>

        <Link
          href="/signup"
          className="rounded-lg bg-[#078342] px-3 py-2 text-sm font-semibold text-white hover:bg-[#056b35]"
        >
          সাইন আপ
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e5f5e9] text-[#078342]">
          <UserRound size={19} />
        </span>

        <span className="max-w-28 truncate text-sm font-semibold text-gray-800">
          {session.user.name || session.user.email} <Link
  href="/profile"
  className="text-sm font-semibold text-[#078342] hover:underline"
>
  প্রোফাইল
</Link>
        </span>
      </div>

      <button
        type="button"
        onClick={handleSignOut}
        disabled={loading}
        className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-60"
      >
        <LogOut size={16} />
        {loading ? "অপেক্ষা করুন..." : "সাইন আউট"}
      </button>
    </div>
  );
}
