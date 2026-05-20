import type { Metadata } from "next";

const BASE_URL = "https://vertacore.com";

interface MetadataConfig {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  keywords?: string[];
  publishedAt?: string;
  author?: string;
  noIndex?: boolean;
}

export function buildMetadata(config: MetadataConfig): Metadata {
  const url = `${BASE_URL}${config.path}`;
  const ogImage = config.image ?? `${BASE_URL}/og/default.jpg`;

  return {
    title: config.title,
    description: config.description,
    keywords: config.keywords,
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: config.title,
      description: config.description,
      url,
      siteName: "VERTACORE",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: config.title,
        },
      ],
      locale: "en_US",
      type: config.type === "article" ? "article" : "website",
      ...(config.type === "article" && config.publishedAt
        ? { publishedTime: config.publishedAt }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: config.title,
      description: config.description,
      images: [ogImage],
    },
    robots: config.noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

export const defaultMetadata: Metadata = {
  title: {
    default: "VERTACORE — Certified Industrial MRO Supply",
    template: "%s | VERTACORE",
  },
  description:
    "VERTACORE is a premium MRO industrial supply and procurement company delivering certified safety equipment, welding systems, lifting & rigging, and industrial consumables to enterprise clients worldwide.",
  metadataBase: new URL(BASE_URL),
  keywords: [
    "industrial equipment supplier",
    "MRO supply",
    "safety equipment",
    "welding systems",
    "lifting rigging",
    "ISO 9001 certified",
    "industrial procurement",
    "PPE supplier",
  ],
  openGraph: {
    siteName: "VERTACORE",
    locale: "en_US",
    type: "website",
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [{ url: "/icons/favicon.ico" }],
    apple: [{ url: "/icons/apple-touch-icon.png" }],
  },
};
