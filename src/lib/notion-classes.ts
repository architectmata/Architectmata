import 'server-only';

const NOTION_VERSION = '2022-06-28';
const DEFAULT_CLASSES_DATABASE_ID = '40d63ecb763e420fb886af5160544565';
const DEFAULT_MEDIA_DATABASE_ID = 'd1859b65b3c24bc393b2e7ba9254c604';

type TextItem = {plain_text: string};
type NotionFile =
  | {type: 'external'; external: {url: string}}
  | {type: 'file'; file: {url: string; expiry_time?: string}};

type NotionProperty =
  | {type: 'title'; title: TextItem[]}
  | {type: 'rich_text'; rich_text: TextItem[]}
  | {type: 'select'; select: {name: string} | null}
  | {type: 'multi_select'; multi_select: Array<{name: string}>}
  | {type: 'checkbox'; checkbox: boolean}
  | {type: 'number'; number: number | null}
  | {type: 'files'; files: NotionFile[]};

type NotionPage = {
  id: string;
  properties: Record<string, NotionProperty>;
};

type QueryResponse = {results: NotionPage[]};

export type PublicClass = {
  id: string;
  name: string;
  ages: string;
  description: string;
  availability: string;
  displayOrder: number;
};

export type PublicStudioImage = {
  id: string;
  src: string;
  alt: string;
};

function text(items: TextItem[] | undefined) {
  return items?.map((item) => item.plain_text).join('').trim() ?? '';
}

function title(page: NotionPage, name: string) {
  const value = page.properties[name];
  return value?.type === 'title' ? text(value.title) : '';
}

function richText(page: NotionPage, name: string) {
  const value = page.properties[name];
  return value?.type === 'rich_text' ? text(value.rich_text) : '';
}

function number(page: NotionPage, name: string) {
  const value = page.properties[name];
  return value?.type === 'number' ? value.number ?? 0 : 0;
}

function firstFile(page: NotionPage, name: string) {
  const value = page.properties[name];
  if (value?.type !== 'files' || !value.files[0]) return '';
  const file = value.files[0];
  return file.type === 'external' ? file.external.url : file.file.url;
}

async function queryDatabase(databaseId: string, body: Record<string, unknown>) {
  const token = process.env.NOTION_API_KEY;
  if (!token) return [];

  const response = await fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Notion-Version': NOTION_VERSION,
    },
    body: JSON.stringify(body),
    next: {revalidate: 300},
  });

  if (!response.ok) {
    throw new Error(`Notion query failed with status ${response.status}`);
  }

  return ((await response.json()) as QueryResponse).results;
}

async function getPublicClasses(): Promise<PublicClass[]> {
  const databaseId = process.env.NOTION_CLASSES_DATABASE_ID ?? DEFAULT_CLASSES_DATABASE_ID;
  const pages = await queryDatabase(databaseId, {
    filter: {property: 'Publish to website', checkbox: {equals: true}},
    sorts: [{property: 'Display order', direction: 'ascending'}],
  });

  return pages
    .map((page) => ({
      id: page.id,
      name: title(page, 'Class / Workshop').replace(/\s+[—-]\s+October$/i, ''),
      ages: richText(page, 'Ages'),
      description: richText(page, 'Public description'),
      availability: richText(page, 'Public availability'),
      displayOrder: number(page, 'Display order'),
    }))
    .filter((item) => item.name && item.ages && item.description && item.availability)
    .sort((a, b) => a.displayOrder - b.displayOrder);
}

async function getPublicStudioImages(): Promise<PublicStudioImage[]> {
  const databaseId = process.env.NOTION_MEDIA_DATABASE_ID ?? DEFAULT_MEDIA_DATABASE_ID;
  const pages = await queryDatabase(databaseId, {
    filter: {
      and: [
        {property: 'Website', checkbox: {equals: true}},
        {property: 'Status', select: {equals: 'Use'}},
        {property: 'Use', multi_select: {contains: 'Studio'}},
      ],
    },
  });

  return pages
    .map((page) => ({
      id: page.id,
      src: firstFile(page, 'Photo'),
      alt: richText(page, 'Alt text') || 'Artwork and making at Architectmata Studio',
    }))
    .filter((image) => image.src);
}

export async function getPublicStudioContent() {
  if (!process.env.NOTION_API_KEY) {
    return {classes: [], images: []};
  }

  try {
    const [classes, images] = await Promise.all([getPublicClasses(), getPublicStudioImages()]);
    return {classes, images};
  } catch (error) {
    console.error('Notion studio content fetch failed; using local fallback.', error);
    return {classes: [], images: []};
  }
}
