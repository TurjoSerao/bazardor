import Link from "next/link";
import NavLinks from "./NavLinks";
import AuthButtons from "./AuthButtons";

const Header = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <header className="mx-auto mt-3 w-full max-w-7xl px-3 sm:mt-5 sm:px-4">
      {/* Top Header */}
      <div className="flex min-w-0 items-center justify-between gap-3 pb-3 sm:pb-4">
        {/* Logo and Date */}
        <Link href="/" className="flex min-w-0 items-center gap-2 sm:gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-[#05893E] text-2xl text-white sm:h-14 sm:w-14 sm:text-3xl">
            🛒
          </div>

          <div className="min-w-0">
            <h2 className="text-base font-bold sm:text-xl">বাজার দর</h2>

            <p className="truncate text-[10px] text-gray-600 sm:text-xs">
              {date}
            </p>
          </div>
        </Link>

        {/* Authentication */}
        <div className="shrink-0">
          <AuthButtons />
        </div>
      </div>

      {/* Navigation */}
      <NavLinks />
    </header>
  );
};

export default Header;
