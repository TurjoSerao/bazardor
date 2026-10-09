import React from "react";

const NavLinks = async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/categories",
  );

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  const navLinks = await res.json();

  return (
    <nav className="w-full border-y border-gray-200 bg-white">
      <div className="mx-auto flex w-full max-w-7xl items-center gap-2 overflow-x-auto px-4 py-3 sm:px-6 lg:px-8">
        {navLinks.map((nav) => (
          <div
            key={nav.id}
            className="group flex shrink-0 cursor-pointer items-center gap-2 rounded px-4 py-2 text-sm font-medium text-gray-600 transition-all duration-200 hover:bg-green-50 hover:text-green-700"
          >
            <span className="text-lg transition-transform duration-200 group-hover:scale-110">
              {nav.icon}
            </span>
            <span className="whitespace-nowrap font-bold">{nav.nameBn}</span>
          </div>
        ))}
      </div>
    </nav>
  );
};

export default NavLinks;
