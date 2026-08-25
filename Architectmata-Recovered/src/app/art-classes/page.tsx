import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";

import { ClassEnquiryForm } from "@/components/class-enquiry-form";
import { getPublicStudioContent } from "@/lib/cms/studio-content";

export const metadata: Metadata = {
  title: "Art Classes | Architectmata",
  description:
    "Small-group art classes for children in Redmond, Washington, centered on drawing, colour, observation, and creative expression."
};

const WHATSAPP_URL = "https://wa.me/12068250337";

const focusAreas = ["Observation", "Line", "Shape", "Proportion", "Colour", "Composition"];

function Caption({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta dark:text-marigold">
      {children}
    </p>
  );
}

export default async function ArtClassesPage() {
  const notionContent = await getPublicStudioContent();

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
              We learn to see before we learn to draw.
            </h1>
            <p className="mt-7 max-w-2xl border-l border-marigold/70 pl-5 text-base leading-8 text-limewash/80 sm:text-lg">
              Small-group drawing classes where children build confidence and visual thinking by
              observing closely and working with line, shape, proportion, colour and composition.
            </p>
            <a className="button-primary mt-8" href="#enquire">
              Ask about current openings <ArrowRight aria-hidden size={17} />
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 md:grid-cols-[0.8fr_1.2fr] md:py-28">
        <div>
          <Caption>Class philosophy</Caption>
          <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
            Art is not about making the same thing
          </h2>
        </div>
        <div>
          <p className="max-w-3xl text-lg leading-8 text-teak/75 dark:text-plaster/75">
            Children observe closely, notice what is distinctive and make their own visual
            decisions. The process of looking, trying, changing and discovering matters as much as
            the finished drawing, so every child can develop confidence in their own way of seeing.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
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
          <Caption>Inside the drawing studio</Caption>
          <h2 className="mt-4 font-serif text-4xl sm:text-5xl">What we are working on now</h2>
          <p className="mt-4 max-w-2xl leading-7 text-teak/65 dark:text-plaster/65">
            A look at the ideas, observation and drawing happening in our current classes.
          </p>

          {notionContent.images.length ? (
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {notionContent.images.map((photo) => (
                <figure key={photo.id}>
                  <div className="relative aspect-[4/3] overflow-hidden bg-plaster dark:bg-[#1b2018]">
                    <Image
                      alt={photo.alt}
                      className="object-cover"
                      fill
                      sizes="(min-width: 640px) 50vw, 100vw"
                      src={photo.src}
                    />
                  </div>
                  <figcaption className="mt-3 text-sm leading-6 text-teak/65 dark:text-plaster/65">
                    {photo.alt}
                  </figcaption>
                </figure>
              ))}
            </div>
          ) : (
            <p className="mt-8 border-l-2 border-terracotta pl-4 text-teak/65 dark:text-plaster/65">
              Studio photographs are being prepared. Please check back soon.
            </p>
          )}

          {notionContent.classes.length ? (
            <div className="mt-12 border-t border-teak/15 pt-8 dark:border-plaster/15">
              <h3 className="font-serif text-2xl">Current class information</h3>
              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {notionContent.classes.map((studioClass) => (
                  <div className="border border-teak/15 bg-plaster/70 p-5 dark:border-plaster/15 dark:bg-plaster/5" key={studioClass.id}>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-terracotta dark:text-marigold">
                      Ages {studioClass.ages}
                    </p>
                    <h4 className="mt-2 font-serif text-xl">{studioClass.name}</h4>
                    <p className="mt-2 text-sm leading-6 text-teak/65 dark:text-plaster/65">
                      {studioClass.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          <a className="button-primary mt-10" href="#enquire">
            Ask about current openings <ArrowRight aria-hidden size={17} />
          </a>
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
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-marigold">Art classes</p>
            <h2 className="mt-4 font-serif text-4xl sm:text-5xl">Enquire about a class</h2>
            <p className="mt-5 max-w-md leading-7 text-limewash/75">
              Tell us your child’s age and what days or times may work for your family. We’ll share
              current openings and the most suitable group.
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

      <footer className="border-t border-teak/15 px-5 py-8 dark:border-plaster/15 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 text-sm">
          <Link className="font-semibold" href="/">Architectmata</Link>
          <p className="text-teak/60 dark:text-plaster/60">Architecture through a child’s eyes.</p>
        </div>
      </footer>
    </main>
  );
}
