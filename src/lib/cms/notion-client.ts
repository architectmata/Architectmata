import { NOTION_DATA_SOURCE_VERSION, NOTION_VERSION, getNotionConfig, type NotionDatabaseKey } from "./notion-config";

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

export type NotionRichText = {
  plain_text: string;
  href: string | null;
  annotations: {
    bold: boolean;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
    code: boolean;
    color: string;
  };
};

type NotionTextBlockValue = {
  rich_text: NotionRichText[];
  color: string;
};

export type NotionBlock = {
  id: string;
  type: string;
  has_children: boolean;
  children?: NotionBlock[];
  paragraph?: NotionTextBlockValue;
  heading_1?: NotionTextBlockValue;
  heading_2?: NotionTextBlockValue;
  heading_3?: NotionTextBlockValue;
  bulleted_list_item?: NotionTextBlockValue;
  numbered_list_item?: NotionTextBlockValue;
  quote?: NotionTextBlockValue;
  divider?: Record<string, never>;
  image?: {
    type: "external" | "file";
    external?: { url: string };
    file?: { url: string; expiry_time?: string };
    caption: NotionRichText[];
  };
};

type NotionBlockChildrenResponse = {
  results: NotionBlock[];
  has_more: boolean;
  next_cursor: string | null;
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

async function notionRequest<T>(
  path: string,
  body: Record<string, unknown>,
  notionVersion = NOTION_VERSION
) {
  const { token } = getNotionConfig();

  if (!token) {
    throw new Error("NOTION_API_KEY is not configured.");
  }

  const response = await fetch(`https://api.notion.com/v1${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "Notion-Version": notionVersion
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

async function notionGet<T>(path: string, notionVersion = NOTION_DATA_SOURCE_VERSION) {
  const { token } = getNotionConfig();

  if (!token) {
    throw new Error("Notion is not configured.");
  }

  const response = await fetch(`https://api.notion.com/v1${path}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Notion-Version": notionVersion
    },
    next: { revalidate: 300 }
  });

  if (!response.ok) {
    throw new Error(`Notion request failed with status ${response.status}.`);
  }

  return (await response.json()) as T;
}

export async function queryNotionDatabase(
  databaseId: string,
  query: Record<string, unknown> = {}
) {
  const pages: NotionPage[] = [];
  let cursor: string | undefined;

  do {
    const data = await notionRequest<NotionQueryResponse>(`/databases/${databaseId}/query`, {
      ...query,
      start_cursor: cursor
    });

    pages.push(...data.results);
    cursor = data.next_cursor ?? undefined;
  } while (cursor);

  return pages;
}

export async function queryNotionDataSource(
  dataSourceId: string,
  query: Record<string, unknown> = {}
) {
  const pages: NotionPage[] = [];
  let cursor: string | undefined;

  do {
    const data = await notionRequest<NotionQueryResponse>(
      `/data_sources/${dataSourceId}/query`,
      {
        ...query,
        start_cursor: cursor
      },
      NOTION_DATA_SOURCE_VERSION
    );

    pages.push(...data.results);
    cursor = data.next_cursor ?? undefined;
  } while (cursor);

  return pages;
}

export async function queryPublishedDatabase(key: NotionDatabaseKey) {
  const { dataSourceIds, databaseIds } = getNotionConfig();

  if (key === "bookReviews") {
    const dataSourceId = dataSourceIds.bookReviews;

    return dataSourceId
      ? queryNotionDataSource(dataSourceId, {
          filter: { property: "Website", checkbox: { equals: true } }
        })
      : [];
  }

  if (key === "contentBank") {
    const dataSourceId = dataSourceIds.contentBank;

    return dataSourceId
      ? queryNotionDataSource(dataSourceId, {
          filter: {
            and: [
              { property: "Website", checkbox: { equals: true } },
              { property: "Status", select: { equals: "Ready" } },
              { property: "Stage", select: { equals: "Publish" } },
              { property: "Output", select: { equals: "Blog Article" } }
            ]
          }
        })
      : [];
  }

  const databaseId = databaseIds.media;

  if (!databaseId) {
    return [];
  }

  return queryNotionDatabase(databaseId, {
    filter: {
      and: [
        { property: "Website", checkbox: { equals: true } },
        { property: "Status", select: { equals: "Use" } }
      ]
    }
  });
}

export async function getNotionBlockChildren(blockId: string): Promise<NotionBlock[]> {
  const blocks: NotionBlock[] = [];
  let cursor: string | undefined;

  do {
    const params = new URLSearchParams({ page_size: "100" });
    if (cursor) {
      params.set("start_cursor", cursor);
    }

    const data = await notionGet<NotionBlockChildrenResponse>(
      `/blocks/${blockId}/children?${params.toString()}`
    );
    blocks.push(...data.results);
    cursor = data.next_cursor ?? undefined;
  } while (cursor);

  return Promise.all(
    blocks.map(async (block) =>
      block.has_children
        ? { ...block, children: await getNotionBlockChildren(block.id) }
        : block
    )
  );
}
