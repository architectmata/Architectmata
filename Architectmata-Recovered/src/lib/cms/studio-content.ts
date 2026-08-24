import "server-only";

import { getNotionConfig } from "./notion-config";
import { queryNotionDataSource } from "./notion-client";
import { getFirstFile, getRichText, getTitle } from "./notion-mappers";

const DEFAULT_CLASSES_DATA_SOURCE_ID = "a7e4de701851432096958f2735bbce14";
const DEFAULT_MEDIA_DATA_SOURCE_ID = "17d529478c0248d2b5c7ba085b00d8df";

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
  const dataSourceId =
    process.env.NOTION_CLASSES_DATA_SOURCE_ID ?? DEFAULT_CLASSES_DATA_SOURCE_ID;
  const pages = await queryNotionDataSource(dataSourceId, {
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
  const dataSourceId = process.env.NOTION_MEDIA_DATA_SOURCE_ID ?? DEFAULT_MEDIA_DATA_SOURCE_ID;
  const pages = await queryNotionDataSource(dataSourceId, {
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

  const [classes, images] = await Promise.all([
    getPublicClasses().catch(() => {
      console.error("Notion Classes query failed. Using static Art Classes fallback.");
      return [];
    }),
    getPublicImages().catch(() => {
      console.error("Notion Media query failed. Using studio image placeholders.");
      return [];
    })
  ]);

  return { classes, images };
}
