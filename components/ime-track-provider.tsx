"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { init, landingView } from "@/lib/imeTrack";

export function ImeTrackProvider() {
  const pathname = usePathname();

  useEffect(() => {
    init({ debug: process.env.NODE_ENV !== "production" });
  }, []);

  useEffect(() => {
    if (!pathname) return;
    landingView(pathname);
  }, [pathname]);

  return null;
}
