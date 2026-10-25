
import Navbar from "@/app/components/layout/Navbar";
import PriceTicker from "@/app/components/layout/PriceTicker";
import ProductCard from "@/app/components/product/ProductCard";
import { getProducts } from "@/app/lib/api";

export default async function HomePage() {
  const products = await getProducts();

  return (
    <>
      <Navbar />
      <PriceTicker />

      <main>
        <section className="container-main py-12">
          <div className="mb-8">
            <span className="text-sm font-bold text-[#078342]">
              বাংলাদেশের বাজারদর
            </span>

            <h1 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
              আজকের পণ্যের দাম
            </h1>

            <p className="mt-3 text-sm text-gray-600 sm:text-base">
              নিত্যপ্রয়োজনীয় পণ্যের দাম দেখুন এক জায়গায়।
            </p>
          </div>

          <div
            id="সব-পণ্য"
            className="mb-5 flex items-center justify-between gap-3"
          >
            <h2 className="text-xl font-bold text-gray-800">
              সব পণ্য
            </h2>

            <span className="text-sm text-gray-500">
              মোট {products.length.toLocaleString("bn-BD")}টি পণ্য
            </span>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          ) : (
            <p className="rounded-xl border border-gray-200 bg-white p-8 text-center text-gray-600">
              এখন কোনো পণ্যের তথ্য পাওয়া যায়নি।
            </p>
          )}
        </section>
      </main>
    </>
  );
}
