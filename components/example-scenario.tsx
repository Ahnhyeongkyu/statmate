"use client";

import { Card, CardContent } from "@/components/ui/card";

interface ExampleScenarioProps {
  scenario: string | null;
  onDismiss: () => void;
}

export function ExampleScenario({ scenario, onDismiss }: ExampleScenarioProps) {
  if (!scenario) return null;

  return (
    <Card className="border-amber-200 bg-amber-50">
      <CardContent className="py-3">
        <div className="flex items-start gap-2">
          <div className="flex-1">
            <p className="text-sm leading-relaxed text-amber-900">{scenario}</p>
          </div>
          <button
            onClick={onDismiss}
            className="shrink-0 text-amber-400 hover:text-amber-600"
            aria-label="Dismiss"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
