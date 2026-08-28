import {
  archiveItems,
  bookReviews,
  fieldImages,
  notebookEntries,
  resources,
  studioPrograms,
  travelStories
} from "@/data/site-content";
import { queryNotionDatabase, queryPublishedDatabase } from "./notion-client";
import {
  getSelect,
  mapNotionBookReview,
  mapNotionMedia,
  mapNotionNotebookEntry,
  mapNotionResource,
  mapNotionStudioUpdate,
  mapNotionTravelGuide
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
  const { isConnected, databaseIds } = getNotionConfig();

  if (!isConnected || !databaseIds.bookReviews) {
    return { books: [], unavailable: true };
  }

  try {
    const notionBookReviews = await queryNotionDatabase(databaseIds.bookReviews, {
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

export async function getHomepageCmsContent() {
  const { isConnected, databaseIds } = getNotionConfig();

  if (!isConnected) {
    return fallbackCmsContent;
  }

  try {
    const [notionBookReviews, notionMedia] = await Promise.all([
      databaseIds.bookReviews ? queryPublishedDatabase("bookReviews") : Promise.resolve([]),
      databaseIds.media ? queryPublishedDatabase("media") : Promise.resolve([])
    ]);

    const mappedResources =
      resources;

    const mappedNotebookEntries =
      notebookEntries;

    return {
      homepageFeatures: {...fallbackCmsContent.homepageFeatures,fieldImages:notionMedia.length?notionMedia.map(mapNotionMedia):fieldImages},
      bookReviews:
        notionBookReviews.length > 0 ? notionBookReviews.map(mapNotionBookReview) : bookReviews,
      travelGuides:
        travelStories,
      notebookEntries: mappedNotebookEntries,
      printableResources: mappedResources,
      studioAnnouncements:
        studioPrograms
    };
  } catch (error) {
    console.error("Notion CMS fetch failed. Falling back to local content.", error);
    return fallbackCmsContent;
  }

  return fallbackCmsContent;
}
