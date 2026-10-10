"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";

export default function SignUpPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    if (password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
      return;
    }

    if (password !== form.confirm.value) {
      toast.error("পাসওয়ার্ড দুটি মেলেনি");
      return;
    }

    setLoading(true);

    const { error } = await authClient.signUp.email({
      name,
      email,
      password,
    });

    setLoading(false);

    if (error) {
      toast.error(error.message || "সাইন আপ করা যায়নি");
      return;
    }

    toast.success("অ্যাকাউন্ট তৈরি হয়েছে!");
    router.push("/signin");
  }

  async function socialSignIn(provider) {
    await authClient.signIn.social({
      provider,
      callbackURL: "/",
    });
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F0F5F0] px-4 py-8">
      <div className="w-full max-w-sm">
        <h1 className="text-center text-2xl font-bold text-[#1D271F]">
          অ্যাকাউন্ট তৈরি করুন
        </h1>

        <p className="mt-1 text-center text-xs text-gray-500">
          বিনা খরচে সাইন আপ করে সব পণ্যের দাম দেখুন।
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-5 space-y-4 rounded-2xl border border-[#E5ECE5] bg-white p-5"
        >
          <div>
            <label className="text-xs font-bold">নাম</label>
            <input
              name="name"
              type="text"
              placeholder="আপনার নাম"
              required
              className="mt-1 w-full rounded-lg border border-[#E5ECE5] px-3 py-2 text-sm outline-none focus:border-[#05893E]"
            />
          </div>

          <div>
            <label className="text-xs font-bold">ইমেইল</label>
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              required
              className="mt-1 w-full rounded-lg border border-[#E5ECE5] px-3 py-2 text-sm outline-none focus:border-[#05893E]"
            />
          </div>

          <div>
            <label className="text-xs font-bold">পাসওয়ার্ড</label>
            <input
              name="password"
              type="password"
              placeholder="কমপক্ষে ৮ অক্ষর"
              required
              className="mt-1 w-full rounded-lg border border-[#E5ECE5] px-3 py-2 text-sm outline-none focus:border-[#05893E]"
            />
          </div>

          <div>
            <label className="text-xs font-bold">পাসওয়ার্ড নিশ্চিত করুন</label>
            <input
              name="confirm"
              type="password"
              placeholder="আবার লিখুন"
              required
              className="mt-1 w-full rounded-lg border border-[#E5ECE5] px-3 py-2 text-sm outline-none focus:border-[#05893E]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[#05893E] py-2 text-sm font-bold text-white disabled:opacity-60"
          >
            {loading ? "অপেক্ষা করুন..." : "অ্যাকাউন্ট তৈরি করুন"}
          </button>

          <p className="text-center text-xs text-gray-400">অথবা</p>

          <button
            type="button"
            onClick={() => socialSignIn("google")}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#E5ECE5] py-2 text-sm font-bold"
          >
            <FcGoogle size={18} />
            Google দিয়ে চালিয়ে যান
          </button>

          <button
            type="button"
            onClick={() => socialSignIn("github")}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#E5ECE5] py-2 text-sm font-bold"
          >
            <FaGithub size={18} />
            GitHub দিয়ে চালিয়ে যান
          </button>

          <p className="text-center text-xs text-gray-600">
            অ্যাকাউন্ট আছে?{" "}
            <Link href="/signin" className="font-bold text-[#05893E]">
              সাইন ইন করুন
            </Link>
          </p>
        </form>

        <Link href="/" className="mt-4 block text-center text-xs text-gray-500">
          ← হোম পেজে ফিরে যান
        </Link>
      </div>
    </main>
  );
}
