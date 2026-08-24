import "server-only";

import { getNotionConfig } from "./notion-config";
import { queryNotionDatabase } from "./notion-client";
import { getFirstFile, getRichText, getTitle } from "./notion-mappers";

const DEFAULT_CLASSES_DATABASE_ID = "40d63ecb763e420fb886af5160544565";
const DEFAULT_MEDIA_DATABASE_ID = "d1859b65b3c24bc393b2e7ba9254c604";

export type PublicStudioClass = {
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

export type PublicStudioContent = {
  classes: PublicStudioClass[];
  images: PublicStudioImage[];
};

async function getPublicClasses() {
  const databaseId = process.env.NOTION_CLASSES_DATABASE_ID ?? DEFAULT_CLASSES_DATABASE_ID;
  const pages = await queryNotionDatabase(databaseId, {
    filter: {
      property: "Publish to website",
      checkbox: { equals: true }
    },
    sorts: [{ property: "Display order", direction: "ascending" }]
  });

  return pages
    .map((page) => {
      const displayOrder = page.properties["Display order"];

      return {
        id: page.id,
        name: getTitle(page, "Class / Workshop").replace(/\s+[—-]\s+October$/i, ""),
        ages: getRichText(page, "Ages"),
        description: getRichText(page, "Public description"),
        availability: getRichText(page, "Public availability"),
        displayOrder: displayOrder?.type === "number" ? displayOrder.number ?? 0 : 0
      };
    })
    .filter(
      (item) => item.name && item.ages && item.description && item.availability
    )
    .sort((a, b) => a.displayOrder - b.displayOrder);
}

async function getPublicImages() {
  const databaseId = process.env.NOTION_MEDIA_DATABASE_ID ?? DEFAULT_MEDIA_DATABASE_ID;
  const pages = await queryNotionDatabase(databaseId, {
    filter: {
      and: [
        { property: "Website", checkbox: { equals: true } },
        { property: "Status", select: { equals: "Use" } },
        { property: "Use", multi_select: { contains: "Studio" } }
      ]
    }
  });

  return pages
    .map((page) => ({
      id: page.id,
      src: getFirstFile(page, "Photo"),
      alt: getRichText(page, "Alt text") || "Making and artwork at Architectmata Studio"
    }))
    .filter((image) => image.src);
}

export async function getPublicStudioContent(): Promise<PublicStudioContent> {
  const { isConnected } = getNotionConfig();

  if (!isConnected) {
    return { classes: [], images: [] };
  }

  try {
    const [classes, images] = await Promise.all([getPublicClasses(), getPublicImages()]);
    return { classes, images };
  } catch (error) {
    console.error("Notion studio fetch failed. Using local Art Classes fallback.", error);
    return { classes: [], images: [] };
  }
}
