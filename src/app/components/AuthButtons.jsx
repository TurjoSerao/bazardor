"use client";

import Link from "next/link";
import { useSession, signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function AuthButtons() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  async function handleSignOut() {
    await signOut();
    router.refresh();
  }

  if (isPending) {
    return (
      <div className="flex items-center gap-2">
        <div className="h-8 w-16 animate-pulse rounded-lg bg-gray-200" />
        <div className="h-8 w-16 animate-pulse rounded-lg bg-gray-200" />
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="flex items-center gap-2">
        <Link
          href="/signin"
          className="rounded-lg border border-[#05893E] px-3 py-2 text-sm font-semibold text-[#05893E] hover:bg-green-50"
        >
          সাইন ইন
        </Link>

        <Link
          href="/signup"
          className="rounded-lg bg-[#05893E] px-3 py-2 text-sm font-semibold text-white hover:bg-[#046f32]"
        >
          সাইন আপ
        </Link>
      </div>
    );
  }

  const initial = session.user.name?.charAt(0)?.toUpperCase() || "U";

  return (
    <div className="flex items-center gap-3">
      <Link
        href="/profile"
        className="flex h-9 w-9 items-center justify-center rounded-full bg-[#05893E] font-bold text-white"
        title="আমার প্রোফাইল"
      >
        {initial}
      </Link>

      <button
        onClick={handleSignOut}
        className="rounded-lg border border-gray-200 px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
      >
        সাইন আউট
      </button>
    </div>
  );
}
