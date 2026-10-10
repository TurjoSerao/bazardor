import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

const unitLabels = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};

const bn = (n) => Number(n).toLocaleString("bn-BD");

export default async function ProductDetails({ params }) {
  // Verify the user's session on the server
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin");
  }

  const { productId } = await params;

  // Fetch product details
  const res = await fetch(
    `https://api.api-store.workers.dev/api/bazardor/products/${productId}`,
    { next: { revalidate: 300 } },
  );

  if (!res.ok) {
    notFound();
  }

  const product = await res.json();

  const markets = Array.isArray(product.markets) ? product.markets : [];

  const unit = unitLabels[product.unit] ?? product.unit;
  const mins = markets.map((m) => Number(m.min));
  const maxs = markets.map((m) => Number(m.max));

  const lowest = mins.length ? Math.min(...mins) : 0;
  const highest = maxs.length ? Math.max(...maxs) : 0;

  const average = markets.length
    ? Math.round(
        markets.reduce(
          (sum, m) => sum + (Number(m.min) + Number(m.max)) / 2,
          0,
        ) / markets.length,
      )
    : 0;

  const diff = Math.abs(Number(product.today) - Number(product.yesterday));

  const direction = product.change?.dir;
  const arrow = direction === "up" ? "▲" : direction === "down" ? "▼" : "—";
  const color =
    direction === "up"
      ? "text-red-600"
      : direction === "down"
        ? "text-green-700"
        : "text-gray-500";

  return (
    <main className="min-h-screen bg-[#F0F5F0] px-4 py-6">
      <div className="mx-auto max-w-6xl space-y-4">
        <Link href="/" className="text-sm text-green-700">
          ← হোম পেজে ফিরে যান
        </Link>

        {/* Product details */}
        <section className="flex flex-col gap-4 rounded-2xl bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#F0F5F0] text-3xl">
              {product.image || product.categoryIcon || "🛒"}
            </div>

            <div>
              <h1 className="text-2xl font-bold">{product.nameBn}</h1>
              <p className="text-xs text-gray-500">
                প্রতি {unit} · {product.categoryNameBn}
              </p>
              <p className="mt-1 text-xs">
                গতকালের তুলনায় আজ দাম পরিবর্তন: {bn(diff)} টাকা
              </p>
            </div>
          </div>

          <div className="rounded-xl bg-[#F0F5F0] px-6 py-3 text-center">
            <p className="text-xs text-gray-500">আজকের দাম</p>
            <p className="text-4xl font-extrabold">{bn(product.today)}</p>
            <p className="text-xs text-gray-500">টাকা / {unit}</p>
            <p className={`text-xs font-bold ${color}`}>
              {arrow} {bn(Math.abs(Number(product.change?.pct ?? 0)))}%
            </p>
          </div>
        </section>

        {/* Price summary */}
        <section className="rounded-2xl bg-white p-5">
          <h2 className="text-sm font-bold">দামের সারসংক্ষেপ</h2>

          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            <div className="space-y-2 rounded-xl border border-gray-300 p-4">
              <p className="text-xs text-gray-500">সর্বনিম্ন দাম</p>
              <p className="text-xl font-bold text-green-700">
                {bn(lowest)} টাকা
              </p>
              <p className="text-xs text-gray-500">
                সব বাজারের মধ্যে সর্বনিম্ন
              </p>
            </div>

            <div className="space-y-2 rounded-xl border border-gray-300 p-4">
              <p className="text-xs text-gray-500">সর্বোচ্চ দাম</p>
              <p className="text-xl font-bold text-red-600">
                {bn(highest)} টাকা
              </p>
              <p className="text-xs text-gray-500">সব বাজারের মধ্যে সর্বোচ্চ</p>
            </div>

            <div className="space-y-2 rounded-xl border border-gray-300 p-4">
              <p className="text-xs text-gray-500">গড় দাম</p>
              <p className="text-xl font-bold text-green-700">
                {bn(average)} টাকা
              </p>
              <p className="text-xs text-gray-500">বাজারগুলোর গড়</p>
            </div>
          </div>
        </section>

        {/* Market table */}
        <section className="rounded-2xl border border-gray-300 bg-white p-5">
          <h2 className="text-sm font-bold">বাজারভিত্তিক আজকের দাম</h2>

          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-green-50 text-xs text-gray-500">
                  <th className="p-3 text-left">বাজার</th>
                  <th className="p-3 text-left">বিভাগ</th>
                  <th className="p-3 text-right">সর্বনিম্ন</th>
                  <th className="p-3 text-right">সর্বোচ্চ</th>
                  <th className="p-3 text-right">গড়</th>
                </tr>
              </thead>

              <tbody>
                {markets.map((m, i) => (
                  <tr key={`${m.market}-${i}`} className="border-b">
                    <td className="p-3 font-bold">{m.market}</td>
                    <td className="p-3">{m.division}</td>
                    <td className="p-3 text-right">{bn(m.min)} টাকা</td>
                    <td className="p-3 text-right">{bn(m.max)} টাকা</td>
                    <td className="p-3 text-right font-bold">
                      {bn((Number(m.min) + Number(m.max)) / 2)} টাকা
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <Link
          href={`/category/${product.category}`}
          className="inline-block text-sm text-green-700 hover:underline"
        >
          {product.image} সব {product.categoryNameBn}
        </Link>
      </div>
    </main>
  );
}
