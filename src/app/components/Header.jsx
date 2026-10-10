import React from "react";
import NavLinks from "./NavLinks";
import AuthButtons from "./AuthButtons";
import Link from "next/link";

const Header = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <header className="mt-4 px-4 sm:mt-5">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 pb-2 sm:flex-row sm:items-center sm:justify-between">
        {/* Logo and Date */}
        <Link href="/">
          <div className="flex items-center gap-3">
            <h2 className="flex h-12 w-12 shrink-0 items-center justify-center rounded bg-[#05893E] text-3xl text-white sm:h-14 sm:w-14">
              🛒
            </h2>

            <div>
              <h2 className="text-lg font-bold sm:text-xl">বাজার দর</h2>
              <p className="text-[11px] text-gray-600 sm:text-xs">{date}</p>
            </div>
          </div>
        </Link>

        {/* Authentication Buttons or User Menu */}
        <AuthButtons />
      </div>

      <NavLinks />
    </header>
  );
};

export default Header;
