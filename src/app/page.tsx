import Image from "next/image";
import { ArrowRight, Download, Instagram, Mail, PenLine, Send } from "lucide-react";
import { Reveal } from "@/components/motion";
import { ProtectedDrawing } from "@/components/protected-drawing";
import { ThemeToggle } from "@/components/theme-toggle";
import { getHomepageCmsContent } from "@/lib/cms/fallback-content";
import {
  aboutManasi,
  brandBasics,
  imageUseRules,
  ideaSections,
  navItems,
  studioDetails,
} from "@/data/site-content";

const accentClass: Record<string, string> = {
  terracotta: "border-terracotta text-terracotta",
  indigo: "border-indigo text-indigo dark:text-[#8bb5d6]",
  peacock: "border-peacock text-peacock",
  marigold: "border-marigold text-sienna dark:text-marigold",
  olive: "border-olive text-olive dark:text-[#a8b16f]"
};

type HomepageCmsContent = Awaited<ReturnType<typeof getHomepageCmsContent>>;
type ArchiveItem = HomepageCmsContent["homepageFeatures"]["archiveItems"][number];
type FieldImage = HomepageCmsContent["homepageFeatures"]["fieldImages"][number];
type BookReview = HomepageCmsContent["bookReviews"][number];
type TravelStory = HomepageCmsContent["travelGuides"][number];
type StudioProgram = HomepageCmsContent["studioAnnouncements"][number];
type PrintableResource = HomepageCmsContent["printableResources"][number];
type NotebookEntry = HomepageCmsContent["notebookEntries"][number];

export default async function Home() {
  const cmsContent = await getHomepageCmsContent();

  return (
    <main className="min-h-screen overflow-hidden bg-plaster text-teak transition-colors dark:bg-[#12150f] dark:text-plaster">
      <Navigation />
      <NotebookHero />
      <FieldImageStrip images={cmsContent.homepageFeatures.fieldImages} />
      <ArchiveGrid items={cmsContent.homepageFeatures.archiveItems} />
      <DrawingDetails />
      <AboutManasi />
      <IdeasSection />
      <FeaturedBooks books={cmsContent.bookReviews} />
      <TravelStories stories={cmsContent.travelGuides} />
      <StudioSection programs={cmsContent.studioAnnouncements} />
      <ExplorerClubSection resourcesList={cmsContent.printableResources} />
      <NotebookEntries entries={cmsContent.notebookEntries} />
      <Newsletter />
      <Footer />
    </main>
  );
}

function Navigation() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-teak/15 bg-[rgba(255,250,240,0.95)] backdrop-blur-md dark:border-plaster/15 dark:bg-[rgba(18,21,15,0.95)]">
      <nav aria-label="Main navigation" className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <a className="flex items-center gap-3" href="#home" aria-label="Architectmata home">
          <span className="grid h-10 w-10 place-items-center border border-teak/35 bg-terracotta text-sm font-semibold text-limewash dark:border-plaster/30">
            A
          </span>
          <span>
            <span className="block font-serif text-xl font-semibold leading-none">Architectmata</span>
            <span className="hidden text-[0.68rem] uppercase tracking-[0.22em] text-teak/65 dark:text-plaster/65 sm:block">
              {brandBasics.tagline}
            </span>
          </span>
        </a>
        <div className="ml-auto hidden items-center gap-4 lg:flex">
          {navItems.map((item) => (
            <a
              className="text-sm text-teak/75 transition hover:text-terracotta dark:text-plaster/75 dark:hover:text-marigold"
              href={item.href}
              key={item.label}
            >
              {item.label}
            </a>
          ))}
        </div>
        <ThemeToggle />
      </nav>
    </header>
  );
}

function NotebookHero() {
  return (
    <section id="home" className="hero-immersive">
      <Image
        alt="Manasi sketching during heritage documentation on a traditional timber roof"
        src="/images/architectmata/site-sketching-roof.jpg"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="hero-shade" />
      <div className="hero-frame">
        <Reveal className="hero-copy">
          <MuseumCaption>Notebook 01 | Architecture, childhood, memory</MuseumCaption>
          <h1>I&apos;m Manasi, a conservation architect, educator, and mother.</h1>
          <div className="hero-statement">
            <p>
              I believe children don&apos;t just learn from books-they learn from buildings,
              streets, museums, forests, conversations, and the people who tell stories about them.
            </p>
            <p>Architectmata is my notebook of those discoveries.</p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a className="button-primary" href="#observe">
              Start observing <ArrowRight aria-hidden size={18} />
            </a>
            <a className="button-outline" href="/read">
              Open the book shelf
            </a>
          </div>
        </Reveal>
        <div className="hero-note" aria-hidden>
          <span>fieldwork</span>
          <span>timber roof study</span>
          <span>Redrawn as family learning</span>
        </div>
      </div>
    </section>
  );
}

function FieldImageStrip({ images }: { images: FieldImage[] }) {
  return (
    <section className="visual-band">
      <div className="section-shell">
        <div className="visual-band-grid">
          <Reveal className="visual-story">
            <MuseumCaption>What Architectmata feels like</MuseumCaption>
            <h2>A conservation architect&apos;s fieldwork, translated for families.</h2>
            <p>
              Roof timbers, visitor centers, children&apos;s books, museum benches, sketchbooks,
              leaves, construction sites, and home experiments become one way of learning: observe
              first, name later.
            </p>
          </Reveal>
          {images.map((image, index) => (
            <Reveal className={`field-strip-item field-item-${index + 1}`} delay={index * 0.06} key={image.src}>
              {image.src.includes("protected-") ? (
                <div className="field-strip-protected" style={{ backgroundImage: `url(${image.src})` }} />
              ) : (
                <Image
                  alt={image.caption}
                  src={image.src}
                  width={720}
                  height={480}
                  className="h-full w-full object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              )}
              <p>{image.caption}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ArchiveGrid({ items }: { items: ArchiveItem[] }) {
  return (
    <section aria-label="Field notebook archive" className="section-shell">
      <div className="archive-header">
        <SketchDivider label="Pinned archive" />
        <h2>Small exhibits from the living notebook</h2>
      </div>
      <div className="archive-grid archive-grid-finished">
        {items.slice(0, 6).map((item, index) => (
          <Reveal className="archive-slip" delay={index * 0.05} key={item.title}>
            <span className="archive-mark">{item.mark}</span>
            <MuseumCaption>{item.label}</MuseumCaption>
            <h2>{item.title}</h2>
            <p>{item.detail}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function DrawingDetails() {
  const drawings = [
    {
      src: "/images/architectmata/protected-bracket-detail.jpg",
      alt: "Cropped watermarked pencil drawing of a heritage bracket detail",
      caption: "Cropped conservation drawing detail by Manasi Chaudhari. All rights reserved."
    },
    {
      src: "/images/architectmata/protected-capital-detail.jpg",
      alt: "Cropped watermarked pencil drawing of a capital detail",
      caption: "Cropped conservation drawing detail by Manasi Chaudhari. All rights reserved."
    },
    {
      src: "/images/architectmata/protected-shaft-detail.jpg",
      alt: "Cropped watermarked pencil drawing of a shaft detail",
      caption: "Cropped conservation drawing detail by Manasi Chaudhari. All rights reserved."
    }
  ];

  return (
    <section className="drawing-exhibit">
      <div className="section-shell drawing-exhibit-grid">
        <Reveal className="drawing-details-intro">
          <MuseumCaption>Drawing archive</MuseumCaption>
          <h2>Conservation drawing fragments, shared with care.</h2>
          <p>
            Only cropped, watermarked fragments are shown publicly. The complete sheets stay
            private while the linework gives the site its architectural hand.
          </p>
        </Reveal>
        <div className="drawing-gallery">
          {drawings.map((drawing, index) => (
            <Reveal delay={index * 0.06} key={drawing.src}>
              <ProtectedDrawing {...drawing} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutManasi() {
  return (
    <section id="about" className="section-shell">
      <div className="about-layout">
        <Reveal className="about-image">
          <Image
            alt="Conservation fieldwork on a traditional roof"
            src="/images/architectmata/conservation-roof-temple.jpg"
            width={900}
            height={675}
            className="h-full w-full object-cover"
            sizes="(max-width: 1024px) 100vw, 42vw"
          />
        </Reveal>
        <Reveal className="about-copy">
          <MuseumCaption>About Manasi</MuseumCaption>
          <h2>{aboutManasi.intro}</h2>
          <p>{aboutManasi.motherhood}</p>
          <p>{aboutManasi.why}</p>
        </Reveal>
        <Reveal className="credential-sheet" delay={0.1}>
          <div>
            <MuseumCaption>Studied</MuseumCaption>
            {aboutManasi.studied.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
          <div>
            <MuseumCaption>Worked at</MuseumCaption>
            {aboutManasi.worked.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
          <div>
            <MuseumCaption>Currently</MuseumCaption>
            <p>{brandBasics.location}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function IdeasSection() {
  return (
    <section className="section-shell">
      <div className="threshold-heading">
        <MuseumCaption>Five ways into the notebook</MuseumCaption>
        <h2>Five rooms for looking, reading, travelling, making, and remembering.</h2>
      </div>
      <div className="idea-grid">
        {ideaSections.map((idea, index) => (
          <IdeaCard key={idea.verb} idea={idea} index={index} />
        ))}
      </div>
    </section>
  );
}

function IdeaCard({ idea, index }: { idea: (typeof ideaSections)[number]; index: number }) {
  const Icon = idea.icon;

  return (
    <Reveal id={idea.verb === "Observe" ? "observe" : `idea-${idea.verb.toLowerCase()}`} className="idea-card" delay={index * 0.06}>
      <div className={`idea-icon ${accentClass[idea.accent]}`}>
        <Icon aria-hidden size={24} />
      </div>
      <span className="idea-number">0{index + 1}</span>
      <h3>{idea.verb}</h3>
      <h4>{idea.title}</h4>
      <p>{idea.note}</p>
      <a href={idea.href}>
        Visit {idea.verb.toLowerCase()} <ArrowRight aria-hidden size={15} />
      </a>
    </Reveal>
  );
}

function FeaturedBooks({ books }: { books: BookReview[] }) {
  return (
    <section id="read" className="wide-band">
      <div className="section-shell">
      <div className="section-kicker">
        <MuseumCaption>Read</MuseumCaption>
        <h2>Featured children&apos;s book reviews</h2>
        <p>
          The book shelf will grow into a searchable library. For now, each note connects a child&apos;s
          book with one way of observing the world.
        </p>
      </div>
        <div className="book-grid">
          {books.slice(0, 3).map((book, index) => (
            <BookReviewCard book={book} delay={index * 0.08} key={book.title} />
          ))}
        </div>
      </div>
    </section>
  );
}

function BookReviewCard({ book, delay }: { book: BookReview; delay: number }) {
  return (
    <Reveal className="book-card" delay={delay}>
      <div className="book-cover" aria-hidden>
        <span>{book.category}</span>
      </div>
      <div>
        <MuseumCaption>Ages {book.age}</MuseumCaption>
        <h3>{book.title}</h3>
        <p>{book.learns}</p>
        <strong>{book.why}</strong>
      </div>
    </Reveal>
  );
}

function TravelStories({ stories }: { stories: TravelStory[] }) {
  return (
    <section id="explore" className="section-shell">
      <div className="section-kicker">
        <MuseumCaption>Explore</MuseumCaption>
        <h2>Featured travel and heritage stories</h2>
        <p>
          These are family field guides, not tourist checklists: slow routes, visitor centers,
          badges, benches, sketches, and memories.
        </p>
      </div>
      <div className="story-grid">
        {stories.slice(0, 3).map((story, index) => (
          <TravelStoryCard story={story} delay={index * 0.08} key={story.title} />
        ))}
      </div>
    </section>
  );
}

function TravelStoryCard({ story, delay }: { story: TravelStory; delay: number }) {
  return (
    <Reveal className="travel-card" delay={delay}>
      <MuseumCaption>{story.place}</MuseumCaption>
      <h3>{story.title}</h3>
      <p>{story.note}</p>
      <a
        href={story.url ?? "#contact"}
        rel={story.url ? "noreferrer" : undefined}
        target={story.url ? "_blank" : undefined}
      >
        {story.url ? "See full story" : "Read field guide"} <ArrowRight aria-hidden size={15} />
      </a>
    </Reveal>
  );
}

function StudioSection({ programs }: { programs: StudioProgram[] }) {
  return (
    <section id="create" className="section-shell">
      <div className="studio-section">
        <Reveal id="art-classes" className="studio-copy">
          <MuseumCaption>Architectmata Studio</MuseumCaption>
          <h2>Art classes for observing, remembering, and making.</h2>
          <p>
            {studioDetails.philosophy} Classes are {studioDetails.format.toLowerCase()} in{" "}
            {studioDetails.location}, with fees {studioDetails.fees.toLowerCase()}.
          </p>
          <div className="studio-facts">
            {studioDetails.ageGroups.map((group) => (
              <span key={group}>{group}</span>
            ))}
          </div>
          <a className="button-primary mt-8" href="#contact">
            Inquire about classes <Send aria-hidden size={17} />
          </a>
        </Reveal>
        <Reveal className="program-list" delay={0.1}>
          {programs.map((program) => (
            <div key={program}>
              <PenLine aria-hidden size={18} />
              <span>{program}</span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function ExplorerClubSection({ resourcesList }: { resourcesList: PrintableResource[] }) {
  return (
    <section id="explorer-club" className="wide-band">
      <div className="section-shell">
        <div className="resource-heading">
          <div>
            <MuseumCaption>Explorer Club</MuseumCaption>
            <h2>Printables for small observers</h2>
          </div>
          <a className="button-outline dark-button" href="#resources">
            View resources <Download aria-hidden size={16} />
          </a>
        </div>
        <div id="resources" className="resource-grid">
          {resourcesList.slice(0, 4).map((resource, index) => (
            <ResourceCard resource={resource} delay={index * 0.04} key={resource.title} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ResourceCard({ resource, delay }: { resource: PrintableResource; delay: number }) {
  const Icon = resource.icon;

  return (
    <Reveal className="resource-card" delay={delay}>
      <Icon aria-hidden size={22} />
      <div>
        <h3>{resource.title}</h3>
        <p>{resource.type}</p>
      </div>
      <ArrowRight aria-hidden size={15} />
    </Reveal>
  );
}

function NotebookEntries({ entries }: { entries: NotebookEntry[] }) {
  return (
    <section id="remember" className="section-shell">
      <div className="section-kicker">
        <MuseumCaption>Recent notebook entries</MuseumCaption>
        <h2>Blog notes from architecture, motherhood, travel, books, and memory</h2>
      </div>
      <div id="blog" className="entry-grid">
        {entries.slice(0, 3).map((entry, index) => (
          <NotebookEntryCard entry={entry} delay={index * 0.08} key={entry.title} />
        ))}
      </div>
    </section>
  );
}

function NotebookEntryCard({ entry, delay }: { entry: NotebookEntry; delay: number }) {
  const Icon = entry.icon;

  return (
    <Reveal className="entry-card" delay={delay}>
      <Icon aria-hidden size={22} />
      <MuseumCaption>{entry.section}</MuseumCaption>
      <h3>{entry.title}</h3>
      <p>{entry.copy}</p>
    </Reveal>
  );
}

function Newsletter() {
  return (
    <section className="sandstone-band">
      <div className="section-shell newsletter-layout">
        <Reveal>
          <MuseumCaption>Newsletter</MuseumCaption>
          <h2>A monthly letter from the field notebook.</h2>
          <p>
            Booklists, observation prompts, printable activities, studio updates, and quiet notes on
            helping children notice the worlds they move through.
          </p>
        </Reveal>
        <Reveal className="newsletter-panel" delay={0.1}>
          <label htmlFor="email">Email address</label>
          <div className="mt-3 flex flex-col gap-3 sm:flex-row">
            <input id="email" type="email" placeholder="you@example.com" />
            <button type="button">
              Join <Mail aria-hidden size={17} />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contact" className="section-shell pb-12">
      <div className="contact-grid">
        <div>
          <MuseumCaption>Contact</MuseumCaption>
          <h2>For classes, collaborations, reading lists, drawings, and thoughtful hello notes.</h2>
        </div>
        <form className="contact-form">
          <label>
            Name
            <input type="text" />
          </label>
          <label>
            Email
            <input type="email" />
          </label>
          <label>
            Message
            <textarea rows={4} />
          </label>
          <button type="button">Send note</button>
        </form>
      </div>
      <div className="footer-links">
        <a href={`mailto:${brandBasics.email}`}>
          <Mail aria-hidden size={18} /> {brandBasics.email}
        </a>
        <a href={brandBasics.instagramUrl} target="_blank" rel="noreferrer">
          <Instagram aria-hidden size={18} /> {brandBasics.instagram}
        </a>
      </div>
      <div className="image-rules">
        <MuseumCaption>Image use rules</MuseumCaption>
        {imageUseRules.map((rule) => (
          <p key={rule}>{rule}</p>
        ))}
      </div>
      <p className="mt-8 border-t border-teak/15 pt-6 text-sm text-teak/60 dark:border-plaster/15 dark:text-plaster/60">
        {brandBasics.copyright}
      </p>
    </footer>
  );
}

function MuseumCaption({ children }: { children: React.ReactNode }) {
  return <p className="museum-caption">{children}</p>;
}

function SketchDivider({ label }: { label: string }) {
  return (
    <div className="sketch-divider" aria-hidden>
      <span>{label}</span>
    </div>
  );
}
