
import Navbar from "@/app/components/layout/Navbar";
import PriceTicker from "@/app/components/layout/PriceTicker";
import ProductSections from "@/app/components/product/ProductSections";
import { getProducts } from "@/app/lib/api";

export default async function HomePage() {
  const products = await getProducts();

  return (
    <>
      <Navbar />
      <PriceTicker />

      <main>
        <section className="container-main py-12">
          <div className="mb-10 rounded-2xl bg-gradient-to-r from-[#e5f5e9] to-white p-6 sm:p-10">
            <span className="text-sm font-bold text-[#078342]">
              বাংলাদেশের বাজারদর
            </span>

            <h1 className="mt-3 max-w-2xl text-3xl font-extrabold leading-tight text-gray-900 sm:text-5xl">
              প্রতিদিনের বাজারদর,
              <span className="block text-[#078342]">
                এখন এক জায়গায়
              </span>
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-7 text-gray-600 sm:text-base">
              নিত্যপ্রয়োজনীয় পণ্যের দাম দেখুন এবং আগের দামের সঙ্গে
              তুলনা করে বাজারের পরিবর্তন সম্পর্কে জানুন।
            </p>

            <a
              href="#সব-পণ্য"
              className="mt-6 inline-flex rounded-lg bg-[#078342] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#056b35]"
            >
              পণ্যের দাম দেখুন →
            </a>
          </div>

          <ProductSections products={products} />
        </section>
      </main>
    </>
  );
}
