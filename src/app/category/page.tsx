
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import Navbar from "@/app/components/layout/Navbar";
import PriceTicker from "@/app/components/layout/PriceTicker";
import CategoryProductList from "@/app/components/product/CategoryProductList";
import { getProducts } from "@/app/lib/api";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const products = await getProducts();
  const product = products.find((item) => item.category === slug);

  return {
    title: product
      ? `${product.categoryNameBn} পণ্য`
      : "ক্যাটাগরির পণ্য",
  };
}

export default async function CategoryPage({
  params,
}: CategoryPageProps) {
  const { slug } = await params;
  const products = await getProducts();

  const categoryProducts = products.filter(
    (product) => product.category === slug
  );

  if (categoryProducts.length === 0) {
    notFound();
  }

  const categoryName = categoryProducts[0].categoryNameBn;
  const categoryIcon = categoryProducts[0].categoryIcon;

  return (
    <>
      <Navbar />
      <PriceTicker />

      <main className="container-main py-10 sm:py-12">
        <Link
          href="/"
          className="text-sm font-semibold text-[#078342] hover:underline"
        >
          ← হোম পেজ
        </Link>

        <section className="mb-8 mt-6 rounded-2xl bg-[#e5f5e9] p-6 sm:p-8">
          <span className="text-4xl" aria-hidden="true">
            {categoryIcon}
          </span>

          <h1 className="mt-3 text-2xl font-extrabold text-gray-900 sm:text-3xl">
            {categoryName} পণ্যের বাজারদর
          </h1>

          <p className="mt-2 text-sm text-gray-600">
            {categoryName} ক্যাটাগরির পণ্যের বর্তমান দাম দেখুন এবং
            দাম অনুযায়ী সাজিয়ে নিন।
          </p>
        </section>

        <CategoryProductList products={categoryProducts} />
      </main>
    </>
  );
}
