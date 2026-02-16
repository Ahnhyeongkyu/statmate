"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useIsPro } from "@/components/activate-pro";
import { ActivateProModal } from "@/components/activate-pro";

const calculators = [
  { name: "T-Test", href: "/calculators/t-test" },
  { name: "ANOVA", href: "/calculators/anova" },
  { name: "Chi-Square", href: "/calculators/chi-square" },
  { name: "Correlation", href: "/calculators/correlation" },
  { name: "Descriptive", href: "/calculators/descriptive" },
];

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [showActivate, setShowActivate] = useState(false);
  const pathname = usePathname();
  const isPro = useIsPro();

  return (
    <div className="md:hidden">
      {/* Hamburger Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex h-10 w-10 items-center justify-center rounded-md text-gray-600 hover:bg-gray-100"
        aria-label={open ? "Close menu" : "Open menu"}
      >
        {open ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12h18M3 6h18M3 18h18" />
          </svg>
        )}
      </button>

      {/* Mobile Dropdown */}
      {open && (
        <div className="absolute left-0 right-0 top-16 z-50 border-b bg-white shadow-lg">
          <nav className="mx-auto max-w-6xl px-4 py-4">
            <div className="space-y-1">
              {calculators.map((calc) => (
                <Link
                  key={calc.href}
                  href={calc.href}
                  onClick={() => setOpen(false)}
                  className={`block rounded-md px-3 py-2.5 text-sm transition-colors ${
                    pathname === calc.href
                      ? "bg-blue-50 font-medium text-blue-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  {calc.name} Calculator
                </Link>
              ))}
            </div>
            <div className="mt-3 border-t pt-3">
              <Link
                href="/pricing"
                onClick={() => setOpen(false)}
                className="block rounded-md px-3 py-2.5 text-sm text-gray-600 hover:bg-gray-50"
              >
                Pricing
              </Link>
              {isPro ? (
                <div className="mt-2 rounded-full bg-green-50 px-4 py-2.5 text-center text-sm font-medium text-green-700">
                  Pro Active
                </div>
              ) : (
                <>
                  <Link
                    href="/pricing"
                    onClick={() => setOpen(false)}
                    className="mt-2 block rounded-full bg-blue-600 px-4 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700"
                  >
                    Get Pro
                  </Link>
                  <button
                    onClick={() => {
                      setOpen(false);
                      setShowActivate(true);
                    }}
                    className="mt-2 block w-full text-center text-xs text-gray-400 hover:text-gray-600"
                  >
                    Have a license key? Activate here
                  </button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}

      <ActivateProModal
        open={showActivate}
        onClose={() => setShowActivate(false)}
      />
    </div>
  );
}
