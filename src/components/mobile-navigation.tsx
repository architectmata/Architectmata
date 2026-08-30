"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

type MobileNavigationProps = {
  items: ReadonlyArray<{ label: string; href: string }>;
};

export function MobileNavigation({ items }: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-t border-teak/10 px-4 py-2 dark:border-plaster/10 lg:hidden">
      <button
        aria-controls="mobile-navigation-links"
        aria-expanded={isOpen}
        className="button-outline mx-auto min-h-0 w-full justify-center py-2 sm:max-w-xs"
        onClick={() => setIsOpen((open) => !open)}
        type="button"
      >
        {isOpen ? <X aria-hidden size={17} /> : <Menu aria-hidden size={17} />}
        {isOpen ? "Close menu" : "Explore Architectmata"}
      </button>

      {isOpen ? (
        <nav
          aria-label="Mobile navigation"
          className="mx-auto grid max-w-2xl grid-cols-2 gap-px pt-2 sm:grid-cols-3"
          id="mobile-navigation-links"
        >
          {items.map((item) => (
            <a
              className="border border-teak/15 bg-limewash/70 px-3 py-3 text-center text-sm font-semibold text-teak transition hover:border-terracotta hover:text-terracotta dark:border-plaster/15 dark:bg-plaster/5 dark:text-plaster dark:hover:border-marigold dark:hover:text-marigold"
              href={item.href}
              key={item.label}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>
      ) : null}
    </div>
  );
}
