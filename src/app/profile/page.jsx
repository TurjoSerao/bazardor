"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient, useSession } from "@/lib/auth-client";

export default function ProfilePage() {
  const { data: session, isPending } = useSession();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
    }
  }, [session]);

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.replace("/signin");
    }
  }, [isPending, session, router]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("আপনার নাম লিখুন");
      return;
    }

    setLoading(true);

    try {
      const { error } = await authClient.updateUser({
        name: name.trim(),
      });

      if (error) {
        toast.error(error.message || "নাম আপডেট করা যায়নি");
        return;
      }

      toast.success("নাম আপডেট হয়েছে");
    } catch {
      toast.error("কিছু একটা সমস্যা হয়েছে");
    } finally {
      setLoading(false);
    }
  }

  if (isPending || !session?.user) {
    return <p className="p-8 text-center">লোড হচ্ছে...</p>;
  }

  return (
    <main className="min-h-[60vh] bg-[#F0F5F0] px-4 py-10">
      <div className="mx-auto max-w-md">
        <h1 className="text-2xl font-bold text-[#1D271F]">আমার প্রোফাইল</h1>

        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-4 rounded-2xl border border-[#E5ECE5] bg-white p-5"
        >
          <div>
            <label className="text-sm font-bold">আপনার নাম</label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-2 w-full rounded-lg border border-[#E5ECE5] px-3 py-2 text-sm outline-none focus:border-[#05893E]"
              placeholder="আপনার নাম লিখুন"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[#05893E] py-2.5 text-sm font-bold text-white hover:bg-[#046f32] disabled:opacity-60"
          >
            {loading ? "আপডেট হচ্ছে..." : "নাম আপডেট করুন"}
          </button>
        </form>
      </div>
    </main>
  );
}
