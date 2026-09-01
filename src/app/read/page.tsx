import Header from "@/components/header";
import { isPersonallyReviewedBook } from "@/lib/cms/book-review-status";
import { getBookLibraryContent, getHomepageCmsContent } from "@/lib/cms/fallback-content";
import { ReadLibrary } from "./read-library";

export const metadata = { title: "Book Library | Architectmata", description: "Children's books selected by conservation architect and educator Manasi Chaudhari." };

type ReadPageProps = {
  searchParams: Promise<{ topic?: string | string[] }>;
};

export default async function ReadPage({ searchParams }: ReadPageProps) {
  const [{ books }, { bookReviews }] = await Promise.all([
    getBookLibraryContent(),
    getHomepageCmsContent()
  ]);
  const libraryBooks = books.length > 0 ? books : bookReviews;
  const requestedTopic = (await searchParams).topic;
  const initialTopic =
    typeof requestedTopic === "string" && requestedTopic.toLocaleLowerCase() === "marathi"
      ? "Marathi"
      : "All";

  return <main className="read-page min-h-screen bg-plaster text-teak dark:bg-[#12150f] dark:text-plaster">
    <Header />
    <section className="read-intro">
      <span>THE BOOKSHELF</span>
      <h1>Books that help children look closer.</h1>
      <p>A practical library for parents: architecture, Marathi stories, India and belonging, making, nature, STEM, and places worth noticing.</p>
    </section>
    <ReadLibrary
      initialTopic={initialTopic}
      books={libraryBooks.map((book) => ({
        ...book,
        reviewedByArchitectmata: isPersonallyReviewedBook(book)
      }))}
    />
  </main>;
}
