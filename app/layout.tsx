import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { t } from "@/lib/i18n";
import { clinicSchema } from "@/lib/schema";
import { testimonials } from "@/data/testimonials";
import { Providers } from "@/components/layout/Providers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { EmergencyBanner } from "@/components/layout/EmergencyBanner";
import { FloatingActions } from "@/components/layout/FloatingActions";
import { CookieConsent } from "@/components/layout/CookieConsent";
import { Analytics } from "@/components/layout/Analytics";
import { themeScript } from "@/components/layout/ThemeToggle";
import { JsonLd } from "@/components/ui/JsonLd";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--font-jakarta", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Best Dental Clinic in ${site.address.locality}, ${site.address.city}`,
    template: `%s | ${site.name}, ${site.address.city}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: ["dentist in Indiranagar", "dental clinic Bengaluru", "root canal", "dental implants", "clear aligners", "teeth whitening"],
  authors: [{ name: site.name }],
  formatDetection: { telephone: true },
  openGraph: { siteName: site.name, locale: site.locale, type: "website" },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F8FAFC" },
    { media: "(prefers-color-scheme: dark)", color: "#06121E" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${inter.variable} ${jakarta.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a href="#main" className="sr-only z-[100] rounded-full bg-primary px-5 py-3 font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
          {t.common.skipToContent}
        </a>
        <JsonLd data={clinicSchema(testimonials.slice(0, 5))} />
        <Providers>
          <EmergencyBanner />
          <Header />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer />
          <FloatingActions />
          <CookieConsent />
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
