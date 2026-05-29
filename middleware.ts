import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: [
    // Match all pathnames except for
    // - /api (API routes)
    // - /_next (Next.js internals)
    // - /_vercel (Vercel internals)
    // - /monitoring (Vercel monitoring)
    // - /embed (locale-agnostic embeddable widgets — own root layout)
    // - Static files (favicon, sitemap, robots, etc.)
    "/((?!api|_next|_vercel|monitoring|embed|.*\\..*).*)",
  ],
};
