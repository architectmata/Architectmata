import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { NotionArticle } from "@/components/notion-article";
import { getJournalArticle } from "@/lib/cms/journal";

type JournalArticlePageProps = { params: Promise<{ slug: string }> };

function formatDate(value: string) {
  if (!value) return "";
  return new Intl.DateTimeFormat("en", { dateStyle: "long", timeZone: "UTC" }).format(new Date(value));
}

export async function generateMetadata({ params }: JournalArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const { article } = await getJournalArticle(slug);

  if (!article) {
    return { title: "Journal", robots: { index: false, follow: false } };
  }

  return {
    title: article.title,
    description: article.hook || undefined,
    alternates: { canonical: `/journal/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.hook || undefined,
      type: "article",
      url: `/journal/${article.slug}`
    }
  };
}

export default async function JournalArticlePage({ params }: JournalArticlePageProps) {
  const { slug } = await params;
  const { article, unavailable } = await getJournalArticle(slug);

  if (unavailable) {
    return (
      <section className="px-5 pb-24 pt-36 md:px-10 md:pt-44">
        <div className="mx-auto max-w-3xl">
          <Link className="inline-flex items-center gap-2 text-sm font-bold text-clay" href="/journal"><ArrowLeft size={17} /> Back to Journal</Link>
          <h1 className="mt-12 font-serif text-4xl md:text-6xl">This story is resting for a moment.</h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed opacity-70">Notion is temporarily unavailable. Please return soon.</p>
        </div>
      </section>
    );
  }

  if (!article) notFound();

  return (
    <article className="journal-article px-5 pb-24 pt-32 md:px-10 md:pb-32 md:pt-40">
      <header className="mx-auto max-w-4xl border-b border-pencil pb-12">
        <Link className="inline-flex items-center gap-2 text-sm font-bold text-clay" href="/journal"><ArrowLeft size={17} /> Back to Journal</Link>
        <p className="mt-12 text-xs font-bold uppercase tracking-[.2em] text-clay">
          {[article.pillar, article.category].filter(Boolean).join(" / ")}
        </p>
        <h1 className="mt-5 font-serif text-5xl leading-[1.02] md:text-7xl">{article.title}</h1>
        {article.hook && <p className="mt-7 max-w-3xl text-xl leading-relaxed opacity-70 md:text-2xl">{article.hook}</p>}
        {article.date && <time className="mt-7 block text-sm opacity-55" dateTime={article.date}>{formatDate(article.date)}</time>}
      </header>
      <div className="mx-auto max-w-3xl pt-12">
        <NotionArticle blocks={article.blocks} />
      </div>
    </article>
  );
}
