import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { db } from "@/lib/db";

export const dynamic = 'force-dynamic';

async function getSiteSettings() {
  const setting = await db.siteSetting.findFirst();
  return { showSocials: setting?.showSocials ?? true };
}

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { showSocials } = await getSiteSettings();

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer showSocials={showSocials} />
    </>
  );
}
