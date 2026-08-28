import {
  archiveItems,
  bookReviews,
  fieldImages,
  notebookEntries,
  resources,
  studioPrograms,
  travelStories
} from "@/data/site-content";
import { queryNotionDataSource, queryPublishedDatabase } from "./notion-client";
import {
  getSelect,
  mapNotionBookReview,
  mapNotionMedia
} from "./notion-mappers";
import { getNotionConfig } from "./notion-config";

export const fallbackCmsContent = {
  homepageFeatures: {
    archiveItems,
    fieldImages
  },
  bookReviews,
  travelGuides: travelStories,
  notebookEntries,
  printableResources: resources,
  studioAnnouncements: studioPrograms
};

export async function getBookLibraryContent() {
  const { isConnected, dataSourceIds } = getNotionConfig();

  if (!isConnected || !dataSourceIds.bookReviews) {
    return { books: [], unavailable: true };
  }

  try {
    const notionBookReviews = await queryNotionDataSource(dataSourceIds.bookReviews, {
      filter: { property: "Status", select: { does_not_equal: "Archive" } }
    });
    const books = notionBookReviews
      .filter((page) => getSelect(page, "Status") !== "Archive")
      .map(mapNotionBookReview);

    return { books, unavailable: false };
  } catch (error) {
    console.error("Notion book library fetch failed.", error);
    return { books: [], unavailable: true };
  }
}

export async function getBookLibraryBook(slug: string) {
  const { isConnected, dataSourceIds } = getNotionConfig();

  if (!isConnected || !dataSourceIds.bookReviews) {
    return { book: null, unavailable: true };
  }

  try {
    const notionBookReviews = await queryNotionDataSource(dataSourceIds.bookReviews, {
      filter: {
        and: [
          { property: "Slug", rich_text: { equals: slug } },
          { property: "Status", select: { does_not_equal: "Archive" } }
        ]
      },
      page_size: 1
    });
    const page = notionBookReviews.find((item) => getSelect(item, "Status") !== "Archive");

    return { book: page ? mapNotionBookReview(page) : null, unavailable: false };
  } catch (error) {
    console.error("Notion book review fetch failed.", error);
    return { book: null, unavailable: true };
  }
}

export async function getHomepageCmsContent() {
  const { isConnected, dataSourceIds, databaseIds } = getNotionConfig();

  if (!isConnected) {
    return fallbackCmsContent;
  }

  const [bookResult, mediaResult] = await Promise.allSettled([
    dataSourceIds.bookReviews ? queryPublishedDatabase("bookReviews") : Promise.resolve([]),
    databaseIds.media ? queryPublishedDatabase("media") : Promise.resolve([])
  ]);

  if (bookResult.status === "rejected") {
    const error = bookResult.reason;
    console.error(
      "Notion homepage books fetch failed. Using local book reviews.",
      error instanceof Error ? `${error.name}: ${error.message}` : "Unknown error"
    );
  }

  if (mediaResult.status === "rejected") {
    const error = mediaResult.reason;
    console.error(
      "Notion homepage media fetch failed. Using local field images.",
      error instanceof Error ? `${error.name}: ${error.message}` : "Unknown error"
    );
  }

  const notionBookReviews = bookResult.status === "fulfilled" ? bookResult.value : [];
  const notionMedia = mediaResult.status === "fulfilled" ? mediaResult.value : [];

  return {
    homepageFeatures: {
      ...fallbackCmsContent.homepageFeatures,
      fieldImages: notionMedia.length ? notionMedia.map(mapNotionMedia) : fieldImages
    },
    bookReviews:
      notionBookReviews.length > 0 ? notionBookReviews.map(mapNotionBookReview) : bookReviews,
    travelGuides: travelStories,
    notebookEntries,
    printableResources: resources,
    studioAnnouncements: studioPrograms
  };
}
