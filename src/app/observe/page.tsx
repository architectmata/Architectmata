import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Camera, Eye, Search, Sparkles } from "lucide-react";
import Header from "@/components/header";
import { getBookLibraryBookByTitle } from "@/lib/cms/fallback-content";

export const metadata: Metadata = {
  title: "Observe",
  description: "Field notes and simple activities for looking more closely at everyday architecture."
};

const observationSteps = [
  { label: "Notice", copy: "What do you see first?", icon: Eye },
  { label: "Look closer", copy: "Find words, dates, symbols, and patterns.", icon: Search },
  { label: "Wonder", copy: "Why was it designed this way?", icon: Sparkles },
  { label: "Discover", copy: "What can you learn about the place?", icon: ArrowRight },
  { label: "Try it", copy: "Photograph one detail in your neighborhood.", icon: Camera }
];

export default async function ObservePage() {
  const { book: bicycleBook } = await getBookLibraryBookByTitle("I Cannot Draw a Bicycle");

  return (
    <main className="min-h-screen bg-plaster text-teak transition-colors dark:bg-[#12150f] dark:text-plaster">
      <Header />

      <section className="section-shell observe-hero">
        <p className="museum-caption">Observe</p>
        <h1>Look closer at the things most people walk past.</h1>
        <p className="observe-intro">
          Architecture is not only monuments and famous buildings. Streets, drains, signs, doors,
          paving, materials, and tiny details can tell us how a place works and what it remembers.
        </p>
      </section>

      <section className="wide-band">
        <div className="section-shell observe-layout">
          <article className="observe-note" id="field-note-01">
            <p className="museum-caption">Look Down · Field Note 01</p>
            <h2>What can a manhole cover tell you about a city?</h2>
            <div className="observe-note-copy">
              <p>
                I have a habit of photographing beautiful manhole covers. Sometimes the most ordinary
                things under our feet tell us something about a place: its history, identity, industry,
                infrastructure, or something important that happened nearby.
              </p>
              <p>
                I first started noticing them after learning about the designed manhole covers of
                Chandigarh. Chandigarh was India&apos;s first major planned city after Independence, and
                some older covers carry a representation of the city plan itself.
              </p>
              <p>
                Since then, I look down when I walk through a new place. These small pieces of design
                are easy to walk over, but they can become clues to reading a city.
              </p>
              <p>
                Architecture isn&apos;t always something you have to look up to see. Sometimes, you have
                to look down.
              </p>
            </div>
          </article>

          <aside className="observe-activity" aria-labelledby="observation-walk-title">
            <p className="museum-caption">Try it where you live</p>
            <h2 id="observation-walk-title">Take a one-block observation walk.</h2>
            <p>
              Find one unusual cover, paving pattern, utility marking, or street detail. Stop and look
              at its words, symbols, date, material, and pattern. Ask: why might it look this way, and
              what does it tell us about this place?
            </p>
            <ol>
              {observationSteps.map(({ label, copy, icon: Icon }) => (
                <li key={label}>
                  <Icon aria-hidden size={18} strokeWidth={1.6} />
                  <span><strong>{label}</strong> — {copy}</span>
                </li>
              ))}
            </ol>
            {bicycleBook ? (
              <div className="mt-8 border-t border-teak/15 pt-6 dark:border-plaster/15">
                <p className="museum-caption">Related reading</p>
                <h3 className="mt-3 font-serif text-2xl italic">{bicycleBook.title}</h3>
                {bicycleBook.author ? (
                  <p className="mt-1 text-sm text-teak/60 dark:text-plaster/60">by {bicycleBook.author}</p>
                ) : null}
                <p className="mt-4 text-sm leading-6 text-teak/70 dark:text-plaster/70">
                  A book about simple shapes, observation, perspective, experimentation and visual
                  thinking—and why drawing is not only about making something look “correct.”
                </p>
                <Link className="mt-5 inline-flex text-sm font-semibold text-terracotta hover:underline dark:text-marigold" href="/read">
                  Find it in the book library <ArrowRight aria-hidden size={15} />
                </Link>
              </div>
            ) : null}
          </aside>
        </div>
      </section>
    </main>
  );
}
