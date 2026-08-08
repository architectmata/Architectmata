export const NOTION_VERSION = "2022-06-28";

export const notionDatabaseEnv = {
  bookReviews: "NOTION_BOOK_REVIEWS_DATABASE_ID",
  travelGuides: "NOTION_TRAVEL_GUIDES_DATABASE_ID",
  notebookEntries: "NOTION_NOTEBOOK_ENTRIES_DATABASE_ID",
  resources: "NOTION_RESOURCES_DATABASE_ID",
  studioUpdates: "NOTION_STUDIO_UPDATES_DATABASE_ID"
} as const;

export type NotionDatabaseKey = keyof typeof notionDatabaseEnv;

export function getNotionConfig() {
  const token = process.env.NOTION_API_KEY;
  const databaseIds = {
    bookReviews: process.env.NOTION_BOOK_REVIEWS_DATABASE_ID,
    travelGuides: process.env.NOTION_TRAVEL_GUIDES_DATABASE_ID,
    notebookEntries: process.env.NOTION_NOTEBOOK_ENTRIES_DATABASE_ID,
    resources: process.env.NOTION_RESOURCES_DATABASE_ID,
    studioUpdates: process.env.NOTION_STUDIO_UPDATES_DATABASE_ID
  };

  return {
    token,
    databaseIds,
    isConnected: Boolean(token)
  };
}

export function hasDatabaseId(key: NotionDatabaseKey) {
  const { databaseIds } = getNotionConfig();
  return Boolean(databaseIds[key]);
}
