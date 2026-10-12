"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function UserMenu() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const user = session?.user;
  const [isOpen, setIsOpen] = useState(false);

  const initial = user?.name?.trim()?.charAt(0)?.toUpperCase() || "U";

  const handleSignOut = async () => {
    setIsSigningOut(true);

    try {
      await authClient.signOut();
      setIsOpen(false);
      router.replace("/");
      router.refresh();
    } catch (error) {
      console.error("Sign out failed:", error);
    } finally {
      setIsSigningOut(false);
    }
  };

  if (isPending) {
    return <span className="loading loading-spinner loading-sm text-success" />;
  }

  if (!user) return null;

  return (
    <div
      className={`dropdown dropdown-end ${isOpen ? "dropdown-open" : ""}`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Open user menu"
        aria-expanded={isOpen}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-[#05893E] text-lg font-semibold text-white transition hover:bg-[#047533] focus:outline-none focus:ring-2 focus:ring-[#05893E] focus:ring-offset-2"
      >
        {initial}
      </button>

      <ul
        className={`menu dropdown-content z-50 mt-2 w-64 rounded-box border border-base-300 bg-base-100 p-3 shadow-xl ${
          isOpen ? "" : "hidden"
        }`}
      >
        <li className="pointer-events-none mb-2 border-b border-base-300 pb-3">
          <div className="flex flex-col items-start gap-1 whitespace-normal">
            <span className="font-semibold text-base-content">
              {user.name || "User"}
            </span>

            <span className="break-all text-sm text-base-content/60">
              {user.email}
            </span>
          </div>
        </li>

        <li>
          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
              router.push("/profile");
            }}
          >
            Go to profile
          </button>
        </li>

        <li>
          <button
            type="button"
            onClick={handleSignOut}
            disabled={isSigningOut}
            className="text-error"
          >
            {isSigningOut ? (
              <span className="loading loading-spinner loading-xs" />
            ) : null}
            {isSigningOut ? "Signing out..." : "Sign out"}
          </button>
        </li>
      </ul>
    </div>
  );
}
