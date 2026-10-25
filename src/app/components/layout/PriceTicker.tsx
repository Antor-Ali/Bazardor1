
const prices = [
  { emoji: "🍚", name: "মিনিকেট চাল", price: "৭২ টাকা/কেজি", change: "▲ ২.১%", trend: "up" },
  { emoji: "🥔", name: "আলু", price: "৩৫ টাকা/কেজি", change: "▼ ১.৫%", trend: "down" },
  { emoji: "🧅", name: "পেঁয়াজ", price: "৬০ টাকা/কেজি", change: "▲ ৩.২%", trend: "up" },
  { emoji: "🥚", name: "ডিম", price: "১৪০ টাকা/ডজন", change: "▼ ২.০%", trend: "down" },
  { emoji: "🫘", name: "মসুর ডাল", price: "১২০ টাকা/কেজি", change: "— ০.০%", trend: "flat" },
  { emoji: "🌶️", name: "কাঁচা মরিচ", price: "৮০ টাকা/কেজি", change: "▲ ১.৮%", trend: "up" },
];

export default function PriceTicker() {
  return (
    <section
      aria-label="পণ্যের দামের আপডেট"
      className="overflow-hidden border-b border-[#e2eae2] bg-white"
    >
      <div className="flex h-12 items-center">
        <div className="z-10 flex h-full shrink-0 items-center gap-2 bg-[#078342] px-3 text-xs font-bold text-white sm:px-5">
          <span>●</span>
          <span>বাজার আপডেট</span>
        </div>

        <div className="ticker-mask min-w-0 flex-1">
          <div className="ticker-track flex w-max items-center">
            {[0, 1].map((copy) => (
              <div
                key={copy}
                aria-hidden={copy === 1}
                className="flex shrink-0 items-center"
              >
                {prices.map((item) => (
                  <div
                    key={`${copy}-${item.name}`}
                    className="flex shrink-0 items-center gap-2 border-r border-gray-100 px-4 text-xs sm:px-6"
                  >
                    <span className="text-base">{item.emoji}</span>

                    <span className="font-semibold text-gray-800">
                      {item.name}
                    </span>

                    <span className="whitespace-nowrap text-gray-500">
                      {item.price}
                    </span>

                    <span
                      className={`whitespace-nowrap font-bold ${
                        item.trend === "up"
                          ? "text-green-600"
                          : item.trend === "down"
                            ? "text-red-500"
                            : "text-gray-400"
                      }`}
                    >
                      {item.change}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
