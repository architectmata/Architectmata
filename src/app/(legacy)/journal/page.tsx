import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getJournalEntries, journalPillars } from "@/lib/cms/journal";

export const metadata: Metadata = {
  title: "Journal",
  description: "Stories about raising curious children who look closer.",
  alternates: { canonical: "/journal" }
};

function formatDate(value: string) {
  if (!value) return "";
  return new Intl.DateTimeFormat("en", { dateStyle: "medium", timeZone: "UTC" }).format(new Date(value));
}

export default async function JournalPage() {
  const { entries, unavailable } = await getJournalEntries();

  return (
    <>
      <section className="blueprint-paper border-b border-pencil px-5 pb-16 pt-32 md:px-10 md:pb-24 md:pt-44">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[.24em] text-clay">Architectmata Journal</p>
          <h1 className="mt-5 max-w-4xl font-serif text-5xl leading-[.98] md:text-7xl">
            Stories about raising curious children who look closer.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed opacity-70">
            Architecture, books, travel, culture, making, memory, and the small things children notice.
          </p>
          <div className="mt-10 flex flex-wrap gap-x-5 gap-y-2 border-t border-pencil pt-5" aria-label="Journal pillars">
            {journalPillars.map((pillar) => <span className="text-sm font-bold text-clay" key={pillar}>{pillar}</span>)}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-7xl">
          {unavailable ? (
            <div className="max-w-2xl border-l-2 border-clay pl-6">
              <h2 className="font-serif text-3xl">The Journal is resting for a moment.</h2>
              <p className="mt-3 leading-relaxed opacity-70">Please return soon. The rest of Architectmata is still here to explore.</p>
            </div>
          ) : entries.length ? (
            <div className="journal-grid">
              {entries.map((entry) => (
                <article className="journal-card" key={entry.id}>
                  <div className="journal-card-meta">
                    <span>{entry.pillar}</span>
                    {entry.category && <span>{entry.category}</span>}
                    {entry.date && <time dateTime={entry.date}>{formatDate(entry.date)}</time>}
                  </div>
                  <h2><Link href={`/journal/${entry.slug}`}>{entry.title}</Link></h2>
                  {entry.hook && <p>{entry.hook}</p>}
                  <Link className="journal-card-link" href={`/journal/${entry.slug}`}>
                    Read journal entry <ArrowUpRight aria-hidden size={17} />
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <p className="max-w-xl font-serif text-2xl">The first Journal stories are being prepared.</p>
          )}
        </div>
      </section>
    </>
  );
}
