import { NOTION_VERSION, getNotionConfig, type NotionDatabaseKey } from "./notion-config";

type NotionQueryResponse = {
  results: NotionPage[];
  has_more: boolean;
  next_cursor: string | null;
};

export type NotionPage = {
  id: string;
  created_time: string;
  last_edited_time: string;
  cover: NotionFileObject | null;
  properties: Record<string, NotionProperty>;
};

export type NotionFileObject =
  | { type: "external"; external: { url: string } }
  | { type: "file"; file: { url: string; expiry_time: string } };

export type NotionProperty =
  | { type: "title"; title: Array<{ plain_text: string }> }
  | { type: "rich_text"; rich_text: Array<{ plain_text: string }> }
  | { type: "select"; select: null | { name: string } }
  | { type: "multi_select"; multi_select: Array<{ name: string }> }
  | { type: "checkbox"; checkbox: boolean }
  | { type: "date"; date: null | { start: string; end?: string | null } }
  | { type: "files"; files: NotionFileObject[] }
  | { type: "url"; url: string | null }
  | { type: "number"; number: number | null }
  | { type: "email"; email: string | null }
  | { type: "phone_number"; phone_number: string | null };

async function notionRequest<T>(path: string, body: Record<string, unknown>) {
  const { token } = getNotionConfig();

  if (!token) {
    throw new Error("NOTION_API_KEY is not configured.");
  }

  const response = await fetch(`https://api.notion.com/v1${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "Notion-Version": NOTION_VERSION
    },
    body: JSON.stringify(body),
    next: { revalidate: 300 }
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Notion API error ${response.status}: ${text}`);
  }

  return (await response.json()) as T;
}

export async function queryPublishedDatabase(key: NotionDatabaseKey) {
  const { databaseIds } = getNotionConfig();
  const databaseId = databaseIds[key];

  if (!databaseId) {
    return [];
  }

  const pages: NotionPage[] = [];
  let cursor: string | undefined;

  do {
    const filter = key === "bookReviews"
      ? { property: "Website", checkbox: { equals: true } }
      : { and: [{ property: "Website", checkbox: { equals: true } }, { property: "Status", select: { equals: "Use" } }] };
    const data = await notionRequest<NotionQueryResponse>(`/databases/${databaseId}/query`, {filter,start_cursor:cursor});

    pages.push(...data.results);
    cursor = data.next_cursor ?? undefined;
  } while (cursor);

  return pages;
}
