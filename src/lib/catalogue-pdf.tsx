import "server-only";
import fs from "fs/promises";
import path from "path";
import sharp from "sharp";
import { Document, Page, Text, View, Image, Link, StyleSheet, renderToBuffer } from "@react-pdf/renderer";
import { resolveImageUrl } from "./image-utils";

const NAVY = "#102544";
const NAVY_DARK = "#0A1628";
const GOLD = "#E7C85A";
const WHITE = "#FFFFFF";
const LIGHT_BG = "#F4F6F9";
const MID_GREY = "#8A9BB0";
const DARK_GREY = "#3A4A5C";
const CERT_BG = "#D6E4F7";

const styles = StyleSheet.create({
  // ── Cover ──────────────────────────────────────────────
  coverPage: {
    fontFamily: "Helvetica",
    backgroundColor: NAVY_DARK,
    flexDirection: "column",
  },
  coverTop: {
    flex: 1,
    backgroundColor: NAVY,
    justifyContent: "center",
    alignItems: "center",
    padding: 48,
  },
  coverBrand: {
    fontSize: 38,
    fontFamily: "Helvetica-Bold",
    color: WHITE,
    letterSpacing: 8,
    marginBottom: 6,
  },
  coverTagline: {
    fontSize: 10,
    color: GOLD,
    letterSpacing: 4,
    marginBottom: 32,
  },
  coverBar: { width: 60, height: 3, backgroundColor: GOLD, marginBottom: 28 },
  coverTitle: {
    fontSize: 22,
    fontFamily: "Helvetica-Bold",
    color: WHITE,
    marginBottom: 10,
    textAlign: "center",
  },
  coverSub: {
    fontSize: 10,
    color: MID_GREY,
    textAlign: "center",
    maxWidth: 320,
    lineHeight: 1.7,
  },
  coverBottom: {
    backgroundColor: NAVY_DARK,
    padding: 28,
    alignItems: "center",
  },
  coverYear: { fontSize: 11, color: MID_GREY },
  coverCert: { fontSize: 8, color: GOLD, letterSpacing: 2, marginTop: 4 },

  // ── Content pages ──────────────────────────────────────
  page: {
    fontFamily: "Helvetica",
    backgroundColor: WHITE,
    paddingBottom: 52,
  },
  pageHeader: {
    backgroundColor: NAVY,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 32,
    paddingVertical: 11,
  },
  pageHeaderBrand: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: WHITE,
    letterSpacing: 3,
  },
  pageHeaderSub: { fontSize: 7.5, color: MID_GREY, letterSpacing: 1 },

  // ── Category section ───────────────────────────────────
  section: { marginHorizontal: 28, marginTop: 22, marginBottom: 4 },
  catHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
    paddingBottom: 7,
    borderBottomWidth: 2,
    borderBottomColor: GOLD,
  },
  catDot: {
    width: 8, height: 8, borderRadius: 4,
    backgroundColor: GOLD, marginRight: 10,
  },
  catName: {
    fontSize: 13,
    fontFamily: "Helvetica-Bold",
    color: NAVY,
  },
  catDesc: { fontSize: 7.5, color: MID_GREY, marginBottom: 10, lineHeight: 1.5 },

  // ── Item grid (3 columns) ──────────────────────────────
  grid: { flexDirection: "column", gap: 0 },
  gridRow: { flexDirection: "row", gap: 7, marginBottom: 7 },
  card: {
    width: "31.8%",
    backgroundColor: LIGHT_BG,
    borderTopWidth: 2,
    borderTopColor: NAVY,
  },
  cardImage: { width: "100%", height: 130 },
  cardImagePlaceholder: {
    width: "100%",
    height: 130,
    backgroundColor: "#D8E2EE",
    justifyContent: "center",
    alignItems: "center",
  },
  cardImagePlaceholderText: { fontSize: 7, color: MID_GREY, letterSpacing: 1 },
  cardBody: { padding: 9 },
  cardBrand: {
    fontSize: 6.5,
    fontFamily: "Helvetica-Bold",
    color: GOLD,
    letterSpacing: 1.5,
    marginBottom: 3,
  },
  cardName: {
    fontSize: 8.5,
    fontFamily: "Helvetica-Bold",
    color: NAVY,
    lineHeight: 1.35,
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 7,
    color: DARK_GREY,
    lineHeight: 1.55,
    marginBottom: 6,
  },
  certRow: { flexDirection: "row", flexWrap: "wrap", gap: 3, marginBottom: 5 },
  certTag: {
    fontSize: 6,
    fontFamily: "Helvetica-Bold",
    color: NAVY,
    backgroundColor: CERT_BG,
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 2,
  },
  datasheetRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
    paddingTop: 5,
    borderTopWidth: 0.5,
    borderTopColor: "#C8D5E5",
  },
  datasheetDot: {
    width: 5, height: 5, borderRadius: 2.5,
    backgroundColor: GOLD, marginRight: 4,
  },
  datasheetLink: { fontSize: 6.5, color: NAVY, textDecoration: "underline" },

  // ── Footer ─────────────────────────────────────────────
  footer: {
    position: "absolute",
    bottom: 18,
    left: 28,
    right: 28,
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 0.5,
    borderTopColor: "#C8D5E5",
    paddingTop: 7,
  },
  footerLeft: { fontSize: 7, color: MID_GREY },
  footerRight: { fontSize: 7, color: GOLD, fontFamily: "Helvetica-Bold" },
});

type CatalogueItem = {
  id: string;
  name: string;
  description: string | null;
  categoryGroup: string;
  image: string | null;
  certTags: string[];
  brandName: string | null;
  datasheetUrl: string | null;
};

type CatalogueItemWithData = CatalogueItem & { imageData: Buffer | null };

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  "Safety & PPE": "PPE certified to CE, EN, and ANSI standards for industrial and construction environments.",
  Welding: "SMAW, MIG/MAG, TIG and SAW welding machines and consumables for fabrication and pipeline work.",
  "Lifting & Rigging": "Hoists, slings, shackles and rigging hardware certified to ASME B30, EN 818 and EN 13414.",
  Abrasives: "Grinding discs, cutting wheels and flap discs from oSa and MPA certified manufacturers.",
  "Industrial Tools": "Professional hand tools, power tools and precision measurement equipment.",
};

const CATEGORY_ORDER = [
  "Safety & PPE", "Welding", "Lifting & Rigging", "Abrasives", "Industrial Tools",
];

function unescape(s: string) {
  return s
    .replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&#x2F;/g, "/");
}

function PageHeader() {
  return (
    <View style={styles.pageHeader} fixed>
      <Text style={styles.pageHeaderBrand}>VERTA CORE</Text>
      <Text style={styles.pageHeaderSub}>INDUSTRIAL SUPPLY · vertacore.com</Text>
    </View>
  );
}

function Footer() {
  return (
    <View style={styles.footer} fixed>
      <Text style={styles.footerLeft}>© Vertacore Industrial Supply · ISO 9001:2015 Certified · No Obligation Enquiry</Text>
      <Text style={styles.footerRight} render={({ pageNumber }) => `Page ${pageNumber}`} />
    </View>
  );
}

function CoverPage({ year }: { year: string }) {
  return (
    <Page size="A4" style={styles.coverPage}>
      <View style={styles.coverTop}>
        <Text style={styles.coverBrand}>VERTA CORE</Text>
        <Text style={styles.coverTagline}>INDUSTRIAL SUPPLY</Text>
        <View style={styles.coverBar} />
        <Text style={styles.coverTitle}>Product Catalogue</Text>
        <Text style={styles.coverSub}>
          Certified industrial equipment covering Safety & PPE, Welding, Lifting & Rigging,
          Abrasives and Industrial Tools. All products meet international quality standards.
        </Text>
      </View>
      <View style={styles.coverBottom}>
        <Text style={styles.coverYear}>{year}</Text>
        <Text style={styles.coverCert}>ISO 9001:2015 CERTIFIED · NO OBLIGATION ENQUIRY</Text>
      </View>
    </Page>
  );
}

function ItemCard({ item }: { item: CatalogueItemWithData }) {
  return (
    <View style={styles.card}>
      {item.imageData ? (
        <Image style={styles.cardImage} src={item.imageData} />
      ) : (
        <View style={styles.cardImagePlaceholder}>
          <Text style={styles.cardImagePlaceholderText}>NO IMAGE</Text>
        </View>
      )}
      <View style={styles.cardBody}>
        {item.brandName && <Text style={styles.cardBrand}>{item.brandName.toUpperCase()}</Text>}
        <Text style={styles.cardName}>{item.name}</Text>
        {item.description && (
          <Text style={styles.cardDesc}>
            {unescape(item.description).slice(0, 140)}
          </Text>
        )}
        {item.certTags.length > 0 && (
          <View style={styles.certRow}>
            {item.certTags.slice(0, 5).map((tag) => (
              <Text key={tag} style={styles.certTag}>{tag}</Text>
            ))}
          </View>
        )}
        {item.datasheetUrl && (
          <View style={styles.datasheetRow}>
            <View style={styles.datasheetDot} />
            <Link src={item.datasheetUrl} style={styles.datasheetLink}>
              View Datasheet
            </Link>
          </View>
        )}
      </View>
    </View>
  );
}

function CategorySection({ category, items }: { category: string; items: CatalogueItemWithData[] }) {
  const rows: CatalogueItemWithData[][] = [];
  for (let i = 0; i < items.length; i += 3) rows.push(items.slice(i, i + 3));

  return (
    <View style={styles.section}>
      {/* Header + first row kept together so the heading never orphans at the bottom of a page */}
      <View wrap={false}>
        <View style={styles.catHeader}>
          <View style={styles.catDot} />
          <Text style={styles.catName}>{category}</Text>
        </View>
        {CATEGORY_DESCRIPTIONS[category] && (
          <Text style={styles.catDesc}>{CATEGORY_DESCRIPTIONS[category]}</Text>
        )}
        {rows[0] && (
          <View style={styles.gridRow}>
            {rows[0].map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </View>
        )}
      </View>
      {/* Remaining rows, each kept intact across page breaks */}
      <View style={styles.grid}>
        {rows.slice(1).map((row, i) => (
          <View key={i} style={styles.gridRow} wrap={false}>
            {row.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}

async function fetchImageBuffer(url: string): Promise<Buffer | null> {
  try {
    const targetUrl = resolveImageUrl(url);
    if (!targetUrl) return null;

    if (targetUrl.startsWith("http://") || targetUrl.startsWith("https://")) {
      console.log(`[catalogue-pdf] fetching remote: ${targetUrl}`);
      const res = await fetch(targetUrl, { signal: AbortSignal.timeout(10_000) });
      if (!res.ok) {
        console.error(`[catalogue-pdf] image fetch failed ${res.status}: ${targetUrl}`);
        return null;
      }
      const raw = Buffer.from(await res.arrayBuffer());

      // Convert to JPEG — react-pdf only supports PNG/JPG, not WebP or other formats
      const data = await sharp(raw).jpeg({ quality: 85 }).toBuffer();
      console.log(`[catalogue-pdf] successfully processed image: ${targetUrl} (${data.length} bytes)`);
      return data;
    }

    // Fallback for paths that couldn't be resolved to http (shouldn't happen with resolveImageUrl and leading /)
    console.error(`[catalogue-pdf] unsupported image URL structure: ${url}`);
    return null;
  } catch (err) {
    console.error(`[catalogue-pdf] image error for ${url}:`, err);
    return null;
  }
}

export async function generateCataloguePDF(items: CatalogueItem[]): Promise<Buffer> {
  // Pre-fetch all images in parallel so react-pdf doesn't need to make HTTP requests
  const itemsWithData: CatalogueItemWithData[] = await Promise.all(
    items.map(async (item) => ({
      ...item,
      imageData: item.image ? await fetchImageBuffer(item.image) : null,
    }))
  );

  const grouped: Record<string, CatalogueItemWithData[]> = {};
  CATEGORY_ORDER.forEach((cat) => {
    const catItems = itemsWithData.filter((i) => i.categoryGroup === cat);
    if (catItems.length > 0) grouped[cat] = catItems;
  });
  itemsWithData.forEach((item) => {
    if (!CATEGORY_ORDER.includes(item.categoryGroup)) {
      if (!grouped[item.categoryGroup]) grouped[item.categoryGroup] = [];
      grouped[item.categoryGroup].push(item);
    }
  });

  const doc = (
    <Document title="Vertacore Product Catalogue" author="Vertacore Industrial Supply">
      <CoverPage year={new Date().getFullYear().toString()} />
      <Page size="A4" style={styles.page}>
        <PageHeader />
        {Object.entries(grouped).map(([cat, catItems]) => (
          <CategorySection key={cat} category={cat} items={catItems} />
        ))}
        <Footer />
      </Page>
    </Document>
  );

  return renderToBuffer(doc);
}
