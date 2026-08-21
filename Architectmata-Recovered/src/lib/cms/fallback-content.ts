import {
  archiveItems,
  bookReviews,
  fieldImages,
  notebookEntries,
  resources,
  studioPrograms,
  travelStories
} from "@/data/site-content";
import { queryPublishedDatabase } from "./notion-client";
import {
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
