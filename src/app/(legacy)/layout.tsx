import type { ReactNode } from "react";
import Footer from "@/components/footer";
import Header from "@/components/header";
import "./legacy-globals.css";

export default function LegacyRouteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <svg className="absolute h-0 w-0">
        <filter id="wobble">
          <feTurbulence baseFrequency="0.02" numOctaves="2" seed="2" />
          <feDisplacementMap in="SourceGraphic" scale="2" />
        </filter>
      </svg>
    </>
  );
}
