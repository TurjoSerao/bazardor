import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4 py-16">
      <div className="w-full max-w-xl text-center">
        {/* 404 Illustration */}
        <div className="relative mx-auto mb-8 flex h-40 w-40 items-center justify-center rounded-full bg-[#05893E]/10">
          <div className="flex h-28 w-28 items-center justify-center rounded-full bg-[#05893E] text-5xl shadow-lg">
            🛒
          </div>

          <span className="absolute -right-1 top-3 rounded-full bg-base-100 px-3 py-2 text-2xl shadow">
            ?
          </span>
        </div>

        {/* Error Message */}
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-[#05893E]">
          Error 404
        </p>

        <h1 className="mb-4 text-3xl font-extrabold tracking-tight sm:text-5xl">
          পৃষ্ঠাটি খুঁজে পাওয়া যায়নি!
        </h1>

        <p className="mx-auto mb-8 max-w-md text-base leading-7 text-base-content/70">
          দুঃখিত! আপনি যে পৃষ্ঠাটি খুঁজছেন সেটি পাওয়া যাচ্ছে না। হয়তো লিংকটি
          ভুল, অথবা পৃষ্ঠাটি সরিয়ে ফেলা হয়েছে।
        </p>

        {/* Actions */}
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="btn border-none bg-[#05893E] text-white hover:bg-[#047533]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m12 19-7-7 7-7" />
              <path d="M19 12H5" />
            </svg>
            হোমপেজে ফিরে যান
          </Link>

          <Link href="/all-products" className="btn btn-outline">
            পণ্য দেখুন
          </Link>
        </div>

        {/* Branding */}
        <p className="mt-12 text-sm text-base-content/50">
          বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে
        </p>
      </div>
    </main>
  );
}
