
"use client";

import { useState } from "react";
import ProductCard from "@/app/components/product/ProductCard";
import type { Product } from "@/app/lib/api";

type ProductSectionsProps = {
  products: Product[];
};

export default function ProductSections({
  products,
}: ProductSectionsProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = Array.from(
    new Map(
      products.map((product) => [
        product.category,
        {
          slug: product.category,
          name: product.categoryNameBn,
          icon: product.categoryIcon,
        },
      ])
    ).values()
  );

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter(
          (product) => product.category === selectedCategory
        );

  const risingProducts = filteredProducts.filter(
    (product) => product.change.dir === "up"
  );

  const fallingProducts = filteredProducts.filter(
    (product) => product.change.dir === "down"
  );

  return (
    <div className="space-y-12">
      {/* Category Filter */}
      <section>
        <h2 className="mb-4 text-xl font-bold text-gray-800">
          ক্যাটাগরি অনুযায়ী পণ্য
        </h2>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setSelectedCategory("all")}
            aria-pressed={selectedCategory === "all"}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
              selectedCategory === "all"
                ? "border-[#078342] bg-[#078342] text-white"
                : "border-gray-200 bg-white text-gray-700 hover:border-[#078342]"
            }`}
          >
            সব পণ্য
          </button>

          {categories.map((category) => (
            <button
              key={category.slug}
              type="button"
              onClick={() => setSelectedCategory(category.slug)}
              aria-pressed={selectedCategory === category.slug}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                selectedCategory === category.slug
                  ? "border-[#078342] bg-[#078342] text-white"
                  : "border-gray-200 bg-white text-gray-700 hover:border-[#078342]"
              }`}
            >
              {category.icon} {category.name}
            </button>
          ))}
        </div>
      </section>

      {/* Rising Prices */}
      <section>
        <div className="mb-5">
          <h2 className="text-xl font-bold text-red-600">
            ▲ দাম বেড়েছে
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            নির্বাচিত ক্যাটাগরিতে দাম বৃদ্ধি পাওয়া পণ্য
          </p>
        </div>

        {risingProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {risingProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="rounded-xl border border-gray-200 bg-white p-5 text-sm text-gray-500">
            এই ক্যাটাগরিতে দাম বৃদ্ধি পাওয়া পণ্য নেই।
          </p>
        )}
      </section>

      {/* Falling Prices */}
      <section>
        <div className="mb-5">
          <h2 className="text-xl font-bold text-green-700">
            ▼ দাম কমেছে
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            নির্বাচিত ক্যাটাগরিতে দাম হ্রাস পাওয়া পণ্য
          </p>
        </div>

        {fallingProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {fallingProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="rounded-xl border border-gray-200 bg-white p-5 text-sm text-gray-500">
            এই ক্যাটাগরিতে দাম হ্রাস পাওয়া পণ্য নেই।
          </p>
        )}
      </section>

      {/* All Products */}
      <section id="সব-পণ্য">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-bold text-gray-800">
            সব পণ্য
          </h2>
          <span className="text-sm text-gray-500">
            মোট {filteredProducts.length.toLocaleString("bn-BD")}টি
          </span>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="rounded-xl border border-gray-200 bg-white p-5 text-sm text-gray-500">
            এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
          </p>
        )}
      </section>
    </div>
  );
}
