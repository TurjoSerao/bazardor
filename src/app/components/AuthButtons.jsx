"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient, useSession } from "@/lib/auth-client";

export default function AuthButtons() {
  const { data: session, isPending } = useSession();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  async function handleSignOut() {
    await authClient.signOut();
    setOpen(false);
    router.push("/");
    router.refresh();
  }

  if (isPending) {
    return <div className="h-10" />;
  }

  if (!session?.user) {
    return (
      <div className="flex items-center gap-3 sm:gap-5">
        <Link href="/signin" className="rounded px-4 py-2 hover:bg-slate-100">
          সাইন ইন
        </Link>

        <Link
          href="/signup"
          className="rounded bg-[#05893E] px-4 py-2 text-white hover:bg-[#046f32]"
        >
          সাইন আপ
        </Link>
      </div>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-label="User menu"
        aria-expanded={open}
        className="flex h-11 w-11 items-center justify-center rounded-full bg-[#05893E] text-xl text-white hover:bg-[#046f32]"
      >
        {session.user.name?.charAt(0)?.toUpperCase() || "👤"}
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 w-48 rounded-lg border border-[#E5ECE5] bg-white py-2 shadow-lg">
          <div className="border-b border-[#E5ECE5] px-4 py-2">
            <p className="truncate text-sm font-bold text-[#1D271F]">
              {session.user.name}
            </p>
            <p className="truncate text-xs text-gray-500">
              {session.user.email}
            </p>
          </div>

          <Link
            href="/profile"
            onClick={() => setOpen(false)}
            className="block px-4 py-2 text-sm hover:bg-[#F0F5F0]"
          >
            প্রোফাইল
          </Link>

          <button
            type="button"
            onClick={handleSignOut}
            className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
          >
            সাইন আউট
          </button>
        </div>
      )}
    </div>
  );
}
