import React from "react";
import NavLinks from "./NavLinks";

const Header = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <header className="my-4 sm:my-5 px-4">
      <div className="max-w-7xl mx-auto flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center pb-2">
        {/* Logo and Date */}
        <div className="flex items-center gap-3">
          <h2 className="flex items-center justify-center text-3xl bg-[#05893E] w-12 h-12 sm:w-14 sm:h-14 rounded text-white shrink-0">
            🛒
          </h2>

          <div>
            <h2 className="text-lg sm:text-xl font-bold">বাজার দর</h2>
            <p className="text-[11px] sm:text-xs text-gray-600">{date}</p>
          </div>
        </div>

        {/* Authentication Buttons */}
        <div className="flex items-center gap-3 sm:gap-5">
          <button className="btn flex-1 sm:flex-none cursor-pointer hover:bg-slate-100 px-4 py-2 rounded">
            সাইন ইন
          </button>

          <button className="btn flex-1 sm:flex-none cursor-pointer bg-[#05893E] hover:bg-[#046f32] px-4 py-2 rounded text-white">
            সাইন আপ
          </button>
        </div>
      </div>
      <NavLinks />
    </header>
  );
};

export default Header;
