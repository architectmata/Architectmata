"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

type Book = {
  title: string;
  author?: string;
  category: string;
  categories?: string[];
  age: string;
  language?: string;
  readingLevel?: string;
  readingHistory?: string;
  learns: string;
  why: string;
  coverImage?: string;
  reviewedByArchitectmata?: boolean;
  instagramLink?: string;
  buyLink?: string;
  amazonLink?: string;
  slug?: string;
};

const topicAliases: Record<string, string> = {
  "architecture + built world": "Architecture",
  "architecture / built world": "Architecture",
  architecture: "Architecture",
  "marathi children’s books": "Marathi",
  "marathi children's books": "Marathi",
  "marathi books": "Marathi",
  marathi: "Marathi",
  "curiosity + stem": "STEM",
  stem: "STEM",
  "making + art": "Art + Creativity",
  "art + creativity": "Art + Creativity"
};

const preferredTopicOrder = [
  "Architecture",
  "Marathi",
  "India + Belonging",
  "Art + Creativity",
  "Nature",
  "STEM",
  "Parenting",
  "Places + Travel"
];

function normalizeTopic(topic: string) {
  const trimmed = topic.trim();
  return topicAliases[trimmed.toLocaleLowerCase()] ?? trimmed;
}

function getBookTopics(book: Book) {
  const source = book.categories?.length ? [...book.categories] : book.category ? [book.category] : [];

  if (book.language?.toLocaleLowerCase().includes("marathi")) {
    source.push("Marathi");
  }

  return Array.from(new Set(source.map(normalizeTopic).filter(Boolean)));
}

function isExternalHttpUrl(value?: string) {
  return Boolean(value && /^https?:\/\//i.test(value));
}

export function ReadLibrary({ books, initialTopic = "All" }: { books: Book[]; initialTopic?: string }) {
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState(initialTopic);

  function selectTopic(label: string) {
    setTopic(label);

    const url = new URL(window.location.href);
    if (label === "All") {
      url.searchParams.delete("topic");
    } else {
      url.searchParams.set("topic", label.toLocaleLowerCase());
    }
    window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
  }

  const topics = useMemo(() => {
    const frequency = new Map<string, number>();

    books.forEach((book) => {
      getBookTopics(book).forEach((label) => frequency.set(label, (frequency.get(label) ?? 0) + 1));
    });

    const labels = Array.from(frequency.keys()).sort((a, b) => {
      const preferredA = preferredTopicOrder.indexOf(a);
      const preferredB = preferredTopicOrder.indexOf(b);

      if (preferredA !== -1 || preferredB !== -1) {
        if (preferredA === -1) return 1;
        if (preferredB === -1) return -1;
        return preferredA - preferredB;
      }

      return (frequency.get(b) ?? 0) - (frequency.get(a) ?? 0) || a.localeCompare(b);
    });

    const visibleLabels = labels.slice(0, 10);
    if (initialTopic !== "All" && !visibleLabels.includes(initialTopic)) {
      visibleLabels.push(initialTopic);
    }

    return ["All", ...visibleLabels];
  }, [books, initialTopic]);

  useEffect(() => {
    setTopic(initialTopic);
  }, [initialTopic]);

  const shown = useMemo(() => {
    const search = query.trim().toLocaleLowerCase();

    return books.filter((book) => {
      const matchesTopic = topic === "All" || getBookTopics(book).includes(topic);
      const searchable = [
        book.title,
        book.author,
        book.category,
        ...(book.categories ?? []),
        book.age,
        book.language,
        book.readingLevel,
        book.readingHistory,
        book.learns,
        book.why
      ]
        .filter(Boolean)
        .join(" ")
        .toLocaleLowerCase();

      return matchesTopic && searchable.includes(search);
    });
  }, [books, query, topic]);

  return (
    <section className="read-library">
      <div className="read-tools">
        <label>
          <span className="sr-only">Search books</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search books, subjects or ages…"
          />
        </label>
      </div>

      <div className="read-topic-scroll" aria-label="Filter books by topic">
        <div className="read-topic-row">
          {topics.map((label) => (
            <button
              type="button"
              key={label}
              aria-pressed={topic === label}
              className={topic === label ? "active" : ""}
              onClick={() => selectTopic(label)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <p className="read-count" aria-live="polite">
        {shown.length} recommendation{shown.length === 1 ? "" : "s"}
      </p>

      <div className="read-list">
        {shown.map((book) => {
          const storeLink = isExternalHttpUrl(book.buyLink)
            ? book.buyLink
            : isExternalHttpUrl(book.amazonLink)
              ? book.amazonLink
              : undefined;

          return (
            <article className="read-list-item" key={book.slug || book.title}>
              <div className="read-book-heading">
                {book.coverImage && (
                  <div className="read-book-cover">
                    <Image
                      src={book.coverImage}
                      alt={`Cover of ${book.title}`}
                      fill
                      sizes="(max-width: 719px) 88px, 112px"
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <p className="read-meta">
                    {[book.category, book.age && `Ages ${book.age}`, book.language]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                  {book.reviewedByArchitectmata && (
                    <span className="mt-2 inline-block border border-[#a54b32]/35 px-2 py-1 text-[.65rem] font-semibold uppercase tracking-[.12em] text-[#a54b32] dark:border-[#d99b22]/40 dark:text-[#d99b22]">
                      Reviewed by Architectmata
                    </span>
                  )}
                  <h2>{book.title}</h2>
                  {book.author && <p className="read-author">by {book.author}</p>}
                </div>
              </div>

              <div className="read-list-notes">
                {book.learns && (
                  <div>
                    <strong>What children notice</strong>
                    <p>{book.learns}</p>
                  </div>
                )}
                {book.why && (
                  <div>
                    <strong>Why I recommend it</strong>
                    <p>{book.why}</p>
                  </div>
                )}
                {(isExternalHttpUrl(book.instagramLink) || storeLink) && (
                  <div className="read-book-actions">
                    {isExternalHttpUrl(book.instagramLink) && (
                      <a href={book.instagramLink} target="_blank" rel="noreferrer">
                        See my Instagram review <span aria-hidden>↗</span>
                      </a>
                    )}
                    {storeLink && (
                      <a href={storeLink} target="_blank" rel="noreferrer">
                        Find the book <span aria-hidden>↗</span>
                      </a>
                    )}
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {!shown.length && <p className="read-empty">No books match those filters yet.</p>}
    </section>
  );
}
