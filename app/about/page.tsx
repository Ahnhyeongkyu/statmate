import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About",
  description:
    "StatMate is a free online statistics calculator built by statisticians for researchers. Calculate t-tests, ANOVA, chi-square, correlation, and more with APA-formatted results.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl py-8">
      <h1 className="text-3xl font-bold text-gray-900">About StatMate</h1>

      <div className="mt-8 space-y-6 text-gray-600 leading-relaxed">
        <p>
          <strong className="text-gray-900">StatMate</strong> is a free online
          statistics calculator designed for researchers, graduate students, and
          anyone who needs quick, accurate statistical analysis with
          publication-ready results.
        </p>

        <h2 className="text-xl font-semibold text-gray-900">Our Mission</h2>
        <p>
          We believe statistical analysis should be accessible to everyone.
          Whether you&apos;re writing your first research paper or your
          hundredth, StatMate helps you get accurate results formatted in APA
          7th edition style — no expensive software required.
        </p>

        <h2 className="text-xl font-semibold text-gray-900">
          What Makes StatMate Different
        </h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>APA-Ready:</strong> Results are automatically formatted
            following APA 7th edition guidelines. Copy and paste directly into
            your paper.
          </li>
          <li>
            <strong>Privacy First:</strong> All calculations run in your browser.
            Your raw data never leaves your device.
          </li>
          <li>
            <strong>Built by Statisticians:</strong> Every calculator is built
            and verified by statistics professionals with years of research
            experience.
          </li>
          <li>
            <strong>Always Free:</strong> Core calculators are free forever. No
            sign-up required.
          </li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-900">
          Available Calculators
        </h2>
        <ul className="list-disc space-y-1 pl-6">
          <li>Independent & Paired Samples T-Test</li>
          <li>One-Way ANOVA with Bonferroni Post-Hoc</li>
          <li>Chi-Square Test of Independence & Goodness-of-Fit</li>
          <li>Pearson & Spearman Correlation</li>
          <li>Descriptive Statistics</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-900">Contact</h2>
        <p>
          Have feedback, found a bug, or want to request a new calculator?
          We&apos;d love to hear from you.
        </p>
        <p>
          Email:{" "}
          <a
            href="mailto:contact.statmate@gmail.com"
            className="text-blue-600 hover:underline"
          >
            contact.statmate@gmail.com
          </a>
        </p>
      </div>

      <div className="mt-12">
        <Link href="/calculators/t-test">
          <Button>Try a Calculator</Button>
        </Link>
      </div>
    </div>
  );
}
