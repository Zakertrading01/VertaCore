import type { Metadata } from "next";
import { defaultMetadata } from "@/lib/seo";
import "./globals.css";

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
      className="dark h-full"
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-[#0A1628] text-[#F8FAFC] antialiased">
        {children}
      </body>
    </html>
  );
}
