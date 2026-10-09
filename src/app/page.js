import Image from "next/image";
import Link from "next/link";
import Marquee from "./components/Marquee";

export default function Home() {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <main className="min-h-screen bg-[#F0F5F0]">
      <Marquee />
      <section className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
        <div className="overflow-hidden rounded-2xl border border-[#E3EBE3] bg-white shadow-sm">
          <div className="flex flex-col items-center gap-8 p-6 sm:p-8 md:p-10 lg:flex-row lg:justify-between lg:gap-12 lg:p-12">
            {/* Hero content */}
            <div className="w-full flex-1 space-y-5 text-center lg:text-left">
              <p className="mx-auto inline-flex w-fit items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-xs font-semibold text-[#05893E] sm:text-sm lg:mx-0">
                <span className="h-2 w-2 rounded-full bg-[#05893E]" />
                {date}
              </p>

              <h1 className="text-3xl leading-snug font-extrabold tracking-tight text-[#1D271F] sm:text-4xl lg:text-5xl lg:leading-tight">
                আজকের বাজারের দাম
                <span className="mt-1 block text-[#05893E]">এক নজরে</span>
              </h1>

              <p className="mx-auto max-w-2xl text-sm leading-7 text-[#1D271F]/70 sm:text-base lg:mx-0">
                চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
                বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক
                জায়গায়।
              </p>

              <div className="flex flex-col items-center gap-3 pt-2 sm:flex-row sm:justify-center lg:justify-start">
                <Link
                  href="/products"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#05893E] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#046F32] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#05893E] sm:w-auto"
                >
                  সব পণ্য দেখুন
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>

            {/* Hero image */}
            <div className="relative w-full max-w-md flex-1 lg:max-w-115">
              <div className="absolute inset-4 rounded-full bg-[#E7F4E8] blur-2xl" />

              <Image
                src="/bazar-hero.png"
                width={600}
                height={450}
                alt="বাজারের নিত্যপ্রয়োজনীয় পণ্য"
                priority
                className="relative h-auto w-full object-contain"
                sizes="(max-width: 1024px) 100vw, 460px"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
