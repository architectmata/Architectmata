export function isPersonallyReviewedBook(book: unknown) {
  if (!book || typeof book !== "object") return false;

  const instagramLink = "instagramLink" in book && typeof book.instagramLink === "string"
    ? book.instagramLink
    : "";
  const status = "status" in book && typeof book.status === "string" ? book.status : "";

  return Boolean(instagramLink.trim() || status.trim().toLowerCase() === "reviewed");
}
