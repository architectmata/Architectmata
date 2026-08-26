"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { navItems } from "@/data/site-content";

export function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    }

    function closeOnOutsideClick(event: MouseEvent) {
      if (!menuRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("mousedown", closeOnOutsideClick);

    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("mousedown", closeOnOutsideClick);
    };
  }, [isOpen]);

  return (
    <div className="relative ml-auto lg:hidden" ref={menuRef}>
      <button
        aria-controls="mobile-navigation-menu"
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        className="inline-flex h-10 w-10 items-center justify-center border border-teak/25 bg-limewash/75 text-teak transition hover:border-terracotta hover:text-terracotta focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta dark:border-plaster/25 dark:bg-plaster/5 dark:text-plaster dark:hover:border-marigold dark:hover:text-marigold"
        onClick={() => setIsOpen((current) => !current)}
        ref={triggerRef}
        type="button"
      >
        {isOpen ? <X aria-hidden size={20} /> : <Menu aria-hidden size={20} />}
      </button>
      {isOpen ? (
        <div
          className="absolute right-0 top-full mt-3 w-[min(20rem,calc(100vw-2rem))] border border-teak/20 bg-limewash p-2 shadow-xl dark:border-plaster/20 dark:bg-[#12150f]"
          id="mobile-navigation-menu"
        >
          <ul className="grid grid-cols-2 gap-1" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <li key={item.label}>
                <a
                  className="block px-3 py-3 text-sm font-medium text-teak/80 transition hover:bg-terracotta/10 hover:text-terracotta focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-terracotta dark:text-plaster/80 dark:hover:bg-marigold/10 dark:hover:text-marigold"
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
