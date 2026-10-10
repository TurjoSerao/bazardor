import ProductCard from "@/app/components/ProductCard";
import ProductGrid from "@/app/components/ProductGrid";

export default async function CategoryPage({ params }) {
  const { categoryId } = await params;

  const res = await fetch(
    `https://api.api-store.workers.dev/api/bazardor/products?category=${categoryId}`,
  );

  if (!res.ok) throw new Error("Failed to fetch products");

  const products = await res.json();

  return (
    <main className="min-h-screen bg-[#F0F5F0]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="mb-6 text-2xl font-extrabold text-[#1D271F]">
          {products[0]?.categoryNameBn || "পণ্যের তালিকা"}
        </h1>

        {products.length > 0 ? (
          <ProductGrid products={products} />
        ) : (
          <p className="rounded-xl bg-white p-6 text-center text-gray-500">
            এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
          </p>
        )}
      </div>
    </main>
  );
}
