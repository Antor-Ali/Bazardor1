
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, TrendingDown, TrendingUp } from "lucide-react";

import Navbar from "@/app/components/layout/Navbar";
import PriceTicker from "@/app/components/layout/PriceTicker";
import { getProductBySlug } from "@/app/lib/api";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProductDetailsPage({
  params,
}: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const prices = [
    { label: "আজকের দাম", value: product.today },
    { label: "গতকালের দাম", value: product.yesterday },
    { label: "গত সপ্তাহের দাম", value: product.lastWeek },
    { label: "গত মাসের দাম", value: product.lastMonth },
  ];

  const trendUp = product.change.dir === "up";
  const trendDown = product.change.dir === "down";

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

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="flex min-h-64 items-center justify-center rounded-2xl border border-[#e2eae2] bg-white p-8 sm:min-h-80">
            <span
              className="text-8xl sm:text-9xl"
              role="img"
              aria-label={product.nameBn}
            >
              {product.image || product.categoryIcon}
            </span>
          </div>

          <div className="rounded-2xl border border-[#e2eae2] bg-white p-6 sm:p-8">
            <span className="rounded-full bg-[#e5f5e9] px-3 py-1 text-sm font-semibold text-[#078342]">
              {product.categoryIcon} {product.categoryNameBn}
            </span>

            <h1 className="mt-4 text-2xl font-extrabold text-gray-900 sm:text-3xl">
              {product.nameBn}
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              একক: {product.unit}
            </p>

            <p className="mt-6 text-sm text-gray-500">
              আজকের বাজারদর
            </p>

            <p className="mt-1 text-4xl font-extrabold text-[#078342]">
              {product.today.toLocaleString("bn-BD")}
              <span className="ml-2 text-base font-semibold">
                টাকা / {product.unit}
              </span>
            </p>

            <div
              className={`mt-4 flex items-center gap-2 text-sm font-semibold ${
                trendUp
                  ? "text-red-600"
                  : trendDown
                    ? "text-green-700"
                    : "text-gray-500"
              }`}
            >
              {trendUp ? (
                <TrendingUp size={19} />
              ) : trendDown ? (
                <TrendingDown size={19} />
              ) : null}

              {product.change.pct.toLocaleString("bn-BD", {
                maximumFractionDigits: 1,
              })}
              % গতকালের তুলনায়
            </div>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="mb-4 text-xl font-bold text-gray-900">
            আগের দামের তুলনা
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {prices.map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-[#e2eae2] bg-white p-5"
              >
                <p className="text-sm text-gray-500">{item.label}</p>
                <p className="mt-2 text-2xl font-bold text-gray-900">
                  {item.value.toLocaleString("bn-BD")}
                  <span className="ml-1 text-sm font-medium">টাকা</span>
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  প্রতি {product.unit}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="mb-2 text-xl font-bold text-gray-900">
            বিভিন্ন বাজারের দাম
          </h2>

          <p className="mb-5 text-sm text-gray-500">
            বাজার ও বিভাগ অনুযায়ী সর্বনিম্ন এবং সর্বোচ্চ দাম।
          </p>

          <div className="overflow-x-auto rounded-xl border border-[#e2eae2] bg-white">
            <table className="w-full min-w-[540px] text-left text-sm">
              <thead className="bg-[#e5f5e9] text-gray-700">
                <tr>
                  <th className="p-4 font-bold">বাজার</th>
                  <th className="p-4 font-bold">বিভাগ</th>
                  <th className="p-4 font-bold">সর্বনিম্ন</th>
                  <th className="p-4 font-bold">সর্বোচ্চ</th>
                </tr>
              </thead>

              <tbody>
                {product.markets.map((market, index) => (
                  <tr
                    key={`${market.market}-${index}`}
                    className="border-t border-gray-100"
                  >
                    <td className="p-4 font-medium text-gray-800">
                      {market.market}
                    </td>
                    <td className="p-4 text-gray-600">
                      {market.division}
                    </td>
                    <td className="p-4 font-semibold text-[#078342]">
                      {market.min.toLocaleString("bn-BD")} টাকা
                    </td>
                    <td className="p-4 font-semibold text-gray-800">
                      {market.max.toLocaleString("bn-BD")} টাকা
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </>
  );
}
