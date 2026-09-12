import Image from 'next/image';
import worksheet from '../../../../public/downloads/seattle-architecture-detective-book.png';
import { PageHero, ResourceCard, Newsletter } from '@/components/ui';
import { resources } from '@/lib/data';

export const metadata = { title: 'Free Resources' };

export default function Resources() {
  return <>
    <PageHero
      eyebrow="The resource shelf"
      title="Print it. Pack it. Take it outside."
      intro="Free booklists, observation sheets, travel planners, and gentle prompts designed to make family exploration feel easier."
      accent="bg-moss"
    />
    <section className="px-5 py-20 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-wrap gap-2">
          {['All resources','Architecture','Museums','Travel','Books','Nature'].map((x,i) =>
            <span className={`rounded-full px-4 py-2 text-sm ${i===0?'bg-ink text-paper dark:bg-paper dark:text-ink':'bg-ink/5 dark:bg-paper/10'}`} key={x}>{x}</span>
          )}
        </div>

        <article className="mb-10 overflow-hidden rounded-4xl border border-ink/15 bg-white/55 dark:border-paper/15 dark:bg-white/5 md:grid md:grid-cols-[minmax(0,1.1fr)_minmax(18rem,.9fr)]">
          <div className="bg-paper/70 p-4 dark:bg-white/5 md:p-6">
            <Image
              src={worksheet}
              sizes="(min-width: 768px) 55vw, 100vw"
              alt="Look at Seattle building detective mini-book printable for ages 4 to 6"
              className="h-auto w-full rounded-3xl border border-ink/10 bg-white"
            />
          </div>
          <div className="flex flex-col justify-center p-7 md:p-10">
            <span className="mb-5 w-fit rounded-full bg-sun/40 px-3 py-1 text-xs">Architecture · Free printable</span>
            <h2 className="font-serif text-3xl md:text-4xl">Look at Seattle</h2>
            <p className="mt-3 text-base leading-relaxed opacity-75">
              A free printable building detective mini-book for ages 4–6. Look closely at five Seattle buildings, notice materials and shapes, compare old and new, and draw a favorite.
            </p>
            <p className="mt-4 text-sm opacity-60">1 printable sheet · PNG · cut + fold mini-book</p>
            <a
              className="focus-ring mt-7 inline-flex w-fit rounded-full bg-ink px-6 py-3 font-bold text-paper transition hover:-translate-y-0.5 dark:bg-paper dark:text-ink"
              href="/downloads/seattle-architecture-detective-book.png"
              download
            >
              Look at Seattle
            </a>
            <p className="mt-3 text-xs opacity-50">Download and print on A4 paper, then cut and fold using the instructions on the sheet.</p>
          </div>
        </article>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {resources.map(r => <ResourceCard key={r.title} {...r}/>)}
        </div>
        <p className="mt-10 text-center text-sm opacity-60">The Seattle printable is ready now. More downloads are in preparation.</p>
      </div>
    </section>
    <Newsletter/>
  </>;
}
