import Image from 'next/image';
import Link from 'next/link';
import type {ReactNode} from 'react';
import {ArrowRight,ArrowUpRight,Instagram} from '@/components/icons';
import {Eyebrow} from '@/components/ui';

const shopMyBase = 'https://shopmy.us/architectmata';

const quickLinks = [
  {
    title: 'Shop the current favorites',
    note: 'The links most people ask for after seeing a Reel or TikTok.',
    href: shopMyBase,
    tone: 'bg-ink text-paper',
  },
  {
    title: 'Kids books worth owning',
    note: 'Beautiful picture books, early readers, and family read-alouds.',
    href: `${shopMyBase}/collections/kids-books`,
    tone: 'bg-sun text-ink',
  },
  {
    title: 'Art supplies we actually use',
    note: 'Open-ended materials for weekends, quiet afternoons, and classes.',
    href: `${shopMyBase}/collections/art-supplies`,
    tone: 'bg-sky text-ink',
  },
  {
    title: 'Family travel kit',
    note: 'Small things that make museums, road trips, and walks easier.',
    href: `${shopMyBase}/collections/family-travel`,
    tone: 'bg-clay text-paper',
  },
];

const collections = [
  {
    name: 'Kids Books',
    dek: 'Stories that build observation, language, and a sense of place.',
    href: `${shopMyBase}/collections/kids-books`,
    color: 'bg-sun/45',
    items: ['Architecture', 'Nature', 'Marathi', 'Read-alouds'],
  },
  {
    name: 'Creative Play',
    dek: 'Supplies that invite making without turning the table into a project factory.',
    href: `${shopMyBase}/collections/creative-play`,
    color: 'bg-rose/45',
    items: ['Drawing', 'Paper', 'Clay', 'STEM toys'],
  },
  {
    name: 'Family Outings',
    dek: 'Museum bags, field kits, snack helpers, and travel pieces for curious days out.',
    href: `${shopMyBase}/collections/family-outings`,
    color: 'bg-sky/55',
    items: ['Travel', 'Museums', 'Nature walks', 'Car bag'],
  },
];

const proofPoints = [
  'Picked by a conservation architect, educator, and parent',
  'Designed for Instagram and TikTok bio traffic',
  'Fast paths to ShopMy collections and current favorites',
];

function ShopButton({
  href,
  children,
  className = '',
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 py-3 text-center text-sm font-bold uppercase tracking-[.1em] transition hover:-translate-y-1 hover:shadow-soft ${className}`}
    >
      {children}
      <ArrowUpRight size={18} />
    </a>
  );
}

function PhonePreview() {
  return (
    <div className="mx-auto w-full max-w-[380px] rounded-[2rem] border border-ink/15 bg-ink p-3 shadow-field">
      <div className="overflow-hidden rounded-[1.45rem] bg-paper text-ink">
        <div className="relative aspect-[4/3]">
          <Image
            src="/images/field-notes/manasi-yellow-portrait.jpg"
            alt="Manasi with a child-friendly field-note style backdrop"
            fill
            priority
            sizes="(min-width:1024px) 360px, 88vw"
            className="object-cover"
          />
        </div>
        <div className="p-5">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[.14em] text-clay">
            <Instagram size={16} />
            <span>@architectmata</span>
          </div>
          <h2 className="mt-3 font-serif text-3xl leading-tight">The links from today&apos;s post</h2>
          <div className="mt-5 space-y-2">
            {quickLinks.slice(0,3).map((link) => (
              <a
                key={link.title}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className={`flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-bold ${link.tone}`}
              >
                <span>{link.title}</span>
                <ArrowUpRight size={17} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <section className="blueprint-paper relative overflow-hidden px-5 pb-16 pt-28 md:px-10 md:pb-20 md:pt-32">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_.95fr]">
          <div className="relative z-10">
            <div className="mb-7 flex items-center gap-4">
              <span className="h-px w-12 bg-clay" />
              <Eyebrow>Architectmata shop guide</Eyebrow>
            </div>
            <h1 className="max-w-4xl font-serif text-5xl leading-[.96] md:text-7xl xl:text-[6.5rem]">
              Thoughtful finds for curious kids and family days.
            </h1>
            <p className="mt-7 max-w-2xl border-l border-pencil pl-5 text-lg leading-relaxed text-ink/72 dark:text-paper/75 md:text-xl">
              Books, art materials, travel helpers, and small family-life upgrades, curated by Manasi of Architectmata for parents arriving from Instagram and TikTok.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ShopButton href={shopMyBase} className="bg-ink text-paper">
                Shop my favorites
              </ShopButton>
              <Link
                href="#quick-links"
                className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-ink/20 bg-paper/80 px-5 py-3 text-center text-sm font-bold uppercase tracking-[.1em] transition hover:-translate-y-1 dark:border-paper/20 dark:bg-ink/60"
              >
                Find a category
                <ArrowRight size={18} />
              </Link>
            </div>
            <div className="mt-8 grid gap-3 text-sm text-ink/65 dark:text-paper/65 md:grid-cols-3">
              {proofPoints.map((point) => (
                <p key={point} className="border-t border-pencil pt-3">
                  {point}
                </p>
              ))}
            </div>
          </div>
          <PhonePreview />
        </div>
        <span className="absolute bottom-5 left-5 font-note text-xs text-ink/45 md:left-10">
          Save this page as the link in bio.
        </span>
      </section>

      <section id="quick-links" className="paper-section px-5 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow>Fastest path to ShopMy</Eyebrow>
          <h2 className="font-serif text-4xl leading-tight md:text-6xl">Tap the list you came for.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-ink/65 dark:text-paper/65">
            Built for one-handed scrolling from Instagram Stories, Reels, TikTok captions, and saved posts.
          </p>
        </div>
        <div className="mx-auto mt-10 grid max-w-5xl gap-3">
          {quickLinks.map((link) => (
            <a
              key={link.title}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className={`focus-ring group grid gap-2 rounded-[1.5rem] p-5 transition hover:-translate-y-1 hover:shadow-soft md:grid-cols-[1fr_auto] md:items-center ${link.tone}`}
            >
              <span>
                <span className="block font-serif text-2xl leading-tight md:text-3xl">{link.title}</span>
                <span className="mt-1 block max-w-xl text-sm opacity-75">{link.note}</span>
              </span>
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/22 transition group-hover:translate-x-1">
                <ArrowUpRight />
              </span>
            </a>
          ))}
        </div>
      </section>

      <section className="tracing-paper px-5 py-20 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 grid gap-5 border-y border-pencil py-5 md:grid-cols-[.8fr_1.2fr] md:items-end">
            <Eyebrow>Shop by family rhythm</Eyebrow>
            <h2 className="font-serif text-4xl leading-tight md:text-6xl">
              Fewer random links. Better little libraries, bags, shelves, and tables.
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {collections.map((collection) => (
              <a
                key={collection.name}
                href={collection.href}
                target="_blank"
                rel="noreferrer"
                className="focus-ring group flex min-h-[390px] flex-col border border-ink/15 bg-paper p-5 shadow-field transition hover:-translate-y-2 dark:bg-ink"
              >
                <div className={`relative mb-6 aspect-[4/3] overflow-hidden ${collection.color}`}>
                  <div className="absolute left-6 top-6 h-24 w-16 rotate-[-8deg] border border-ink/25 bg-paper/70" />
                  <div className="absolute bottom-6 right-6 h-24 w-28 rotate-6 border border-ink/25 bg-white/35" />
                  <span className="absolute bottom-5 left-5 font-note text-sm text-ink/60">Architectmata list</span>
                </div>
                <h3 className="font-serif text-3xl">{collection.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/65 dark:text-paper/65">{collection.dek}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {collection.items.map((item) => (
                    <span key={item} className="rounded-full border border-ink/15 px-3 py-1 text-xs dark:border-paper/15">
                      {item}
                    </span>
                  ))}
                </div>
                <span className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-bold uppercase tracking-[.12em] text-clay">
                  Open on ShopMy
                  <ArrowRight size={17} />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="paper-section px-5 py-20 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <div className="relative min-h-[430px]">
            <div className="absolute left-0 top-0 w-[72%] -rotate-2 bg-[#ebe5d8] p-4 shadow-field">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src="/images/field-notes/what-can-you-do-with-a-rock.jpg"
                  alt="A recommended children's book photographed as a field note"
                  fill
                  sizes="(min-width:1024px) 420px, 72vw"
                  className="object-cover"
                />
              </div>
              <p className="mt-3 font-note text-sm text-ink/70">book / pocket treasure / nature walk</p>
            </div>
            <div className="absolute bottom-0 right-0 w-56 rotate-3 bg-sun p-5 text-ink shadow-field">
              <span className="text-[10px] uppercase tracking-[.18em]">Featured pick</span>
              <h3 className="mt-10 font-serif text-3xl leading-tight">A starter shelf for noticing the world</h3>
            </div>
          </div>
          <div>
            <Eyebrow>Why these links convert</Eyebrow>
            <h2 className="font-serif text-4xl leading-tight md:text-6xl">Every recommendation has a reason to exist in family life.</h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/70 dark:text-paper/70">
              Architectmata is not a giant storefront. It is a trusted shortcut for parents who want products that support curiosity: a better book basket, a calmer outing bag, a more inviting art shelf, and gifts that do more than fill a closet.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {['Used in our home or classes', 'Grouped by real parent use cases', 'Easy to browse from social posts', 'Ready for affiliate conversion'].map((item) => (
                <p key={item} className="border-l border-clay bg-white/35 p-4 text-sm shadow-field dark:bg-white/5">
                  {item}
                </p>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ShopButton href={shopMyBase} className="bg-clay text-paper">
                Open the full ShopMy
              </ShopButton>
              <Link
                href="/books"
                className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-ink/20 px-5 py-3 text-center text-sm font-bold uppercase tracking-[.1em] transition hover:-translate-y-1 dark:border-paper/20"
              >
                Read book notes
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-moss px-5 py-20 text-paper md:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1fr_1.2fr] md:items-end">
          <div>
            <Eyebrow>For the bio link</Eyebrow>
            <h2 className="font-serif text-5xl leading-none md:text-7xl">Send every post to one clear next step.</h2>
          </div>
          <div>
            <p className="max-w-2xl text-lg leading-relaxed text-paper/75">
              Use this page when a caption says "links in bio." The top buttons catch impulse clicks, the category cards help browsers self-select, and the repeated ShopMy CTAs keep the route obvious.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ShopButton href={shopMyBase} className="bg-sun text-ink">
                Shop Architectmata picks
              </ShopButton>
              <a
                href="https://www.instagram.com/architectmata/"
                target="_blank"
                rel="noreferrer"
                className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-paper/35 px-5 py-3 text-sm font-bold uppercase tracking-[.1em] transition hover:-translate-y-1"
              >
                Follow on Instagram
                <Instagram size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
