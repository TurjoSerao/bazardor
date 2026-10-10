"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function SignInPage() {
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState("");
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    setLoading(true);

    try {
      const { error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        console.error("Email sign-in error:", error);
        toast.error(error.message || "ইমেইল বা পাসওয়ার্ড সঠিক নয়");
        return;
      }

      toast.success("সফলভাবে সাইন ইন হয়েছে");
      router.replace("/");
      router.refresh();
    } catch (error) {
      console.error("Email sign-in exception:", error);
      toast.error("সাইন ইন করা যায়নি। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  }

  async function socialSignIn(provider) {
    setSocialLoading(provider);

    try {
      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: `${window.location.origin}/`,
      });

      if (error) {
        console.error(`${provider} sign-in error:`, error);
        toast.error(error.message || "সোশ্যাল লগইন করা যায়নি");
        setSocialLoading("");
      }
    } catch (error) {
      console.error(`${provider} sign-in exception:`, error);
      toast.error("সোশ্যাল লগইন করা যায়নি");
      setSocialLoading("");
    }
  }

  return (
    <main className="flex min-h-[60vh] items-center justify-center bg-[#F0F5F0] px-4 py-8">
      <div className="w-full max-w-sm">
        <h1 className="text-center text-2xl font-bold text-[#1D271F]">
          সাইন ইন
        </h1>

        <p className="mt-1 text-center text-xs text-gray-500">
          বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-5 space-y-4 rounded-2xl border border-[#E5ECE5] bg-white p-5"
        >
          <div>
            <label htmlFor="email" className="text-xs font-bold">
              ইমেইল
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              required
              className="mt-1 w-full rounded-lg border border-[#E5ECE5] px-3 py-2 text-sm outline-none focus:border-[#05893E]"
            />
          </div>

          <div>
            <label htmlFor="password" className="text-xs font-bold">
              পাসওয়ার্ড
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="আপনার পাসওয়ার্ড"
              required
              className="mt-1 w-full rounded-lg border border-[#E5ECE5] px-3 py-2 text-sm outline-none focus:border-[#05893E]"
            />
          </div>

          <button
            type="submit"
            disabled={loading || !!socialLoading}
            className="w-full rounded-lg bg-[#05893E] py-2 text-sm font-bold text-white disabled:opacity-60"
          >
            {loading ? "অপেক্ষা করুন..." : "সাইন ইন"}
          </button>
        </form>

        <div className="mt-4 space-y-3">
          <p className="text-center text-xs text-gray-500">
            অথবা দিয়ে চালিয়ে যান
          </p>

          <button
            type="button"
            onClick={() => socialSignIn("google")}
            disabled={loading || !!socialLoading}
            className="w-full rounded-lg border border-[#E5ECE5] bg-white py-2.5 text-sm font-semibold text-[#1D271F] hover:bg-gray-50 disabled:opacity-60"
          >
            {socialLoading === "google"
              ? "Google-এ সংযোগ করা হচ্ছে..."
              : "Sign in with Google"}
          </button>

          <button
            type="button"
            onClick={() => socialSignIn("github")}
            disabled={loading || !!socialLoading}
            className="w-full rounded-lg border border-[#E5ECE5] bg-white py-2.5 text-sm font-semibold text-[#1D271F] hover:bg-gray-50 disabled:opacity-60"
          >
            {socialLoading === "github"
              ? "GitHub-এ সংযোগ করা হচ্ছে..."
              : "Sign in with GitHub"}
          </button>
        </div>

        <p className="mt-5 text-center text-xs text-gray-600">
          অ্যাকাউন্ট নেই?{" "}
          <Link href="/signup" className="font-bold text-[#05893E]">
            সাইন আপ করুন
          </Link>
        </p>

        <Link href="/" className="mt-4 block text-center text-xs text-gray-500">
          ← হোম পেজে ফিরে যান
        </Link>
      </div>
    </main>
  );
}
