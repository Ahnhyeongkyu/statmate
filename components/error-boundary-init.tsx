"use client";

import { useEffect } from "react";
import { setupGlobalErrorHandlers } from "@/lib/error-reporting";

/** Initializes global error handlers once on mount. Place in layout. */
export function ErrorBoundaryInit() {
  useEffect(() => {
    setupGlobalErrorHandlers();
  }, []);

  return null;
}
