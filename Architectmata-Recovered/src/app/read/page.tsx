import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getHomepageCmsContent } from "@/lib/cms/fallback-content";
import { ReadLibrary } from "./read-library";

export const metadata = { title: "Book Library | Architectmata", description: "Children's books selected by conservation architect and educator Manasi Chaudhari." };

export default async function ReadPage() {
  const { bookReviews } = await getHomepageCmsContent();
  return <main className="read-page min-h-screen bg-plaster text-teak dark:bg-[#12150f] dark:text-plaster">
    <header className="read-header">
      <Link href="/" className="read-back"><ArrowLeft size={17}/> Architectmata</Link>
      <p>Architecture through a child&apos;s eyes.</p>
    </header>
    <section className="read-intro">
      <span>THE BOOKSHELF</span>
      <h1>Books that help children look closer.</h1>
      <p>A practical library for parents: architecture, Marathi stories, India and belonging, making, nature, STEM, and places worth noticing.</p>
    </section>
    <ReadLibrary books={bookReviews}/>
  </main>;
}
