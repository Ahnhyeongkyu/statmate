"use client";

/**
 * CMP-129: Track B pricing variant switcher.
 *
 * Renders control (legacy $5.99/mo) or track_b_v1 ($9.99/mo / $59/yr) based
 * on eligibility. Existing paid users always see control.
 * Fires pricing_variant_view via imeTrack on mount.
 */

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getPricingArm, isExistingPaidUser, type PricingArm } from "@/lib/pricing-eligibility";
import { track } from "@/lib/imeTrack";

// Checkout URLs — env vars let the chairman hot-swap LS products without a deploy.
// Falls back to the current live URLs so the page is never broken.
const CHECKOUT_URLS = {
  // Track B — new $9.99/mo and $59/yr products (chairman creates in LS dashboard)
  trackB: {
    monthly:
      process.env.NEXT_PUBLIC_LS_MONTHLY_V2 ||
      "https://statmate.lemonsqueezy.com/checkout/buy/e4313d17-ad33-432b-87a1-d53d01fb2ebb?embed=1",
    annual:
      process.env.NEXT_PUBLIC_LS_ANNUAL_V2 ||
      "https://statmate.lemonsqueezy.com/checkout/buy/11ac7ea9-a760-42bd-b500-137699a9f339?embed=1",
  },
  // Control — existing live products (unchanged)
  control: {
    monthly:
      "https://statmate.lemonsqueezy.com/checkout/buy/e4313d17-ad33-432b-87a1-d53d01fb2ebb?embed=1",
    annual:
      "https://statmate.lemonsqueezy.com/checkout/buy/11ac7ea9-a760-42bd-b500-137699a9f339?embed=1",
  },
} as const;

interface PricingCtaProps {
  /** Whether this is the highlighted (most-popular) card */
  highlight?: boolean;
  /** CTA label text */
  label: string;
  /** data-ime-cta value for click tracking */
  imeCta: string;
}

/** Control-arm CTA button (legacy $5.99/mo) */
export function ControlMonthlyCta({ highlight, label, imeCta }: PricingCtaProps) {
  return (
    <a href={CHECKOUT_URLS.control.monthly} data-ime-cta={imeCta} className="mt-6 block">
      <Button
        variant={highlight ? "default" : "outline"}
        className={`w-full ${highlight ? "bg-blue-600 hover:bg-blue-700" : ""}`}
      >
        {label}
      </Button>
    </a>
  );
}

/** Control-arm CTA button (legacy $4.99/mo annual) */
export function ControlAnnualCta({ highlight, label, imeCta }: PricingCtaProps) {
  return (
    <a href={CHECKOUT_URLS.control.annual} data-ime-cta={imeCta} className="mt-6 block">
      <Button variant={highlight ? "default" : "outline"} className="w-full">
        {label}
      </Button>
    </a>
  );
}

/** Track B — $9.99/mo CTA */
export function TrackBMonthlyCta({ highlight, label, imeCta }: PricingCtaProps) {
  return (
    <a href={CHECKOUT_URLS.trackB.monthly} data-ime-cta={imeCta} className="mt-6 block">
      <Button
        variant={highlight ? "default" : "outline"}
        className={`w-full ${highlight ? "bg-blue-600 hover:bg-blue-700" : ""}`}
      >
        {label}
      </Button>
    </a>
  );
}

/** Track B — $59/yr CTA */
export function TrackBAnnualCta({ highlight, label, imeCta }: PricingCtaProps) {
  return (
    <a href={CHECKOUT_URLS.trackB.annual} data-ime-cta={imeCta} className="mt-6 block">
      <Button variant={highlight ? "default" : "outline"} className="w-full">
        {label}
      </Button>
    </a>
  );
}

/** 3-rung pricing card set for Track B variant */
interface TrackBPlanGridProps {
  labels: {
    freeName: string;
    freeDesc: string;
    freeCta: string;
    freeCtaHref: string;
    monthlyName: string;
    monthlyDesc: string;
    monthlyCta: string;
    annualName: string;
    annualDesc: string;
    annualCta: string;
    annualSubtext?: string;
    mostPopular: string;
    freeFeatures: string[];
    proFeatures: string[];
  };
}

export function TrackBPlanGrid({ labels }: TrackBPlanGridProps) {
  return (
    <div className="mt-12 grid w-full max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
      {/* Free */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
        <h3 className="text-lg font-semibold">{labels.freeName}</h3>
        <p className="mt-1 text-sm text-gray-500">{labels.freeDesc}</p>
        <div className="mt-4">
          <span className="text-4xl font-bold">$0</span>
        </div>
        <ul className="mt-4 space-y-2 text-sm">
          {labels.freeFeatures.map((f, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="mt-0.5 shrink-0 text-green-600">✓</span>
              {f}
            </li>
          ))}
        </ul>
        <a href={labels.freeCtaHref} data-ime-cta="pricing-tb-free" className="mt-6 block">
          <Button variant="outline" className="w-full">{labels.freeCta}</Button>
        </a>
      </div>

      {/* Pro Monthly — highlighted */}
      <div className="relative rounded-xl border-2 border-blue-500 bg-white p-6 shadow-lg dark:bg-gray-900">
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge className="bg-blue-600 text-white">{labels.mostPopular}</Badge>
        </div>
        <h3 className="text-lg font-semibold">{labels.monthlyName}</h3>
        <p className="mt-1 text-sm text-gray-500">{labels.monthlyDesc}</p>
        <div className="mt-4">
          <span className="text-4xl font-bold">$9.99</span>
          <span className="text-gray-500">/mo</span>
        </div>
        <ul className="mt-4 space-y-2 text-sm">
          {labels.proFeatures.map((f, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="mt-0.5 shrink-0 text-green-600">✓</span>
              {f}
            </li>
          ))}
        </ul>
        <TrackBMonthlyCta highlight label={labels.monthlyCta} imeCta="pricing-tb-monthly" />
      </div>

      {/* Annual */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
        <h3 className="text-lg font-semibold">{labels.annualName}</h3>
        <p className="mt-1 text-sm text-gray-500">{labels.annualDesc}</p>
        <div className="mt-4">
          <span className="text-4xl font-bold">$59</span>
          <span className="text-gray-500">/yr</span>
        </div>
        {labels.annualSubtext && (
          <p className="mt-1 text-xs font-medium text-green-600">{labels.annualSubtext}</p>
        )}
        <ul className="mt-4 space-y-2 text-sm">
          {labels.proFeatures.map((f, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="mt-0.5 shrink-0 text-green-600">✓</span>
              {f}
            </li>
          ))}
        </ul>
        <TrackBAnnualCta highlight={false} label={labels.annualCta} imeCta="pricing-tb-annual" />
      </div>
    </div>
  );
}

/**
 * Client component that fires the pricing_variant_view event on mount
 * and exposes the resolved arm to children via a render prop.
 */
export function PricingVariantProvider({
  children,
}: {
  children: (arm: PricingArm) => React.ReactNode;
}) {
  const [arm, setArm] = useState<PricingArm>("track_b_v1"); // SSR default = variant

  useEffect(() => {
    const resolved = getPricingArm();
    setArm(resolved);
    const paid = isExistingPaidUser();
    track("pricing_variant_view", {
      variant: "cmp129_track_b_v1",
      arm: resolved,
      eligible: !paid,
      existing_paid: paid,
    });
  }, []);

  return <>{children(arm)}</>;
}
