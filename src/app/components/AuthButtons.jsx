"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import UserMenu from "./UserMenu";

export default function AuthButtons() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <div className="flex justify-end">
        <span className="loading loading-spinner loading-sm text-success" />
      </div>
    );
  }

  // Logged-in users see only the profile icon and dropdown.
  if (session?.user) {
    return (
      <div className="flex justify-end">
        <UserMenu />
      </div>
    );
  }

  // Logged-out users see the authentication buttons.
  return (
    <div className="flex items-center justify-end gap-2">
      <Link href="/signin" className="btn btn-outline btn-success btn-sm">
        Sign In
      </Link>

      <Link href="/signup" className="btn btn-success btn-sm">
        Sign Up
      </Link>
    </div>
  );
}
