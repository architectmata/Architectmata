import type { Metadata } from "next";
import Script from "next/script";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://architectmata.com"),
  title: {
    default: "Architectmata — Architecture, books & wonder",
    template: "%s | Architectmata"
  },
  description:
    "A Conservation Architect, educator, and mother exploring how children connect with books, architecture, art, travel, and heritage.",
  openGraph: {
    title: "Architectmata",
    description: "Architecture, books, art, and small adventures for curious children.",
    type: "website"
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Script src="https://f.convertkit.com/ckjs/ck.5.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
