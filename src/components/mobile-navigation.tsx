"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";

type MobileNavigationProps = {
  items: ReadonlyArray<{
    label: string;
    href: string;
    children?: ReadonlyArray<{ label: string; href: string }>;
  }>;
};

export function MobileNavigation({ items }: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
    setExpandedItem(null);
  }, [pathname]);

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
          className="absolute right-0 top-[calc(100%+.75rem)] z-50 grid w-[min(20rem,calc(100vw-2rem))] gap-1 border border-teak/15 bg-plaster p-2 shadow-[0_18px_50px_rgba(36,20,9,.18)] dark:border-plaster/15 dark:bg-[#12150f]"
          id="mobile-navigation-links"
        >
          {items.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            const isExpanded = expandedItem === item.href;
            const submenuId = `mobile-submenu-${item.label.toLowerCase()}`;
            return (
              <div
                className={`border ${
                  isActive
                    ? "border-terracotta bg-terracotta/10 dark:border-marigold dark:bg-marigold/10"
                    : "border-teak/15 bg-limewash/70 dark:border-plaster/15 dark:bg-plaster/5"
                }`}
                key={item.label}
              >
                <div className="flex items-stretch">
                  <Link
                    aria-current={isActive ? "page" : undefined}
                    className={`flex min-h-11 flex-1 items-center px-3 py-2 text-sm font-semibold transition hover:text-terracotta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-marigold dark:hover:text-marigold ${
                      isActive
                        ? "text-terracotta dark:text-marigold"
                        : "text-teak dark:text-plaster"
                    }`}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                  {item.children?.length ? (
                    <button
                      aria-controls={submenuId}
                      aria-expanded={isExpanded}
                      aria-label={`${isExpanded ? "Hide" : "Show"} ${item.label} submenu`}
                      className="flex min-h-11 w-11 items-center justify-center border-l border-teak/15 transition hover:text-terracotta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-marigold dark:border-plaster/15 dark:hover:text-marigold"
                      onClick={() => setExpandedItem(isExpanded ? null : item.href)}
                      type="button"
                    >
                      <ChevronDown
                        aria-hidden
                        className={`h-4 w-4 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                      />
                    </button>
                  ) : null}
                </div>
                {item.children?.length && isExpanded ? (
                  <div
                    className="grid border-t border-teak/15 bg-plaster/70 p-1.5 dark:border-plaster/15 dark:bg-[#12150f]/70"
                    id={submenuId}
                  >
                    {item.children.map((child) => (
                      <Link
                        className="flex min-h-10 items-center px-4 py-2 text-sm leading-snug text-teak/80 transition hover:bg-limewash hover:text-terracotta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-marigold dark:text-plaster/80 dark:hover:bg-plaster/10 dark:hover:text-marigold"
                        href={child.href}
                        key={`${item.label}-${child.label}`}
                        onClick={() => setIsOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            );
          })}
        </nav>
      ) : null}
    </div>
  );
}
