import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";

import { ClassEnquiryForm } from "@/components/class-enquiry-form";
import { getPublicStudioContent, type PublicStudioClass } from "@/lib/cms/studio-content";

export const metadata: Metadata = {
  title: "Art Classes | Architectmata",
  description:
    "Small-group art classes for children in Redmond, Washington, centered on drawing, colour, observation, and creative expression."
};

const WHATSAPP_URL = "https://wa.me/12068250337";

const fallbackClasses: PublicStudioClass[] = [
  {
    id: "little-makers",
    name: "Little Makers",
    ages: "4–6",
    description: "Playful drawing, colour, shape and visual exploration designed for younger children.",
    availability: "Upcoming October batch · Enquire for schedule and availability",
    displayOrder: 1
  },
  {
    id: "studio-explorers",
    name: "Studio Explorers",
    ages: "7–10",
    description:
      "Drawing, observation, colour, composition and projects that encourage children to make their own creative choices.",
    availability: "Upcoming October batch · Enquire for schedule and availability",
    displayOrder: 2
  },
  {
    id: "young-artists",
    name: "Young Artists",
    ages: "11–14",
    description:
      "More developed drawing and visual-thinking projects with room for personal ideas, experimentation and individual expression.",
    availability: "Upcoming October batch · Enquire for schedule and availability",
    displayOrder: 3
  }
];

const focusAreas = ["Drawing", "Colour", "Observation", "Creative expression"];

function Caption({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta dark:text-marigold">
      {children}
    </p>
  );
}

export default async function ArtClassesPage() {
  const notionContent = await getPublicStudioContent();
  const classes = notionContent.classes.length ? notionContent.classes : fallbackClasses;

  return (
    <main className="min-h-screen overflow-hidden bg-plaster text-teak dark:bg-[#12150f] dark:text-plaster">
      <header className="absolute inset-x-0 top-0 z-30 border-b border-limewash/20 bg-teak/25 backdrop-blur-sm">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <Link className="flex items-center gap-2 text-sm font-semibold text-limewash" href="/">
            <ArrowLeft aria-hidden size={17} /> Architectmata
          </Link>
          <a className="text-sm font-semibold text-limewash" href={WHATSAPP_URL}>
            Enquire on WhatsApp
          </a>
        </nav>
      </header>

      <section className="relative min-h-[78svh] bg-teak text-limewash">
        <Image
          alt="Manasi sketching during heritage documentation on a traditional timber roof"
          className="object-cover"
          fill
          priority
          sizes="100vw"
          src="/images/architectmata/site-sketching-roof.jpg"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#241409]/95 via-[#241409]/80 to-[#241409]/35" />
        <div className="relative mx-auto flex min-h-[78svh] max-w-7xl items-end px-5 pb-16 pt-32 sm:px-8 md:pb-24">
          <div className="max-w-4xl">
            <Caption>Architectmata Studio · Redmond, Washington</Caption>
            <h1 className="mt-5 font-serif text-5xl leading-[0.96] sm:text-6xl md:text-8xl">
              Drawing, colour, observation and creative expression.
            </h1>
            <p className="mt-7 max-w-2xl border-l border-marigold/70 pl-5 text-base leading-8 text-limewash/80 sm:text-lg">
              Small-group art classes for children, designed to help them look closely, explore
              ideas, work confidently with drawing and colour, and develop their own way of
              expressing what they see and imagine.
            </p>
            <a className="button-primary mt-8" href={WHATSAPP_URL}>
              October batches — enquire about availability <ArrowRight aria-hidden size={17} />
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 md:grid-cols-[0.8fr_1.2fr] md:py-28">
        <div>
          <Caption>Class philosophy</Caption>
          <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
            A space to look closely and make freely
          </h2>
        </div>
        <div>
          <p className="max-w-3xl text-lg leading-8 text-teak/75 dark:text-plaster/75">
            Architectmata Studio focuses on drawing, colour, observation and creative expression.
            Children are encouraged to notice details, make their own visual choices and enjoy the
            process of creating rather than simply copying a finished result.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {focusAreas.map((area) => (
              <span className="border border-teak/20 bg-limewash/60 px-4 py-4 text-center text-sm dark:border-plaster/20 dark:bg-plaster/5" key={area}>
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-limewash/60 px-5 py-20 dark:bg-plaster/5 sm:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <Caption>Age groups</Caption>
          <h2 className="mt-4 font-serif text-4xl sm:text-5xl">Find their studio</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {classes.map((studioClass, index) => {
              const [availability, detail] = studioClass.availability.split("·").map((item) => item.trim());
              const accents = ["border-terracotta", "border-peacock", "border-olive"];

              return (
                <article className={`flex min-h-80 flex-col border-t-4 bg-plaster p-7 shadow-line dark:bg-[#1b2018] ${accents[index % accents.length]}`} key={studioClass.id}>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-terracotta dark:text-marigold">
                    Ages {studioClass.ages}
                  </p>
                  <h3 className="mt-8 font-serif text-3xl">{studioClass.name}</h3>
                  <p className="mt-4 flex-1 leading-7 text-teak/70 dark:text-plaster/70">
                    {studioClass.description}
                  </p>
                  <div className="mt-8 border-t border-teak/15 pt-5 text-sm dark:border-plaster/15">
                    <strong className="block">{availability}</strong>
                    <span className="mt-1 block text-teak/65 dark:text-plaster/65">{detail}</span>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-20 sm:px-8 md:grid-cols-2 md:py-28">
        <article className="border border-teak/20 p-7 sm:p-9 dark:border-plaster/20">
          <MapPin aria-hidden className="text-terracotta" size={24} />
          <Caption>Studio details</Caption>
          <h2 className="mt-4 font-serif text-4xl">Redmond, WA</h2>
          <p className="mt-5 leading-7 text-teak/70 dark:text-plaster/70">
            Exact studio location is shared directly with registered families.
          </p>
          <div className="mt-8 border-t border-teak/15 pt-7 dark:border-plaster/15">
            <h3 className="font-serif text-2xl">Small by design</h3>
            <p className="mt-3 leading-7 text-teak/70 dark:text-plaster/70">
              Groups are intentionally kept small so children receive individual attention, have
              room to explore and feel comfortable sharing their ideas.
            </p>
          </div>
        </article>
        <article className="bg-sandstone/30 p-7 sm:p-9 dark:bg-sandstone/10">
          <Caption>About the teacher</Caption>
          <h2 className="mt-4 font-serif text-4xl">Meet Manasi</h2>
          <p className="mt-5 leading-7 text-teak/75 dark:text-plaster/75">
            Manasi is a conservation architect and former architecture educator who brings her
            background in design, observation and visual thinking into children’s art education.
            Architectmata Studio grew from her interest in helping children look closely, stay
            curious and develop confidence in expressing their own ideas.
          </p>
        </article>
      </section>

      <section className="bg-indigo px-5 py-20 text-limewash sm:px-8 md:py-28" id="enquire">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-marigold">October batches</p>
            <h2 className="mt-4 font-serif text-4xl sm:text-5xl">Enquire about a class</h2>
            <p className="mt-5 max-w-md leading-7 text-limewash/75">
              Tell us your child’s age and what days or times may work for your family. Schedules
              will be shaped around interest and availability.
            </p>
            <a className="button-primary mt-8" href={WHATSAPP_URL}>
              Message on WhatsApp <ArrowRight aria-hidden size={17} />
            </a>
          </div>
          <div className="bg-limewash p-6 text-teak sm:p-8">
            <ClassEnquiryForm />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-28">
        <Caption>Inside the studio</Caption>
        <h2 className="mt-4 font-serif text-4xl sm:text-5xl">A glimpse of the space</h2>
        <p className="mt-4 max-w-2xl leading-7 text-teak/65 dark:text-plaster/65">
          {notionContent.images.length
            ? "A few details from Architectmata Studio—children making, experimenting and following their ideas."
            : "Real studio photographs will be added here soon. These spaces are reserved for images from Architectmata Studio—not stock photography."}
        </p>
        {notionContent.images.length ? (
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3">
            {notionContent.images.map((photo, index) => (
              <div className={`relative aspect-square overflow-hidden ${index % 2 ? "mt-8" : ""}`} key={photo.id}>
                <Image alt={photo.alt} className="object-cover" fill sizes="(min-width: 768px) 33vw, 50vw" src={photo.src} />
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
            {["bg-sandstone/45", "bg-peacock/25", "bg-terracotta/30", "bg-olive/30"].map((tone, index) => (
              <div className={`aspect-square border border-teak/15 ${tone} ${index % 2 ? "mt-8" : ""}`} key={tone}>
                <span className="flex h-full items-end p-5 text-sm italic text-teak/65">Studio photograph coming soon</span>
              </div>
            ))}
          </div>
        )}
      </section>

      <footer className="border-t border-teak/15 px-5 py-8 dark:border-plaster/15 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 text-sm">
          <Link className="font-semibold" href="/">Architectmata</Link>
          <p className="text-teak/60 dark:text-plaster/60">Architecture through a child’s eyes.</p>
        </div>
      </footer>
    </main>
  );
}
