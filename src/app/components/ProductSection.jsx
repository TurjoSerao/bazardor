import ProductCard from "./ProductCard";
import ProductGrid from "./ProductGrid";

export default function ProductSection({ title, products, type = "all" }) {
  const arrow = type === "up" ? "▲" : type === "down" ? "▼" : "";

  const color =
    type === "up"
      ? "text-red-600"
      : type === "down"
        ? "text-green-700"
        : "text-[#1D271F]";

  return (
    <section className="mb-8 sm:mb-10">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 text-base font-extrabold text-[#1D271F] sm:text-lg">
          <span className={color}>{arrow}</span>
          {title}
        </h2>
      </div>

      {products.length > 0 ? (
        type === "all" ? (
          <ProductGrid products={products} />
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )
      ) : (
        <p className="py-8 text-center text-gray-500">
          কোনো পণ্য পাওয়া যায়নি।
        </p>
      )}
    </section>
  );
}
