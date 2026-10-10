import Image from "next/image";
import Link from "next/link";
import Marquee from "@/app/components/Marquee";
import ProductSection from "@/app/components/ProductSection";

async function getProducts() {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products",
    { next: { revalidate: 300 } },
  );

  if (!res.ok) throw new Error("Failed to fetch products");

  return res.json();
}

export default async function Home() {
  const products = await getProducts();

  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
    timeZone: "Asia/Dhaka",
  });

  const increasedProducts = products
    .filter((p) => p.change?.dir === "up")
    .sort((a, b) => Number(b.change?.pct ?? 0) - Number(a.change?.pct ?? 0))
    .slice(0, 6);

  const decreasedProducts = products
    .filter((p) => p.change?.dir === "down")
    .sort((a, b) => Number(a.change?.pct ?? 0) - Number(b.change?.pct ?? 0))
    .slice(0, 6);

  return (
    <main className="min-h-screen bg-[#F0F5F0]">
      <Marquee />

      {/* Hero Banner */}
      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
        <div className="flex flex-col items-center gap-8 rounded-2xl border border-[#E3EBE3] bg-white p-6 shadow-sm sm:p-8 lg:flex-row lg:p-12">
          <div className="flex-1 space-y-5 text-center lg:text-left">
            <p className="mx-auto w-fit rounded-full bg-green-50 px-4 py-2 text-sm font-semibold text-[#05893E] lg:mx-0">
              ● {date}
            </p>

            <h1 className="text-3xl font-extrabold text-[#1D271F] sm:text-4xl lg:text-5xl">
              আজকের বাজারের দাম
              <span className="mt-2 block text-[#05893E]">এক নজরে</span>
            </h1>

            <p className="text-sm leading-7 text-gray-600 sm:text-base">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারদর এবং
              দামের পরিবর্তন জানুন এক জায়গায়।
            </p>

            <div className="flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
              <Link
                href="/all-products"
                className="rounded-lg bg-[#05893E] px-6 py-3 text-sm font-semibold text-white hover:bg-[#046F32]"
              >
                সব পণ্য দেখুন →
              </Link>
            </div>

            <p className="text-xs text-gray-500">
              প্রতিদিনের বাজারদর জানুন, সচেতনভাবে কেনাকাটা করুন।
            </p>
          </div>

          <div className="w-full max-w-md flex-1">
            <Image
              src="/bazar-hero.png"
              width={600}
              height={450}
              alt="বাজারের নিত্যপ্রয়োজনীয় পণ্য"
              priority
              className="h-auto w-full object-contain"
              sizes="(max-width: 1024px) 100vw, 460px"
            />
          </div>
        </div>
      </section>

      {/* Products */}
      <div className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <ProductSection
          title="আজ যেসব পণ্যের দাম বেড়েছে"
          products={increasedProducts}
          type="up"
        />

        <ProductSection
          title="আজ যেসব পণ্যের দাম কমেছে"
          products={decreasedProducts}
          type="down"
        />

        <ProductSection title="সব পণ্য" products={products} type="all" />
      </div>
    </main>
  );
}
