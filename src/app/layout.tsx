import type { Metadata } from "next";
import { defaultMetadata } from "@/lib/seo";
import { Cinzel, Playfair_Display, Outfit, Montserrat } from 'next/font/google';
import "./globals.css";

const cinzel = Cinzel({ subsets: ['latin'], variable: '--font-cinzel' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });
const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' });

export const metadata: Metadata = {
  ...defaultMetadata,
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="dark h-full overflow-x-hidden"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className={`h-full min-h-screen flex flex-col bg-[#0A1628] text-[#F8FAFC] antialiased ${cinzel.variable} ${playfair.variable} ${outfit.variable} ${montserrat.variable}`}>
        {children}
      </body>
    </html>
  );
}
