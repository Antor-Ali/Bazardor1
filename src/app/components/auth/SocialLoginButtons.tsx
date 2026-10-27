
"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/app/lib/auth-client";

export default function SocialLoginButtons() {
  const [loading, setLoading] = useState<"google" | "github" | null>(null);

  async function handleSocialLogin(provider: "google" | "github") {
    setLoading(provider);

    try {
      const result = await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });

      if (result.error) {
        toast.error(result.error.message || "সাইন ইন করা যায়নি।");
        setLoading(null);
      }
    } catch {
      toast.error("সাইন ইন করতে সমস্যা হয়েছে।");
      setLoading(null);
    }
  }

  return (
    <div className="mt-5 space-y-3">
      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-gray-200" />
        <span className="text-xs text-gray-500">অথবা সাইন ইন করুন</span>
        <div className="h-px flex-1 bg-gray-200" />
      </div>

      <button
        type="button"
        disabled={loading !== null}
        onClick={() => handleSocialLogin("google")}
        className="w-full rounded-lg border border-gray-200 px-4 py-3 font-semibold hover:bg-gray-50 disabled:opacity-60"
      >
        {loading === "google" ? "অপেক্ষা করুন..." : "Google দিয়ে চালিয়ে যান"}
      </button>

      <button
        type="button"
        disabled={loading !== null}
        onClick={() => handleSocialLogin("github")}
        className="w-full rounded-lg border border-gray-200 px-4 py-3 font-semibold hover:bg-gray-50 disabled:opacity-60"
      >
        {loading === "github" ? "অপেক্ষা করুন..." : "GitHub দিয়ে চালিয়ে যান"}
      </button>
    </div>
  );
}
