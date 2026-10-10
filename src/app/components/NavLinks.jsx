import Link from "next/link";

const NavLinks = async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/categories",
    { next: { revalidate: 300 } },
  );

  if (!res.ok) throw new Error("Failed to fetch categories");

  const categories = await res.json();

  return (
    <nav className="w-full border-y border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-3 sm:px-6 lg:px-8">
        <Link
          className="flex shrink-0 items-center gap-2 rounded px-4 py-2 text-sm font-medium text-gray-600 hover:bg-green-50 hover:text-green-700"
          href="/"
        >
          হোম{" "}
        </Link>
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/category/${category.slug}`}
            className="flex shrink-0 items-center gap-2 rounded px-4 py-2 text-sm font-medium text-gray-600 hover:bg-green-50 hover:text-green-700"
          >
            <span className="text-lg">{category.icon}</span>
            <span className="whitespace-nowrap">{category.nameBn}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default NavLinks;
