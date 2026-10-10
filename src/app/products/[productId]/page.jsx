import Link from "next/link";
import { notFound } from "next/navigation";

const unitLabels = { kg: "কেজি", litre: "লিটার", dozen: "ডজন", piece: "পিস" };

const bn = (n) => Number(n).toLocaleString("bn-BD");

export default async function ProductDetails({ params }) {
  const { productId } = await params;

  const res = await fetch(
    `https://api.api-store.workers.dev/api/bazardor/products/${productId}`,
  );
  if (!res.ok) notFound();
  const product = await res.json();

  const unit = unitLabels[product.unit] ?? product.unit;

  //  average price from the markets list
  const mins = product.markets.map((m) => m.min);
  const maxs = product.markets.map((m) => m.max);
  const lowest = Math.min(...mins);
  const highest = Math.max(...maxs);
  const average = Math.round(
    product.markets.reduce((sum, m) => sum + (m.min + m.max) / 2, 0) /
      product.markets.length,
  );

  const diff = Math.abs(product.today - product.yesterday);
  const arrow = product.change.dir === "up" ? "▲" : "▼";
  const color = product.change.dir === "up" ? "text-red-600" : "text-green-700";

  return (
    <main className="bg-[#F0F5F0] min-h-screen px-4 py-6">
      <div className="max-w-6xl mx-auto space-y-4">
        <Link href="/" className="text-sm text-green-700">
          ← হোম পেজে ফিরে যান
        </Link>

        {/* Top card */}
        <section className="bg-white rounded-2xl p-5 flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-[#F0F5F0] flex items-center justify-center text-3xl">
              {product.image}
            </div>
            <div>
              <h1 className="text-2xl font-bold">{product.nameBn}</h1>
              <p className="text-xs text-gray-500">
                প্রতি {unit} · {product.categoryNameBn}
              </p>
              <p className="text-xs mt-1">
                গতকালের তুলনায় আজ দাম পরিবর্তন: {bn(diff)} টাকা
              </p>
            </div>
          </div>

          <div className="bg-[#F0F5F0] rounded-xl px-6 py-3 text-center">
            <p className="text-xs text-gray-500">আজকের দাম</p>
            <p className="text-4xl font-extrabold">{bn(product.today)}</p>
            <p className="text-xs text-gray-500">টাকা / {unit}</p>
            <p className={`text-xs font-bold ${color}`}>
              {arrow} {bn(product.change.pct)}%
            </p>
          </div>
        </section>

        {/* Price summary */}
        <section className="bg-white rounded-2xl p-5 ">
          <h2 className="text-sm font-bold">দামের সারসংক্ষেপ</h2>
          <div className="grid gap-3 mt-3 sm:grid-cols-3">
            <div className="border rounded-xl p-4 space-y-2">
              <p className="text-xs text-gray-500">সর্বনিম্ন দাম</p>
              <p className="text-xl font-bold text-green-700">
                {bn(lowest)} টাকা
              </p>
              <p className="text-xs text-gray-500">সবচেয়ে কম দামের বাজার</p>
            </div>
            <div className="border rounded-xl p-4 space-y-2">
              <p className="text-xs text-gray-500">সর্বোচ্চ দাম</p>
              <p className="text-xl font-bold text-red-600">
                {bn(highest)} টাকা
              </p>
              <p className="text-xs text-gray-500">সবচেয়ে বেশি দামের বাজার</p>
            </div>
            <div className="border rounded-xl p-4 space-y-2">
              <p className="text-xs text-gray-500">গড় দাম</p>
              <p className="text-xl font-bold text-green-700">
                {bn(average)} টাকা
              </p>
              <p className="text-xs text-gray-500">প্রতি কেজি-এর হিসাবে</p>
            </div>
          </div>
        </section>

        {/* Market table */}
        <section className="bg-white rounded-2xl p-5">
          <h2 className="text-sm font-bold">বাজারভিত্তিক আজকের দাম</h2>
          <div className="overflow-x-auto mt-3">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-gray-500 border-b">
                  <th className="p-3 text-left">বাজার</th>
                  <th className="p-3 text-left">বিভাগ</th>
                  <th className="p-3 text-right">সর্বনিম্ন</th>
                  <th className="p-3 text-right">সর্বোচ্চ</th>
                  <th className="p-3 text-right">গড়</th>
                </tr>
              </thead>
              <tbody>
                {product.markets.map((m, i) => (
                  <tr key={i} className="border-b">
                    <td className="p-3 font-bold">{m.market}</td>
                    <td className="p-3">{m.division}</td>
                    <td className="p-3 text-right">{bn(m.min)} টাকা</td>
                    <td className="p-3 text-right">{bn(m.max)} টাকা</td>
                    <td className="p-3 text-right font-bold">
                      {bn((m.min + m.max) / 2)} টাকা
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
