
import Navbar from "@/app/components/layout/Navbar";
import PriceTicker from "@/app/components/layout/PriceTicker";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <PriceTicker />

      <main className="container-main py-12">
        <h1 className="text-3xl font-bold text-[#078342]">
          বাজার দর
        </h1>

        <p className="mt-3 text-gray-600">
          নিত্যপ্রয়োজনীয় পণ্যের দাম এক নজরে।
        </p>
      </main>
    </>
  );
}
