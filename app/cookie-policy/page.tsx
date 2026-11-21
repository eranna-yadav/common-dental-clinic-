import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/LegalPage";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = buildMetadata({ title: "Cookie Policy", description: `How ${site.name} uses cookies and similar technologies.`, path: "/cookie-policy" });

export default function CookiePage() {
  return (
    <LegalPage title="Cookie Policy" path="/cookie-policy" updated="1 November 2026">
      <p>Cookies are small files stored on your device. We keep their use to a minimum.</p>
      <h2>Essential storage (always on)</h2>
      <ul>
        <li><strong>cookie-consent</strong> — remembers your cookie choice (local storage).</li>
        <li><strong>theme</strong> — remembers light/dark mode (local storage).</li>
        <li><strong>emergency-dismissed</strong> — hides the emergency banner for your session.</li>
      </ul>
      <h2>Analytics (only with your consent)</h2>
      <ul>
        <li><strong>Google Analytics 4</strong> (<code>_ga</code>, <code>_ga_*</code>) — anonymised usage statistics, set only after you click &ldquo;Accept all&rdquo;.</li>
        <li><strong>Vercel Web Analytics</strong> — cookieless, privacy-friendly page-view counts.</li>
      </ul>
      <h2>Changing your choice</h2>
      <p>Clear this site&apos;s data in your browser settings and the consent banner will appear again. You can also block cookies in your browser at any time.</p>
      <p>Questions? Email <a className="link" href={`mailto:${site.email}`}>{site.email}</a>.</p>
    </LegalPage>
  );
}
