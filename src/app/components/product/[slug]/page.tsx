
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowDown,
  ArrowUp,
  MapPin,
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react";

import Navbar from "@/app/components/layout/Navbar";
import PriceTicker from "@/app/components/layout/PriceTicker";
import { getProductBySlug } from "@/app/lib/api";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function formatPrice(price: number) {
  return price.toLocaleString("bn-BD");
}

export default async function ProductDetailsPage({
  params,
}: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const difference = product.today - product.yesterday;

  const trendColor =
    product.change.dir === "up"
      ? "text-red-600"
      : product.change.dir === "down"
        ? "text-green-700"
        : "text-gray-500";

  const TrendIcon =
    product.change.dir === "up"
      ? TrendingUp
      : product.change.dir === "down"
        ? TrendingDown
        : Minus;

  const priceHistory = [
    { label: "আজকের দাম", price: product.today },
    { label: "গতকালের দাম", price: product.yesterday },
    { label: "গত সপ্তাহের দাম", price: product.lastWeek },
    { label: "গত মাসের দাম", price: product.lastMonth },
  ];

  return (
    <>
      <Navbar />
      <PriceTicker />

      <main className="container-main py-8 sm:py-12">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#078342] hover:underline"
        >
          <ArrowLeft size={18} />
          সব পণ্যে ফিরে যান
        </Link>

        {/* Product overview */}
        <section className="grid gap-6 md:grid-cols-2">
          <div className="flex min-h-64 items-center justify-center rounded-2xl border border-[#e2eae2] bg-white sm:min-h-80">
            <span
              className="text-8xl sm:text-9xl"
              role="img"
              aria-label={product.nameBn}
            >
              {product.image || product.categoryIcon || "🛒"}
            </span>
          </div>

          <div className="flex flex-col justify-center rounded-2xl border border-[#e2eae2] bg-white p-6 sm:p-8">
            <Link
              href={`/category/${product.category}`}
              className="w-fit rounded-full bg-[#e5f5e9] px-3 py-1 text-sm font-semibold text-[#078342]"
            >
              {product.categoryIcon} {product.categoryNameBn}
            </Link>

            <h1 className="mt-4 text-3xl font-extrabold text-gray-900 sm:text-4xl">
              {product.nameBn}
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              পণ্যের বিস্তারিত ও বাজারদর
            </p>

            <p className="mt-6 text-sm text-gray-500">
              বর্তমান বাজারদর
            </p>

            <p className="mt-1 text-4xl font-extrabold text-[#078342]">
              {formatPrice(product.today)}
              <span className="ml-2 text-base font-semibold">
                টাকা / {product.unit}
              </span>
            </p>

            <div className={`mt-4 flex items-center gap-2 ${trendColor}`}>
              <TrendIcon size={20} />

              <span className="font-bold">
                {product.change.dir === "up"
                  ? "দাম বেড়েছে"
                  : product.change.dir === "down"
                    ? "দাম কমেছে"
                    : "দামের পরিবর্তন নেই"}
              </span>

              <span className="text-sm">
                ({formatPrice(product.change.pct)}%)
              </span>
            </div>

            <p className="mt-3 text-sm text-gray-600">
              গতকালের তুলনায়{" "}
              <span className="font-bold">
                {difference > 0
                  ? `${formatPrice(difference)} টাকা বেড়েছে`
                  : difference < 0
                    ? `${formatPrice(Math.abs(difference))} টাকা কমেছে`
                    : "দামের পরিবর্তন হয়নি"}
              </span>
            </p>
          </div>
        </section>

        {/* Price history */}
        <section className="mt-10">
          <h2 className="text-2xl font-extrabold text-gray-900">
            দামের ইতিহাস
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            বিভিন্ন সময়ের রেকর্ড করা দাম তুলনা করুন।
          </p>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {priceHistory.map((item, index) => (
              <article
                key={item.label}
                className="rounded-xl border border-[#e2eae2] bg-white p-5"
              >
                <p className="text-sm text-gray-500">
                  {item.label}
                </p>

                <p className="mt-2 text-2xl font-extrabold text-gray-900">
                  {formatPrice(item.price)}
                  <span className="ml-1 text-sm font-medium">
                    টাকা
                  </span>
                </p>

                <p className="mt-2 text-xs text-gray-500">
                  প্রতি {product.unit}
                </p>

                {index > 0 && (
                  <p
                    className={`mt-3 text-sm font-semibold ${
                      product.today > item.price
                        ? "text-red-600"
                        : product.today < item.price
                          ? "text-green-700"
                          : "text-gray-500"
                    }`}
                  >
                    {product.today > item.price ? (
                      <ArrowUp className="mr-1 inline" size={15} />
                    ) : product.today < item.price ? (
                      <ArrowDown className="mr-1 inline" size={15} />
                    ) : null}
                    {formatPrice(Math.abs(product.today - item.price))} টাকা
                    {product.today > item.price
                      ? " বেশি"
                      : product.today < item.price
                        ? " কম"
                        : " পার্থক্য নেই"}
                  </p>
                )}
              </article>
            ))}
          </div>
        </section>

        {/* Market prices */}
        <section className="mt-10">
          <div className="flex items-center gap-3">
            <MapPin className="text-[#078342]" size={25} />

            <div>
              <h2 className="text-2xl font-extrabold text-gray-900">
                বিভিন্ন বাজারের দাম
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                বাজারভেদে সর্বনিম্ন ও সর্বোচ্চ দাম।
              </p>
            </div>
          </div>

          <div className="mt-5 overflow-x-auto rounded-xl border border-[#e2eae2] bg-white">
            <table className="w-full min-w-[540px] text-left text-sm">
              <thead className="bg-[#e5f5e9] text-gray-800">
                <tr>
                  <th className="px-5 py-4 font-bold">বাজারের নাম</th>
                  <th className="px-5 py-4 font-bold">বিভাগ</th>
                  <th className="px-5 py-4 font-bold">সর্বনিম্ন</th>
                  <th className="px-5 py-4 font-bold">সর্বোচ্চ</th>
                </tr>
              </thead>

              <tbody>
                {product.markets?.map((market, index) => (
                  <tr
                    key={`${market.market}-${index}`}
                    className="border-t border-gray-100"
                  >
                    <td className="px-5 py-4 font-semibold text-gray-800">
                      {market.market}
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      {market.division}
                    </td>

                    <td className="px-5 py-4 font-semibold text-green-700">
                      {formatPrice(market.min)} টাকা
                    </td>

                    <td className="px-5 py-4 font-semibold text-red-600">
                      {formatPrice(market.max)} টাকা
                    </td>
                  </tr>
                ))}

                {(!product.markets || product.markets.length === 0) && (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-5 py-8 text-center text-gray-500"
                    >
                      এই পণ্যের বাজারভিত্তিক তথ্য পাওয়া যায়নি।
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Back button */}
        <div className="mt-10 text-center">
          <Link href="/" className="btn-primary">
            <ArrowLeft size={18} />
            সব পণ্য দেখুন
          </Link>
        </div>
      </main>
    </>
  );
}
