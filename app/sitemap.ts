import type { MetadataRoute } from "next";
import { blogPosts } from "@/data/blog";
import { doctors } from "@/data/doctors";
import { services } from "@/data/services";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPages: [string, number][] = [
    ["/", 1], ["/services", 0.9], ["/book-appointment", 0.9], ["/about", 0.8], ["/doctors", 0.8], ["/pricing", 0.8],
    ["/smile-gallery", 0.7], ["/testimonials", 0.7], ["/blog", 0.7], ["/faqs", 0.7], ["/contact", 0.8],
    ["/privacy-policy", 0.2], ["/terms", 0.2], ["/cookie-policy", 0.2],
  ];
  return [
    ...staticPages.map(([p, priority]) => ({ url: absoluteUrl(p), lastModified: now, priority })),
    ...services.map((s) => ({ url: absoluteUrl(`/services/${s.slug}`), lastModified: now, priority: 0.8 })),
    ...doctors.map((d) => ({ url: absoluteUrl(`/doctors/${d.slug}`), lastModified: now, priority: 0.6 })),
    ...blogPosts.map((b) => ({ url: absoluteUrl(`/blog/${b.slug}`), lastModified: new Date(b.updated ?? b.date), priority: 0.6 })),
  ];
}
