import MarqueeText from "react-marquee-text";

const unitLabels = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "টি",
};

const formatBengaliNumber = (value) =>
  Number(value).toLocaleString("bn-BD", {
    maximumFractionDigits: 1,
  });

async function getProducts() {
  const response = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products",
    {
      next: {
        revalidate: 300,
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch product prices.");
  }

  return response.json();
}

export default async function Marquee() {
  const products = await getProducts();

  return (
    <div className="w-full overflow-hidden border-y border-[#DDE7DD] bg-white py-3">
      {" "}
      <MarqueeText direction="right" duration={25}>
        {" "}
        <div className="flex w-max items-center gap-8 whitespace-nowrap px-4">
          {products.map((product) => {
            const direction = product.change?.dir;
            const percentage = Number(product.change?.pct ?? 0);
            return (
              <div
                key={product.id}
                className="flex shrink-0 items-center gap-2 text-sm"
              >
                <span className="font-semibold text-[#1D271F]">
                  {product.image} {product.nameBn}
                </span>

                <span className="text-gray-700">
                  {formatBengaliNumber(product.today)} টাকা/
                  {unitLabels[product.unit] ?? product.unit}
                </span>

                <span
                  className={`font-bold ${
                    direction === "up"
                      ? "text-red-600"
                      : direction === "down"
                        ? "text-green-700"
                        : "text-gray-500"
                  }`}
                >
                  {direction === "up" ? "▲" : direction === "down" ? "▼" : "—"}{" "}
                  {formatBengaliNumber(Math.abs(percentage))}%
                </span>
              </div>
            );
          })}
        </div>
      </MarqueeText>
    </div>
  );
}
