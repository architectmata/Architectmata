import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://architectmata.com"),
  title: "Architectmata | Architecture, Books, Travel, Art, and Childhood",
  description:
    "Architectmata is Manasi Chaudhari's living archive for children, heritage, architecture, books, travel, art, and observation.",
  openGraph: {
    title: "Architectmata",
    description:
      "A warm digital courtyard where architecture, motherhood, children's books, travel, art, and heritage meet.",
    images: ["/images/architectmata-courtyard.png"]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
