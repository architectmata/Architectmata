import Image from 'next/image';
import Link from 'next/link';
import {ArrowRight, Instagram} from '@/components/icons';
import {books, destinations, posts} from '@/lib/data';
import {Eyebrow, Newsletter, PlaceholderImage, SectionHead} from '@/components/ui';

const chapters = [
  {name: 'Observe', note: 'Look closely at the ordinary', href: '/architecture', mark: '01', className: 'bg-sky/40'},
  {name: 'Read', note: 'Books as doors into place', href: '/books', mark: '02', className: 'bg-rose/35'},
  {name: 'Explore', note: 'Field notes for going out', href: '/travel', mark: '03', className: 'bg-sun/40'},
  {name: 'Create', note: 'Make with curious hands', href: '/art-classes', mark: '04', className: 'bg-clay/25'},
  {name: 'Remember', note: 'Carry stories forward', href: '/explorer-club', mark: '05', className: 'bg-moss/20'},
];

function FieldArtifacts() {
  return (
    <div
      className="relative min-h-[500px] md:min-h-[620px]"
      aria-label="A field notebook arrangement of books, sketches, tickets, and travel notes"
    >
      <div className="absolute left-[8%] top-[4%] w-[70%] rotate-2 bg-[#ebe5d8] p-4 shadow-field">
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image
            src="/images/field-notes/manasi-yellow-house.jpg"
            alt="Manasi seated in the deep window of a bright yellow house"
            fill
            priority
            sizes="(min-width:1024px) 35vw, 70vw"
            className="object-cover"
          />
        </div>
        <p className="mt-3 font-note text-sm text-ink/70">color / threshold / a window deep enough to sit in</p>
      </div>

      <div className="museum-ticket absolute right-0 top-[18%] w-48 rotate-6 bg-sun p-4 text-ink shadow-field">
        <span className="block text-[9px] uppercase tracking-[.2em]">Admit one curious mind</span>
        <strong className="mt-5 block font-serif text-2xl">Museum Day</strong>
        <span className="mt-4 block border-t border-dashed border-ink/40 pt-2 text-[10px]">
          COLLECTION 07 / LOOK SLOWLY
        </span>
      </div>

      <div className="absolute bottom-[3%] left-0 w-52 -rotate-6 border border-ink/20 bg-paper p-5 text-ink shadow-field">
        <span className="text-xs uppercase tracking-widest text-clay">मराठी पुस्तक</span>
        <p className="mt-8 font-serif text-2xl leading-tight">Stories carried between two homes</p>
        <div className="mt-8 h-px bg-ink/30" />
      </div>

      <div className="badge absolute bottom-[1%] right-[8%] grid h-36 w-36 rotate-12 place-items-center rounded-full border border-ink/40 bg-moss text-center text-paper shadow-field">
        <span className="text-[10px] uppercase tracking-[.15em]">
          Junior
          <br />
          <strong className="font-serif text-lg">Explorer</strong>
          <br />
          Pacific NW
        </span>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <section className="blueprint-paper relative min-h-screen overflow-hidden px-5 pb-20 pt-32 md:px-10 md:pt-40">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.1fr_.9fr]">
          <div className="relative z-10">
            <div className="mb-9 flex items-center gap-4">
              <span className="h-px w-12 bg-clay" />
              <Eyebrow>Field notes by Manasi</Eyebrow>
            </div>
            <h1 className="font-serif text-6xl leading-[.94] tracking-tight md:text-8xl xl:text-[7.25rem]">
              Places become
              <br />
              stories when
              <br />
              <span className="scribble italic text-clay">children notice.</span>
            </h1>
            <div className="mt-9 max-w-2xl border-l border-pencil pl-6">
              <p className="text-lg leading-relaxed text-ink/75 dark:text-paper/75">
                I’m <strong className="font-semibold text-ink dark:text-paper">Manasi</strong>—a conservation architect
                from India, an educator, and a mother raising a curious child in the Pacific Northwest.
              </p>
              <p className="mt-4 leading-relaxed text-ink/65 dark:text-paper/65">
                Architectmata is my field notebook for exploring how books, old buildings, museums, art, travel, and
                family memory can teach children to read the world around them.
              </p>
            </div>
            <Link
              className="focus-ring mt-9 inline-flex items-center gap-3 border-b border-clay pb-2 text-sm font-bold uppercase tracking-[.12em] transition hover:gap-5"
              href="/about"
            >
              Read Manasi’s story <ArrowRight />
            </Link>
          </div>
          <FieldArtifacts />
        </div>
        <span className="absolute bottom-6 left-6 font-note text-xs text-ink/45 md:left-10">
          48.7° N · a notebook kept between India and the Pacific Northwest
        </span>
      </section>

      <section className="paper-section px-5 py-24 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 grid gap-5 border-y border-pencil py-5 md:grid-cols-[1fr_2fr]">
            <Eyebrow>Five ways in</Eyebrow>
            <p className="max-w-2xl font-serif text-2xl leading-snug md:text-3xl">
              Not subjects to master, but habits of attention to practice together.
            </p>
          </div>
          <div className="grid gap-px bg-ink/15 md:grid-cols-5">
            {chapters.map((c) => (
              <Link
                key={c.name}
                href={c.href}
                className={`group relative min-h-72 p-6 ${c.className} bg-paper dark:bg-ink`}
              >
                <span className="font-note text-xs opacity-50">{c.mark} / FIELD</span>
                <div className="absolute left-6 right-6 top-20 h-24">
                  <span
                    className={`block h-full w-full ${c.className} transition group-hover:-rotate-2 group-hover:scale-105`}
                  />
                </div>
                <h2 className="absolute bottom-16 font-serif text-3xl">{c.name}</h2>
                <p className="absolute bottom-6 text-xs opacity-60">{c.note}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="tracing-paper px-5 py-24 md:px-10">
        <div className="mx-auto max-w-7xl">
          <SectionHead
            eyebrow="READ / Shelf notes"
            title="Books we carry with us"
            link="Open the book library"
            href="/books"
          />
          <div className="grid gap-9 md:grid-cols-3">
            {books.slice(0, 3).map((b, i) => (
              <article key={b.title} className={`${i === 1 ? 'md:mt-12' : ''}`}>
                <div className={`book-object aspect-[4/5] ${b.color} p-6 text-ink shadow-field`}>
                  <div className="flex h-full flex-col justify-between border border-ink/25 p-6">
                    <div>
                      <span className="text-[10px] uppercase tracking-[.18em]">Architectmata shelf / {b.category}</span>
                      <div className="mt-5 h-px bg-ink/25" />
                    </div>
                    <h3 className="font-serif text-3xl leading-tight">{b.title}</h3>
                    <span className="font-note text-sm">for readers {b.age}</span>
                  </div>
                </div>
                <p className="mt-5 border-l border-clay pl-4 text-sm leading-relaxed opacity-65">{b.why}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="paper-section px-5 py-24 md:px-10">
        <div className="mx-auto max-w-7xl">
          <SectionHead
            eyebrow="EXPLORE / Postcards from the field"
            title="Places worth noticing"
            link="Open the travel folio"
            href="/travel"
          />
          <div className="grid gap-8 md:grid-cols-3">
            {destinations.map((d, i) => (
              <Link
                key={d.name}
                href="/travel"
                className={`postcard group block border border-ink/20 bg-[#f4efe3] p-3 text-ink shadow-field transition hover:-translate-y-2 ${
                  i === 0 ? '-rotate-1' : i === 2 ? 'rotate-1' : ''
                }`}
              >
                <PlaceholderImage className="aspect-[4/3] rounded-none" tone={d.color} label={`${d.name}, ${d.place}`} />
                <div className="grid grid-cols-[1fr_auto] gap-4 p-3 pt-5">
                  <div>
                    <p className="text-[10px] uppercase tracking-[.18em] text-clay">{d.place}</p>
                    <h3 className="mt-1 font-serif text-2xl">{d.name}</h3>
                  </div>
                  <div className="stamp grid h-14 w-14 place-items-center rounded-full border border-clay text-center text-[8px] uppercase text-clay">
                    Field
                    <br />
                    Note
                    <br />
                    {String(i + 1).padStart(2, '0')}
                  </div>
                </div>
                <p className="border-t border-pencil p-3 text-xs opacity-60">{d.tags.join(' · ')}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-moss px-5 py-24 text-paper md:px-10">
        <div className="mx-auto grid max-w-7xl gap-14 md:grid-cols-[.7fr_1.3fr]">
          <div>
            <Eyebrow>CREATE / At the table</Eyebrow>
            <h2 className="font-serif text-5xl leading-none md:text-7xl">
              Making is
              <br />
              another way
              <br />
              of <em className="text-sun">looking.</em>
            </h2>
            <Link className="mt-9 inline-flex items-center gap-3 border-b border-paper/50 pb-2 text-sm" href="/art-classes">
              Visit the studio <ArrowRight />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="-rotate-2 bg-paper p-3 text-ink shadow-field">
              <div className="aspect-square border border-dashed border-ink/30 bg-clay/30 p-5">
                <span className="font-note text-sm">sketch / cut / fold / ask again</span>
              </div>
            </div>
            <div className="mt-10 rotate-2 bg-paper p-3 text-ink shadow-field">
              <div className="aspect-square border border-dashed border-ink/30 bg-sun/40 p-5">
                <span className="font-note text-sm">today’s material: light + paper</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="tracing-paper px-5 py-24 md:px-10">
        <div className="mx-auto max-w-7xl">
          <SectionHead
            eyebrow="REMEMBER / Notes to keep"
            title="Fresh from Manasi’s notebook"
            link="Read all field notes"
            href="/blog"
          />
          <div className="divide-y divide-pencil border-y border-pencil">
            {posts.slice(0, 3).map((p, i) => (
              <Link
                key={p.title}
                href="/blog"
                className="group grid gap-3 py-7 md:grid-cols-[80px_150px_1fr_1fr_auto] md:items-center"
              >
                <span className="font-note text-sm opacity-45">N° 0{i + 1}</span>
                <span className="text-xs uppercase tracking-widest text-clay">{p.category}</span>
                <h3 className="font-serif text-2xl group-hover:italic">{p.title}</h3>
                <p className="text-sm opacity-60">{p.excerpt}</p>
                <ArrowRight />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="paper-section px-5 py-24 md:px-10">
        <div className="mx-auto max-w-7xl">
          <SectionHead eyebrow="A page from our days" title="Pinned from Instagram" />
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
            {['bg-sky', 'bg-clay', 'bg-moss', 'bg-rose'].map((c, i) => (
              <div
                key={c}
                className={`taped relative aspect-square ${c} ${i % 2 ? 'rotate-1' : '-rotate-1'} shadow-field`}
              >
                <span className="absolute bottom-4 left-4 font-note text-xs text-ink/65">
                  observation {String(i + 1).padStart(2, '0')}
                </span>
                <Instagram className="absolute bottom-4 right-4 text-ink" size={18} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  );
}
