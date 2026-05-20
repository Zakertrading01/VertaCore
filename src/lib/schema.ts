const BASE_URL = "https://vertacore.com";

const organization = {
  "@type": "Organization",
  "@id": `${BASE_URL}/#organization`,
  name: "VERTACORE",
  url: BASE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${BASE_URL}/og/default.jpg`,
  },
  description:
    "Premium MRO industrial supply and procurement company delivering certified safety equipment, welding systems, lifting & rigging, and industrial consumables.",
  sameAs: [],
};

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    ...organization,
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "VERTACORE",
    url: BASE_URL,
    description:
      "Certified industrial MRO supply and procurement for Oil & Gas, Marine, Construction, Manufacturing and Mining.",
    potentialAction: {
      "@type": "SearchAction",
      target: `${BASE_URL}/catalogue?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbSchema(items: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${BASE_URL}${item.href}`,
    })),
  };
}

export function serviceSchema(data: {
  name: string;
  description: string;
  slug: string;
  features?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: data.name,
    description: data.description,
    url: `${BASE_URL}/solutions/${data.slug}`,
    provider: {
      "@type": "Organization",
      name: "VERTACORE",
      url: BASE_URL,
    },
    serviceType: "Industrial Supply",
    areaServed: "Global",
    ...(data.features && data.features.length > 0
      ? {
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: `${data.name} Range`,
            itemListElement: data.features.map((f) => ({
              "@type": "Offer",
              itemOffered: { "@type": "Product", name: f },
            })),
          },
        }
      : {}),
  };
}

export function catalogueItemListSchema(
  items: { name: string; position: number }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "VERTACORE Industrial Product Catalogue",
    description:
      "Certified industrial equipment including safety PPE, welding systems, lifting & rigging, abrasives, and industrial tools.",
    url: `${BASE_URL}/catalogue`,
    itemListElement: items.map((item) => ({
      "@type": "ListItem",
      position: item.position,
      name: item.name,
      url: `${BASE_URL}/catalogue`,
    })),
  };
}

export function articleSchema(data: {
  title: string;
  excerpt: string;
  slug: string;
  coverImage?: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: data.title,
    description: data.excerpt,
    url: `${BASE_URL}/insights/${data.slug}`,
    image: data.coverImage,
    author: {
      "@type": "Organization",
      name: data.author,
    },
    publisher: {
      "@type": "Organization",
      name: "VERTACORE",
      logo: { "@type": "ImageObject", url: `${BASE_URL}/og/default.jpg` },
    },
    datePublished: data.publishedAt,
    dateModified: data.updatedAt,
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "VERTACORE",
    url: BASE_URL,
    description:
      "Premium MRO industrial supply and procurement company. ISO 9001:2015 certified.",
    email: "sales@vertacore.com",
    priceRange: "$$$$",
    currenciesAccepted: "USD, AED",
    paymentAccepted: "Invoice",
    areaServed: "Global",
  };
}
