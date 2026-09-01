"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MobileNavigation } from "@/components/mobile-navigation";
import { SiteSearch } from "@/components/site-search";
import { ThemeToggle } from "@/components/theme-toggle";
import { brandBasics, navItems } from "@/data/site-content";

export default function Header({ homepageMobileMinimal = false }: { homepageMobileMinimal?: boolean }) {
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-teak/15 bg-[rgba(255,250,240,0.95)] text-teak backdrop-blur-md dark:border-plaster/15 dark:bg-[rgba(18,21,15,0.95)] dark:text-plaster">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link className="flex items-center gap-3" href="/" aria-label="Architectmata home">
          <span className="hidden h-10 w-10 place-items-center border border-teak/35 bg-terracotta text-sm font-semibold text-limewash dark:border-plaster/30 sm:grid">A</span>
          <span>
            <span className="block font-serif text-xl font-semibold leading-none">Architectmata</span>
            <span className="hidden text-[0.68rem] uppercase tracking-[0.22em] text-teak/65 dark:text-plaster/65 sm:block">{brandBasics.tagline}</span>
          </span>
        </Link>
        <nav aria-label="Primary navigation" className="ml-auto hidden items-center gap-6 lg:flex">
          {navItems.map((item, index) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <div className="group relative flex h-10 items-center" key={item.label}>
                <Link
                  aria-current={isActive ? "page" : undefined}
                  className={`rounded-sm py-2 text-sm transition hover:text-terracotta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marigold focus-visible:ring-offset-2 focus-visible:ring-offset-limewash dark:hover:text-marigold dark:focus-visible:ring-offset-[#12150f] ${
                    isActive
                      ? "font-semibold text-terracotta dark:text-marigold"
                      : "text-teak/75 dark:text-plaster/75"
                  }`}
                  href={item.href}
                >
                  {item.label}
                </Link>
                <div
                  className={`invisible pointer-events-none absolute top-full z-50 w-56 pt-2 opacity-0 transition-[opacity,visibility] duration-150 group-hover:visible group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:visible group-focus-within:pointer-events-auto group-focus-within:opacity-100 ${
                    index === navItems.length - 1
                      ? "right-0"
                      : "left-1/2 -translate-x-1/2"
                  }`}
                >
                  <div className="border border-teak/15 bg-plaster p-1.5 shadow-[0_12px_32px_rgba(36,20,9,.14)] dark:border-plaster/15 dark:bg-[#12150f] dark:shadow-[0_12px_32px_rgba(0,0,0,.3)]">
                    {item.children.map((child) => (
                      <Link
                        className="flex min-h-10 items-center px-3 py-2 text-sm leading-snug text-teak/80 transition hover:bg-limewash hover:text-terracotta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-marigold dark:text-plaster/80 dark:hover:bg-plaster/10 dark:hover:text-marigold"
                        href={child.href}
                        key={`${item.label}-${child.label}`}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </nav>
        <div className="ml-auto flex items-center gap-1.5 lg:ml-0">
          <span className={homepageMobileMinimal ? "hidden sm:inline-flex" : "inline-flex"}><SiteSearch /></span>
          <span className={homepageMobileMinimal ? "hidden sm:inline-flex" : "inline-flex"}><ThemeToggle /></span>
          <MobileNavigation items={navItems} />
        </div>
      </div>
    </header>
  );
}
