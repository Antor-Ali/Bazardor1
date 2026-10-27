
"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, ShoppingBasket, X } from "lucide-react";
import AuthStatus from "@/app/components/layout/AuthStatus";

const categories = [
  { name: "সব পণ্য", href: "/#সব-পণ্য" },
  { name: "চাল", href: "/category/chal" },
  { name: "ডাল", href: "/category/dal" },
  { name: "সবজি", href: "/category/shobji" },
  { name: "মাছ", href: "/category/mach" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const today = new Date().toLocaleDateString("bn-BD", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="sticky top-0 z-50 border-b border-[#e2eae2] bg-white">
      <div className="container-main">
        <div className="flex min-h-[76px] items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e5f5e9] text-[#078342]">
              <ShoppingBasket size={25} />
            </span>

            <span>
              <span className="block text-lg font-extrabold text-[#078342]">
                বাজার দর
              </span>
              <span className="block text-xs text-gray-500">
                {today}
              </span>
            </span>
          </Link>

          {/* Desktop authentication */}
          <div className="hidden items-center gap-3 md:flex">
            <Link
              href="/signin"
              className="rounded-lg px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100"
            >
              সাইন ইন
            </Link>

            <Link
              href="/signup"
              className="rounded-lg bg-[#078342] px-4 py-2 text-sm font-semibold text-white hover:bg-[#056b35]"
            >
              সাইন আপ
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "মেনু বন্ধ করুন" : "মেনু খুলুন"}
            aria-expanded={menuOpen}
            className="rounded-lg border border-gray-200 p-2 md:hidden"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Category navigation */}
        <nav
          aria-label="প্রধান নেভিগেশন"
          className="hidden items-center gap-7 overflow-x-auto border-t border-gray-100 md:flex"
        >
          {categories.map((category, index) => (
            <Link
              key={category.name}
              href={category.href}
              className={`relative shrink-0 py-3 text-sm font-medium transition ${
                index === 0
                  ? "text-[#078342] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-[#078342]"
                  : "text-gray-600 hover:text-[#078342]"
              }`}
            >
              {category.name}
            </Link>
          ))}
        </nav>

        {/* Mobile navigation */}
        {menuOpen && (
          <div className="border-t border-gray-100 py-3 md:hidden">
            <nav className="flex flex-col gap-1">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={category.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-[#e5f5e9] hover:text-[#078342]"
                >
                  {category.name}
                </Link>
              ))}

              <div className="mt-2 grid grid-cols-2 gap-2 border-t border-gray-100 pt-3">
                <Link
                  href="/signin"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg border border-gray-200 px-3 py-2 text-center text-sm font-semibold"
                >
                  সাইন ইন
                </Link>

                <Link
                  href="/signup"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg bg-[#078342] px-3 py-2 text-center text-sm font-semibold text-white"
                >
                  সাইন আপ
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
