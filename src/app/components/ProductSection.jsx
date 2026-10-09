import ProductCard from "./ProductCard";

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

        <span className="shrink-0 rounded-full bg-white px-3 py-1 text-xs font-semibold text-gray-500">
          {products.length.toLocaleString("bn-BD")}টি
        </span>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-[#E5ECE5] bg-white p-6 text-center text-sm text-gray-500">
          এই মুহূর্তে কোনো পণ্যের দাম পরিবর্তনের তথ্য নেই।
        </div>
      )}
    </section>
  );
}
