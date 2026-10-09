import MarqueeText from "react-marquee-text";

const formatBengaliNumber = (value) =>
  Number(value).toLocaleString("bn-BD", {
    maximumFractionDigits: 1,
  });

const unitLabels = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "টি",
};

const Marquee = async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products",
  );

  if (!res.ok) {
    throw new Error("Failed to fetch product prices");
  }

  const products = await res.json();

  return (
    <div className="w-full overflow-hidden border-y border-gray-200 bg-white py-3">
      <MarqueeText direction="right" duration={25}>
        <div className="flex w-max items-center gap-8 whitespace-nowrap px-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex shrink-0 items-center gap-2 text-sm sm:text-base"
            >
              <span className="font-semibold text-gray-800">
                {product.image} {product.nameBn}
              </span>

              <span className="text-gray-700">
                {formatBengaliNumber(product.today)} টাকা/
                {unitLabels[product.unit] ?? product.unit}
              </span>

              <span
                className={`font-bold ${
                  product.change?.dir === "up"
                    ? "text-red-600"
                    : product.change?.dir === "down"
                      ? "text-green-600"
                      : "text-gray-500"
                }`}
              >
                {product.change?.dir === "up"
                  ? "▲"
                  : product.change?.dir === "down"
                    ? "▼"
                    : "—"}{" "}
                {formatBengaliNumber(Math.abs(product.change?.pct ?? 0))}%
              </span>
            </div>
          ))}
        </div>
      </MarqueeText>
    </div>
  );
};

export default Marquee;
