"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

type MobileNavigationProps = {
  items: ReadonlyArray<{ label: string; href: string }>;
};

export function MobileNavigation({ items }: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative lg:hidden">
      <button
        aria-controls="mobile-navigation-links"
        aria-expanded={isOpen}
        className="inline-flex min-h-10 items-center gap-2 border border-teak/25 px-3 text-sm font-semibold transition hover:border-terracotta hover:text-terracotta focus:outline-none focus:ring-2 focus:ring-marigold dark:border-plaster/25 dark:hover:border-marigold dark:hover:text-marigold"
        onClick={() => setIsOpen((open) => !open)}
        type="button"
      >
        {isOpen ? <X aria-hidden size={17} /> : <Menu aria-hidden size={17} />}
        {isOpen ? "Close" : "Menu"}
      </button>

      {isOpen ? (
        <nav
          aria-label="Mobile navigation"
          className="absolute right-0 top-[calc(100%+.75rem)] z-50 grid w-[min(20rem,calc(100vw-2rem))] grid-cols-2 gap-px border border-teak/15 bg-plaster p-2 shadow-[0_18px_50px_rgba(36,20,9,.18)] dark:border-plaster/15 dark:bg-[#12150f]"
          id="mobile-navigation-links"
        >
          {items.map((item) => (
            <Link
              className="border border-teak/15 bg-limewash/70 px-3 py-3 text-center text-sm font-semibold text-teak transition hover:border-terracotta hover:text-terracotta dark:border-plaster/15 dark:bg-plaster/5 dark:text-plaster dark:hover:border-marigold dark:hover:text-marigold"
              href={item.href}
              key={item.label}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      ) : null}
    </div>
  );
}
