import { cache } from "react";
import {
  getNotionBlockChildren,
  queryNotionDataSource,
  type NotionBlock,
  type NotionPage
} from "./notion-client";
import { getNotionConfig } from "./notion-config";
import {
  getCheckbox,
  getRichText,
  getSelect,
  mapNotionJournalEntry
} from "./notion-mappers";

export const journalPillars = ["Observe", "Read", "Explore", "Create", "Remember"] as const;

export type JournalEntry = ReturnType<typeof mapNotionJournalEntry>;
export type JournalArticle = JournalEntry & { blocks: NotionBlock[] };

const publicationFilter = {
  and: [
    { property: "Website", checkbox: { equals: true } },
    { property: "Status", select: { equals: "Ready" } },
    { property: "Stage", select: { equals: "Publish" } },
    { property: "Output", select: { equals: "Blog Article" } }
  ]
};

function isPublishedJournalPage(page: NotionPage) {
  return (
    getCheckbox(page, "Website") &&
    getSelect(page, "Status") === "Ready" &&
    getSelect(page, "Stage") === "Publish" &&
    getSelect(page, "Output") === "Blog Article"
  );
}

function hasPublishableSlug(page: NotionPage) {
  return Boolean(getRichText(page, "Slug").trim());
}

export async function getJournalEntries() {
  const { isConnected, dataSourceIds } = getNotionConfig();

  if (!isConnected || !dataSourceIds.contentBank) {
    return { entries: [] as JournalEntry[], unavailable: true };
  }

  try {
    const pages = await queryNotionDataSource(dataSourceIds.contentBank, {
      filter: publicationFilter,
      sorts: [{ property: "Date", direction: "descending" }]
    });
    const entries = pages
      .filter((page) => isPublishedJournalPage(page) && hasPublishableSlug(page))
      .map(mapNotionJournalEntry)
      .sort((a, b) => (b.date || "").localeCompare(a.date || ""));

    return { entries, unavailable: false };
  } catch {
    console.error("Notion journal is temporarily unavailable.");
    return { entries: [] as JournalEntry[], unavailable: true };
  }
}

export const getJournalArticle = cache(async (slug: string) => {
  const { isConnected, dataSourceIds } = getNotionConfig();

  if (!isConnected || !dataSourceIds.contentBank) {
    return { article: null as JournalArticle | null, unavailable: true };
  }

  try {
    const pages = await queryNotionDataSource(dataSourceIds.contentBank, {
      filter: {
        and: [
          ...publicationFilter.and,
          { property: "Slug", rich_text: { equals: slug } }
        ]
      },
      page_size: 1
    });
    const page = pages.find((item) => isPublishedJournalPage(item) && getRichText(item, "Slug") === slug);

    if (!page) {
      return { article: null as JournalArticle | null, unavailable: false };
    }

    const blocks = await getNotionBlockChildren(page.id);
    return { article: { ...mapNotionJournalEntry(page), blocks }, unavailable: false };
  } catch {
    console.error("Notion journal article is temporarily unavailable.");
    return { article: null as JournalArticle | null, unavailable: true };
  }
});
