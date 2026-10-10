import ProductCard from "@/app/components/ProductCard";

export default async function ProductsPage() {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products",
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const products = await res.json();

  return (
    <main className="min-h-screen bg-[#F0F5F0] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-2xl font-extrabold text-[#1D271F] sm:text-3xl">
          সকল পণ্য
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          মোট {products.length.toLocaleString("bn-BD")} টি পণ্য
        </p>

        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {products.length === 0 && (
          <p className="mt-8 text-center text-gray-500">
            কোনো পণ্য পাওয়া যায়নি।
          </p>
        )}
      </div>
    </main>
  );
}
