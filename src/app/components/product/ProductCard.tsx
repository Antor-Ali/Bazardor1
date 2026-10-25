
import Link from "next/link";

type Product = {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  image: string;
  unit: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
};

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const price = product.today.toLocaleString("bn-BD");
  const change = product.change.pct.toLocaleString("bn-BD", {
    maximumFractionDigits: 1,
  });

  const trendColor =
    product.change.dir === "up"
      ? "text-red-600"
      : product.change.dir === "down"
        ? "text-green-700"
        : "text-gray-500";

  const trendIcon =
    product.change.dir === "up"
      ? "▲"
      : product.change.dir === "down"
        ? "▼"
        : "—";

  return (
    <article className="overflow-hidden rounded-xl border border-[#e2eae2] bg-white transition duration-200 hover:-translate-y-1 hover:shadow-md">
      <div className="flex h-36 items-center justify-center bg-[#f3f7f2]">
        <span className="text-6xl" role="img" aria-label={product.nameBn}>
          {product.image || product.categoryIcon || "🛒"}
        </span>
      </div>

      <div className="p-4">
        <span className="rounded-full bg-[#e5f5e9] px-2.5 py-1 text-xs font-semibold text-[#078342]">
          {product.categoryIcon} {product.categoryNameBn}
        </span>

        <h2 className="mt-3 min-h-12 text-base font-bold text-gray-800">
          {product.nameBn}
        </h2>

        <p className="mt-2 text-xs text-gray-500">আজকের বাজারদর</p>

        <p className="mt-1 text-2xl font-extrabold text-[#078342]">
          {price} <span className="text-sm font-semibold">টাকা</span>
          <span className="ml-1 text-sm font-medium text-gray-500">
            / {product.unit}
          </span>
        </p>

        <p className={`mt-2 text-sm font-semibold ${trendColor}`}>
          {trendIcon} {change}% 
          <span className="ml-1 font-normal text-gray-500">
            গতকালের তুলনায়
          </span>
        </p>

        <div className="mt-4 border-t border-gray-100 pt-3">
          <Link
            href={`/product/${product.slug}`}
            className="flex w-full items-center justify-center rounded-lg border border-[#078342] px-3 py-2 text-sm font-semibold text-[#078342] transition hover:bg-[#078342] hover:text-white"
          >
            বিস্তারিত দেখুন →
          </Link>
        </div>
      </div>
    </article>
  );
}
