const unitLabels = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "টি",
};

export default function ProductCard({ product }) {
  const direction = product.change?.dir;
  const percentage = Number(product.change?.pct ?? 0);

  const color =
    direction === "up"
      ? "bg-red-50 text-red-600"
      : direction === "down"
        ? "bg-green-50 text-green-700"
        : "bg-gray-100 text-gray-500";

  const arrow = direction === "up" ? "▲" : direction === "down" ? "▼" : "—";

  const formatNumber = (value) =>
    Number(value).toLocaleString("bn-BD", {
      maximumFractionDigits: 1,
    });

  return (
    <article className="rounded-xl border border-[#E5ECE5] bg-white p-3 transition hover:border-[#C7DDC9] hover:shadow-sm sm:p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F0F5F0] text-xl">
          {product.image || product.categoryIcon || "🛒"}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-bold text-[#1D271F]">
            {product.nameBn}
          </h3>
          <p className="mt-0.5 truncate text-xs text-gray-500">
            {product.categoryNameBn}
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-end justify-between gap-2">
        <div>
          <p className="text-xs text-gray-500">আজকের দাম</p>
          <p className="mt-1 text-base font-extrabold text-[#1D271F]">
            {formatNumber(product.today)} টাকা
          </p>
          <p className="mt-0.5 text-xs text-gray-500">
            প্রতি {unitLabels[product.unit] ?? product.unit}
          </p>
        </div>

        <span
          className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-1 text-[11px] font-bold ${color}`}
          title={`দামের পরিবর্তন ${formatNumber(Math.abs(percentage))}%`}
        >
          {arrow} {formatNumber(Math.abs(percentage))}%
        </span>
      </div>
    </article>
  );
}
