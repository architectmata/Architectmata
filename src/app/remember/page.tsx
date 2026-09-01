import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Remember",
  description: "Keepsakes, family stories and ways of holding on to place."
};

export default function RememberPage() {
  return (
    <main className="min-h-screen bg-plaster text-teak dark:bg-[#12150f] dark:text-plaster">
      <header className="border-b border-teak/15 dark:border-plaster/15">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
          <Link className="inline-flex items-center gap-2 text-sm font-semibold hover:text-terracotta dark:hover:text-marigold" href="/">
            <ArrowLeft aria-hidden size={17} /> Home
          </Link>
          <Link className="font-serif text-xl font-semibold" href="/">Architectmata</Link>
        </div>
      </header>
      <section className="section-shell remember-intro">
        <div>
          <p className="museum-caption">Remember</p>
          <h1>Keepsakes, family stories and ways of holding on to place.</h1>
          <p>Remember is a quiet space for the things families carry with them: inherited words, old homes, travel scraps, recipes, routes and the small archives of childhood.</p>
          <Link className="button-primary mt-8" href="/journal">
            Visit the journal <ArrowRight aria-hidden size={17} />
          </Link>
        </div>
        <div className="remember-image">
          <Image src="/images/architectmata/architectural-column-base-study.jpg" alt="Hand-drawn study of an architectural column base" fill className="object-cover" sizes="(max-width: 768px) 100vw, 45vw" priority />
        </div>
      </section>
    </main>
  );
}
