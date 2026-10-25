
"use client";

import { useMemo, useState } from "react";
import ProductCard from "@/app/components/product/ProductCard";
import type { Product } from "@/app/lib/api";

type Props = {
  products: Product[];
};

export default function CategoryProductList({ products }: Props) {
  const [sortOrder, setSortOrder] = useState("default");

  const sortedProducts = useMemo(() => {
    const result = [...products];

    if (sortOrder === "low-to-high") {
      result.sort((a, b) => a.today - b.today);
    }

    if (sortOrder === "high-to-low") {
      result.sort((a, b) => b.today - a.today);
    }

    return result;
  }, [products, sortOrder]);

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-gray-600">
          মোট {sortedProducts.length.toLocaleString("bn-BD")}টি পণ্য
        </p>

        <label className="flex items-center gap-2 text-sm text-gray-700">
          <span>দাম অনুযায়ী:</span>

          <select
            value={sortOrder}
            onChange={(event) => setSortOrder(event.target.value)}
            className="rounded-lg border border-gray-200 bg-white px-3 py-2 outline-none focus:border-[#078342]"
          >
            <option value="default">ডিফল্ট</option>
            <option value="low-to-high">কম থেকে বেশি</option>
            <option value="high-to-low">বেশি থেকে কম</option>
          </select>
        </label>
      </div>

      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-12 text-center">
          <p className="text-4xl">🛒</p>
          <h2 className="mt-3 text-lg font-bold text-gray-800">
            কোনো পণ্য পাওয়া যায়নি
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            এই ক্যাটাগরিতে বর্তমানে কোনো পণ্যের তথ্য নেই।
          </p>
        </div>
      )}
    </div>
  );
}
