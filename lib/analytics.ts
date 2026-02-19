type GTagEvent = {
  action: string;
  category: string;
  label?: string;
  value?: number;
};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function gtag(event: GTagEvent) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", event.action, {
    event_category: event.category,
    event_label: event.label,
    value: event.value,
  });
}

// Calculator events
export function trackCalculate(testType: string) {
  gtag({ action: "calculate", category: "calculator", label: testType });
}

export function trackLoadExample(testType: string) {
  gtag({ action: "load_example", category: "calculator", label: testType });
}

export function trackCopyResult(testType: string) {
  gtag({ action: "copy_result", category: "calculator", label: testType });
}

// Pro feature events
export function trackProCtaClick(source: string) {
  gtag({ action: "pro_cta_click", category: "conversion", label: source });
}

export function trackAiInterpret(testType: string) {
  gtag({ action: "ai_interpret", category: "pro_feature", label: testType });
}

export function trackWordExport(testType: string) {
  gtag({ action: "word_export", category: "pro_feature", label: testType });
}

// Sharing & export events
export function trackShareUrl(testType: string) {
  gtag({ action: "share_url", category: "calculator", label: testType });
}

export function trackPdfExport(testType: string) {
  gtag({ action: "pdf_export", category: "calculator", label: testType });
}

// Navigation events
export function trackPageView(path: string) {
  gtag({ action: "page_view", category: "navigation", label: path });
}

// A/B test events
export function trackABTestView(testId: string, variant: string) {
  gtag({ action: "ab_view", category: "ab_test", label: `${testId}_${variant}` });
}

export function trackABTestConversion(testId: string, variant: string, action: string) {
  gtag({ action: "ab_conversion", category: "ab_test", label: `${testId}_${variant}_${action}` });
}
