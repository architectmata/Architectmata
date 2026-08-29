"use client";

import Link from "next/link";
import { Search, X } from "lucide-react";
import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { searchIndex } from "@/lib/search-index";

type SiteSearchProps = {
  variant?: "new" | "legacy" | "read";
};

const buttonClasses = {
  new: "border-teak/20 text-teak hover:border-terracotta hover:text-terracotta dark:border-plaster/25 dark:text-plaster dark:hover:border-marigold dark:hover:text-marigold",
  legacy: "border-ink/15 text-ink hover:bg-ink/5 dark:border-paper/20 dark:text-paper dark:hover:bg-paper/10",
  read: "border-teak/20 text-teak hover:border-terracotta hover:text-terracotta dark:border-plaster/25 dark:text-plaster"
};

export function SiteSearch({ variant = "new" }: SiteSearchProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const dialogRef = useRef<HTMLElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const results = useMemo(() => {
    const terms = deferredQuery.toLocaleLowerCase().trim().split(/\s+/).filter(Boolean);
    if (terms.length === 0) return [];

    return searchIndex
      .filter((item) => {
        const searchable = `${item.title} ${item.description} ${item.category}`.toLocaleLowerCase();
        return terms.every((term) => searchable.includes(term));
      })
      .slice(0, 12);
  }, [deferredQuery]);

  function closeSearch() {
    setOpen(false);
    setQuery("");
    requestAnimationFrame(() => triggerRef.current?.focus());
  }

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    inputRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeSearch();
        return;
      }

      if (event.key === "Tab") {
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable || focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-label="Search site"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className={`inline-flex min-h-10 items-center gap-2 rounded-full border px-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-marigold ${buttonClasses[variant]}`}
      >
        <Search aria-hidden size={18} />
        <span className="hidden sm:inline">Search</span>
      </button>

      {open &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] overflow-y-auto bg-[#1f1712]/70 p-4 backdrop-blur-sm sm:p-8"
            role="presentation"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) closeSearch();
            }}
          >
            <section
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="site-search-title"
              className="mx-auto mt-[8vh] max-w-2xl border border-[#5b3625]/20 bg-[#fffaf0] text-[#5b3625] shadow-[0_28px_90px_rgba(31,23,18,.35)]"
            >
              <div className="flex items-center gap-3 border-b border-[#5b3625]/15 p-4 sm:p-5">
                <Search aria-hidden className="shrink-0 text-[#a94f2a]" size={21} />
                <div className="min-w-0 flex-1">
                  <label className="sr-only" htmlFor="site-search-input">
                    Search Architectmata
                  </label>
                  <input
                    ref={inputRef}
                    id="site-search-input"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search books, places, architecture, and ideas…"
                    className="w-full bg-transparent py-2 text-base outline-none placeholder:text-[#5b3625]/45 sm:text-lg"
                  />
                </div>
                <button
                  type="button"
                  aria-label="Close search"
                  onClick={closeSearch}
                  className="grid min-h-10 min-w-10 place-items-center rounded-full border border-[#5b3625]/15 transition hover:bg-[#5b3625]/5 focus:outline-none focus:ring-2 focus:ring-[#d99b22]"
                >
                  <X aria-hidden size={20} />
                </button>
              </div>

              <div className="max-h-[62vh] overflow-y-auto p-4 sm:p-5">
                <h2 id="site-search-title" className="sr-only">
                  Search Architectmata
                </h2>
                {deferredQuery.trim() === "" ? (
                  <div className="py-8 text-center">
                    <p className="font-serif text-2xl">What would you like to explore?</p>
                    <p className="mt-2 text-sm leading-6 text-[#5b3625]/65">
                      Try “architecture”, “Marathi books”, “Yellowstone”, “art classes”, or “museum”.
                    </p>
                  </div>
                ) : results.length === 0 ? (
                  <div className="py-8 text-center" role="status">
                    <p className="font-serif text-2xl">No field notes found</p>
                    <p className="mt-2 text-sm text-[#5b3625]/65">Try a broader word or a different place, book, or topic.</p>
                  </div>
                ) : (
                  <div aria-live="polite">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#a94f2a]">
                      {results.length} {results.length === 1 ? "result" : "results"}
                    </p>
                    <ul className="divide-y divide-[#5b3625]/12 border-y border-[#5b3625]/12">
                      {results.map((result) => (
                        <li key={`${result.href}-${result.title}`}>
                          <Link
                            href={result.href}
                            onClick={closeSearch}
                            className="group block px-1 py-4 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#d99b22]"
                          >
                            <span className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#a94f2a]">
                              {result.category}
                            </span>
                            <span className="mt-1 block font-serif text-xl group-hover:text-[#a94f2a]">{result.title}</span>
                            <span className="mt-1 line-clamp-2 block text-sm leading-6 text-[#5b3625]/65">
                              {result.description}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </section>
          </div>,
          document.body
        )}
    </>
  );
}
