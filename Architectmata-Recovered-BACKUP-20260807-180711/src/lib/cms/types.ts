export type PublishStatus = "draft" | "scheduled" | "published" | "archived";

export type ContentCategory =
  | "books"
  | "notebook"
  | "travel"
  | "architecture"
  | "parenting"
  | "explorer-club"
  | "resources"
  | "studio"
  | "homepage";

export type UsagePermission =
  | "public"
  | "public-cropped"
  | "private-reference"
  | "do-not-use";

export type CmsImage = {
  id: string;
  src: string;
  alt: string;
  caption: string;
  creator: string;
  credit?: string;
  copyright: string;
  usagePermission: UsagePermission;
  requiresWatermark: boolean;
  approvedForPublicUse: boolean;
};

export type CmsPdf = {
  id: string;
  title: string;
  fileUrl: string;
  description?: string;
};

export type RichTextBlock = {
  type: "paragraph" | "heading" | "quote" | "list";
  text: string;
};

export type CmsEntryBase = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  status: PublishStatus;
  publishAt?: string;
  tags: string[];
  categories: ContentCategory[];
  featured: boolean;
  relatedIds: string[];
  coverImage?: CmsImage;
  gallery: CmsImage[];
  body: RichTextBlock[];
  createdAt: string;
  updatedAt: string;
};

export type BookReviewEntry = CmsEntryBase & {
  contentType: "bookReview";
  bookTitle: string;
  author: string;
  ageRange: string;
  whatChildrenLearn: string[];
  whyItMatters: string;
  relatedActivities: string[];
};

export type NotebookEntry = CmsEntryBase & {
  contentType: "notebookEntry";
  notebookType:
    | "architecture-observation"
    | "parenting-reflection"
    | "memory-note"
    | "studio-note";
};

export type TravelGuideEntry = CmsEntryBase & {
  contentType: "travelGuide";
  place: string;
  region?: string;
  practicalTips: string[];
  childFriendlyAngle: string;
  mapUrl?: string;
};

export type ExplorerActivityEntry = CmsEntryBase & {
  contentType: "explorerActivity";
  ageRange: string;
  materials: string[];
  learningGoal: string;
  downloadable?: CmsPdf;
};

export type PrintableResourceEntry = CmsEntryBase & {
  contentType: "printableResource";
  resourceType: "pdf" | "booklist" | "worksheet" | "journal" | "activity-card";
  downloadable?: CmsPdf;
};

export type StudioAnnouncementEntry = CmsEntryBase & {
  contentType: "studioAnnouncement";
  classFormat: "in-person" | "online" | "hybrid";
  location: string;
  ageRange: string;
  inquiryOnly: boolean;
};

export type HomepageFeatureEntry = {
  id: string;
  slot:
    | "hero"
    | "visual-archive"
    | "featured-book"
    | "featured-travel"
    | "featured-resource"
    | "studio"
    | "newsletter";
  title: string;
  status: PublishStatus;
  publishAt?: string;
  featuredEntryId?: string;
  image?: CmsImage;
  eyebrow?: string;
  copy?: string;
};

export type CmsContentEntry =
  | BookReviewEntry
  | NotebookEntry
  | TravelGuideEntry
  | ExplorerActivityEntry
  | PrintableResourceEntry
  | StudioAnnouncementEntry;
