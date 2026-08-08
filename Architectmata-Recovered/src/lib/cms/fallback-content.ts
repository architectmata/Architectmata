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
    const [
      notionBookReviews,
      notionTravelGuides,
      notionNotebookEntries,
      notionResources,
      notionStudioUpdates
    ] = await Promise.all([
      databaseIds.bookReviews ? queryPublishedDatabase("bookReviews") : Promise.resolve([]),
      databaseIds.travelGuides ? queryPublishedDatabase("travelGuides") : Promise.resolve([]),
      databaseIds.notebookEntries ? queryPublishedDatabase("notebookEntries") : Promise.resolve([]),
      databaseIds.resources ? queryPublishedDatabase("resources") : Promise.resolve([]),
      databaseIds.studioUpdates ? queryPublishedDatabase("studioUpdates") : Promise.resolve([])
    ]);

    const mappedResources =
      notionResources.length > 0
        ? notionResources.map((page, index) => ({
            ...mapNotionResource(page),
            icon: resources[index % resources.length].icon
          }))
        : resources;

    const mappedNotebookEntries =
      notionNotebookEntries.length > 0
        ? notionNotebookEntries.map((page, index) => ({
            ...mapNotionNotebookEntry(page),
            icon: notebookEntries[index % notebookEntries.length].icon
          }))
        : notebookEntries;

    return {
      homepageFeatures: fallbackCmsContent.homepageFeatures,
      bookReviews:
        notionBookReviews.length > 0 ? notionBookReviews.map(mapNotionBookReview) : bookReviews,
      travelGuides:
        notionTravelGuides.length > 0 ? notionTravelGuides.map(mapNotionTravelGuide) : travelStories,
      notebookEntries: mappedNotebookEntries,
      printableResources: mappedResources,
      studioAnnouncements:
        notionStudioUpdates.length > 0
          ? notionStudioUpdates.map(mapNotionStudioUpdate).map((update) => update.title)
          : studioPrograms
    };
  } catch (error) {
    console.error("Notion CMS fetch failed. Falling back to local content.", error);
    return fallbackCmsContent;
  }

  return fallbackCmsContent;
}
