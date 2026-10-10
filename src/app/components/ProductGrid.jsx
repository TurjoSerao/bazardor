"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";

export default function ProductGrid({ products }) {
  const [sort, setSort] = useState("default");

  const sortedProducts = [...products].sort((a, b) => {
    if (sort === "high") return Number(b.today) - Number(a.today);
    if (sort === "low") return Number(a.today) - Number(b.today);
    return 0;
  });

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="text-sm text-gray-500">
          মোট {products.length.toLocaleString("bn-BD")} টি পণ্য
        </p>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="rounded-lg border border-[#E5ECE5] bg-white px-3 py-2 text-sm text-[#1D271F] outline-none focus:border-green-600"
        >
          <option value="default">ডিফল্ট</option>
          <option value="high">দাম: বেশি থেকে কম</option>
          <option value="low">দাম: কম থেকে বেশি</option>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
