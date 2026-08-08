import type { ContentCategory } from "./types";

export const cmsProviderRecommendation = {
  recommended: "Notion",
  reason:
    "Architectmata can use Manasi's existing Notion workspace as the editable notebook while keeping the website design, layout, navigation, and protected image rules in Next.js.",
  alternatives: ["Sanity", "Contentful", "Google Sheets/Docs"]
};

export const editableContentTypes = [
  {
    type: "bookReview",
    label: "Book reviews",
    categories: ["books"] satisfies ContentCategory[],
    supports: ["drafts", "scheduled publishing", "tags", "rich text", "images", "related content"]
  },
  {
    type: "notebookEntry",
    label: "Notebook / blog entries",
    categories: ["notebook", "architecture", "parenting"] satisfies ContentCategory[],
    supports: ["drafts", "scheduled publishing", "tags", "rich text", "image galleries", "featured posts"]
  },
  {
    type: "travelGuide",
    label: "Travel guides",
    categories: ["travel"] satisfies ContentCategory[],
    supports: ["rich text", "image galleries", "maps", "practical tips", "related content"]
  },
  {
    type: "explorerActivity",
    label: "Explorer Club activities",
    categories: ["explorer-club"] satisfies ContentCategory[],
    supports: ["age ranges", "materials", "learning goals", "PDF uploads", "scheduled publishing"]
  },
  {
    type: "printableResource",
    label: "Printable resources",
    categories: ["resources"] satisfies ContentCategory[],
    supports: ["PDF uploads", "tags", "search", "featured resources", "related posts"]
  },
  {
    type: "studioAnnouncement",
    label: "Art class announcements",
    categories: ["studio"] satisfies ContentCategory[],
    supports: ["drafts", "scheduled publishing", "age groups", "location", "inquiry links"]
  },
  {
    type: "homepageFeature",
    label: "Homepage featured content",
    categories: ["homepage"] satisfies ContentCategory[],
    supports: ["featured posts", "featured resources", "hero image", "manual ordering"]
  }
];

export const mediaLibraryFields = [
  "caption",
  "alt text",
  "creator / photographer",
  "credit",
  "copyright",
  "usage permission",
  "public approval",
  "watermark required",
  "related content"
];

export const publishingWorkflow = [
  "Draft",
  "Editorial review",
  "Scheduled",
  "Published",
  "Archived"
];
