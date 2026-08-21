export const NOTION_VERSION = "2022-06-28";
export const notionDatabaseEnv = {bookReviews:"NOTION_BOOK_LIBRARY_DATABASE_ID",media:"NOTION_MEDIA_LIBRARY_DATABASE_ID"} as const;
export type NotionDatabaseKey = keyof typeof notionDatabaseEnv;
export function getNotionConfig(){const token=process.env.NOTION_API_KEY;return{token,databaseIds:{bookReviews:process.env.NOTION_BOOK_LIBRARY_DATABASE_ID,media:process.env.NOTION_MEDIA_LIBRARY_DATABASE_ID},isConnected:Boolean(token)};}
