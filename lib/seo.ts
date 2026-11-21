import type { Metadata } from "next";
import { site } from "./site";

export const absoluteUrl = (path = "/") => `${site.url}${path.startsWith("/") ? path : `/${path}`}`;

type SeoInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  noIndex?: boolean;
};

/** Builds unique, consistent metadata (canonical, OG, Twitter) for every page. */
export function buildMetadata({ title, description, path, image, type = "website", publishedTime, noIndex }: SeoInput): Metadata {
  const url = absoluteUrl(path);
  const images = image ? [{ url: image, width: 1200, height: 630, alt: title }] : undefined;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      locale: site.locale,
      type,
      ...(images && { images }),
      ...(publishedTime && { publishedTime }),
    },
    twitter: { card: "summary_large_image", title, description, ...(image && { images: [image] }) },
    ...(noIndex && { robots: { index: false, follow: true } }),
  };
}
