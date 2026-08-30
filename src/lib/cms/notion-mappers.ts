import { getLocalBookCover } from "@/lib/book-images";
import type { NotionFileObject, NotionPage, NotionProperty } from "./notion-client";

function property(page: NotionPage, name: string): NotionProperty | undefined {
  return page.properties[name];
}

function plainText(items?: Array<{ plain_text: string }>) {
  return items?.map((item) => item.plain_text).join("").trim() ?? "";
}

function textItems(value: NotionProperty, key: "title" | "rich_text") {
  return (value as unknown as Record<typeof key, Array<{ plain_text: string }>>)[key];
}

export function getTitle(page: NotionPage, name = "Title") {
  const value = property(page, name);
  return value?.type === "title" ? plainText(textItems(value, "title")) : "";
}

export function getRichText(page: NotionPage, name: string) {
  const value = property(page, name);
  return value?.type === "rich_text" ? plainText(textItems(value, "rich_text")) : "";
}

export function getSelect(page: NotionPage, name: string) {
  const value = property(page, name);
  return value?.type === "select" ? value.select?.name ?? "" : "";
}

export function getMultiSelect(page: NotionPage, name: string) {
  const value = property(page, name);
  return value?.type === "multi_select" ? value.multi_select.map((item) => item.name) : [];
}

export function getCheckbox(page: NotionPage, name: string) {
  const value = property(page, name);
  return value?.type === "checkbox" ? value.checkbox : false;
}

export function getDate(page: NotionPage, name: string) {
  const value = property(page, name);
  return value?.type === "date" ? value.date?.start ?? "" : "";
}

export function getUrl(page: NotionPage, name: string) {
  const value = property(page, name);
  return value?.type === "url" ? value.url ?? "" : "";
}

export function getNumber(page: NotionPage, name: string) {
  const value = property(page, name);
  return value?.type === "number" ? value.number : null;
}

function fileUrl(file?: NotionFileObject | null) {
  if (!file) {
    return "";
  }

  return file.type === "external" ? file.external.url : file.file.url;
}

export function getFirstFile(page: NotionPage, name: string) {
  const value = property(page, name);
  return value?.type === "files" ? fileUrl(value.files[0]) : "";
}

export function getCoverImage(page: NotionPage) {
  return fileUrl(page.cover);
}

export function mapNotionBookReview(page: NotionPage) {
  const categories = getMultiSelect(page, "Category");
  const title = getTitle(page, "Book");

  return {
    id: page.id,
    title,
    author: getRichText(page, "Author"),
    category: categories[0] ?? "",
    categories,
    age: getMultiSelect(page, "Age").join(", "),
    language: getMultiSelect(page, "Language").join(", "),
    readingLevel: getSelect(page, "Reading Level"),
    readingHistory: getSelect(page, "My Reading History"),
    status: getSelect(page, "Status"),
    learns: getRichText(page, "Try This") || getRichText(page, "Themes"),
    why: getRichText(page, "Why I Recommend It") || getRichText(page, "Parent Note"),
    slug: getRichText(page, "Slug"),
    tags: getMultiSelect(page, "Tags"),
    featured: getCheckbox(page, "Featured"),
    date: getDate(page, "Date"),
    architectmataPick: getCheckbox(page, "Architectmata Pick"),
    reviewOrder: getNumber(page, "Review Order"),
    coverImage: getFirstFile(page, "Cover") || getCoverImage(page) || getLocalBookCover(title),
    imageCaption: getRichText(page, "Image Caption"),
    imagePermissionStatus: getSelect(page, "Image Permission Status"),
    excerpt: getRichText(page, "Excerpt"),
    body: getRichText(page, "Body Content"),
    buyLink: getUrl(page, "Buy Link"),
    amazonLink: getUrl(page, "Amazon / Storefront"),
    instagramLink: getUrl(page, "Instagram Link")
  };
}

export function mapNotionMedia(page: NotionPage) {
  return {src:getFirstFile(page,"Photo")||getCoverImage(page),caption:getRichText(page,"Caption")||getTitle(page,"Photo / Asset")};
}

export function mapNotionTravelGuide(page: NotionPage) {
  return {
    title: getTitle(page),
    place: getSelect(page, "Category") || getRichText(page, "Place"),
    note: getRichText(page, "Excerpt"),
    slug: getRichText(page, "Slug"),
    tags: getMultiSelect(page, "Tags"),
    featured: getCheckbox(page, "Featured"),
    date: getDate(page, "Date"),
    coverImage: getFirstFile(page, "Cover Image") || getCoverImage(page),
    imageCaption: getRichText(page, "Image Caption"),
    imagePermissionStatus: getSelect(page, "Image Permission Status"),
    body: getRichText(page, "Body Content")
  };
}

export function mapNotionNotebookEntry(page: NotionPage) {
  return {
    section: getSelect(page, "Category") || "Notebook",
    title: getTitle(page),
    copy: getRichText(page, "Excerpt"),
    slug: getRichText(page, "Slug"),
    tags: getMultiSelect(page, "Tags"),
    featured: getCheckbox(page, "Featured"),
    date: getDate(page, "Date"),
    coverImage: getFirstFile(page, "Cover Image") || getCoverImage(page),
    imageCaption: getRichText(page, "Image Caption"),
    imagePermissionStatus: getSelect(page, "Image Permission Status"),
    body: getRichText(page, "Body Content")
  };
}

export function mapNotionResource(page: NotionPage) {
  return {
    title: getTitle(page),
    type: getSelect(page, "Category") || "Resource",
    slug: getRichText(page, "Slug"),
    tags: getMultiSelect(page, "Tags"),
    featured: getCheckbox(page, "Featured"),
    date: getDate(page, "Date"),
    coverImage: getFirstFile(page, "Cover Image") || getCoverImage(page),
    pdf: getFirstFile(page, "PDF Upload"),
    imageCaption: getRichText(page, "Image Caption"),
    imagePermissionStatus: getSelect(page, "Image Permission Status"),
    excerpt: getRichText(page, "Excerpt"),
    body: getRichText(page, "Body Content")
  };
}

export function mapNotionStudioUpdate(page: NotionPage) {
  return {
    title: getTitle(page),
    summary: getRichText(page, "Excerpt"),
    slug: getRichText(page, "Slug"),
    category: getSelect(page, "Category") || "Studio",
    tags: getMultiSelect(page, "Tags"),
    featured: getCheckbox(page, "Featured"),
    date: getDate(page, "Date"),
    coverImage: getFirstFile(page, "Cover Image") || getCoverImage(page),
    imageCaption: getRichText(page, "Image Caption"),
    imagePermissionStatus: getSelect(page, "Image Permission Status"),
    body: getRichText(page, "Body Content")
  };
}

export function mapNotionJournalEntry(page: NotionPage) {
  return {
    id: page.id,
    title: getTitle(page),
    hook: getRichText(page, "Hook") || getRichText(page, "Notes"),
    pillar: getSelect(page, "Pillar"),
    category: getSelect(page, "Category") || getMultiSelect(page, "Category").join(", "),
    date: getDate(page, "Date"),
    slug: getRichText(page, "Slug"),
    featured: getCheckbox(page, "Featured")
  };
}
