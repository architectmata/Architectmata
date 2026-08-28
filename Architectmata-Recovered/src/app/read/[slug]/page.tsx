import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { getBookLibraryBook } from "@/lib/cms/fallback-content";

type BookReviewPageProps = { params: Promise<{ slug: string }> };

export default async function BookReviewPage({ params }: BookReviewPageProps) {
  const { slug } = await params;
  const { book, unavailable } = await getBookLibraryBook(slug);

  if (unavailable) {
    return <ReadPageShell><p className="read-empty">Book library temporarily unavailable.</p></ReadPageShell>;
  }

  if (!book) {
    notFound();
  }

  const links = [
    { label: "Buy this book", href: book.buyLink || book.amazonLink },
    { label: "See the Architectmata review", href: book.instagramLink }
  ].filter((link) => link.href);

  return <ReadPageShell>
    <article className="mx-auto grid max-w-5xl gap-8 px-5 py-16 md:grid-cols-[minmax(240px,0.7fr)_minmax(0,1.3fr)] md:px-10 md:py-24">
      <div className="relative min-h-[360px] overflow-hidden bg-[#e7d8b4] md:min-h-[520px]">
        {book.coverImage ? <Image src={book.coverImage} alt={`Cover of ${book.title}`} fill sizes="(max-width: 768px) 100vw, 38vw" className="object-cover" /> : <span className="absolute inset-0 grid place-items-center p-8 text-center text-sm uppercase tracking-[0.18em]">{book.category}</span>}
      </div>
      <div>
        <p className="read-meta">{[book.category, book.age && `Ages ${book.age}`, book.language, book.readingLevel].filter(Boolean).join(" · ")}</p>
        <h1 className="mt-4 font-serif text-5xl leading-[0.98] md:text-7xl">{book.title}</h1>
        {book.author && <p className="mt-5 text-lg text-teak/70 dark:text-plaster/70">by {book.author}</p>}
        {book.learns && <section className="mt-10 border-t border-teak/15 pt-6 dark:border-plaster/15"><h2 className="read-meta">What children notice</h2><p className="mt-3 leading-7 text-teak/75 dark:text-plaster/75">{book.learns}</p></section>}
        {book.why && <section className="mt-8 border-t border-teak/15 pt-6 dark:border-plaster/15"><h2 className="read-meta">Why it’s here</h2><p className="mt-3 leading-7 text-teak/75 dark:text-plaster/75">{book.why}</p></section>}
        {links.length > 0 && <div className="mt-10 flex flex-wrap gap-3">{links.map((link) => <a className="button-outline" href={link.href} key={link.label} target="_blank" rel="noreferrer">{link.label}<ExternalLink aria-hidden size={15} /></a>)}</div>}
      </div>
    </article>
  </ReadPageShell>;
}

function ReadPageShell({ children }: { children: React.ReactNode }) {
  return <main className="read-page min-h-screen bg-plaster text-teak dark:bg-[#12150f] dark:text-plaster">
    <header className="read-header">
      <Link href="/read" className="read-back"><ArrowLeft aria-hidden size={17} /> Book Library</Link>
      <p>Architecture through a child&apos;s eyes.</p>
    </header>
    {children}
  </main>;
}
