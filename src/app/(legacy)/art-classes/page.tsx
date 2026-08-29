import ContactForm from '@/components/contact-form';
import {Eyebrow, PlaceholderImage, SectionHead} from '@/components/ui';
import {getPublicStudioContent} from '@/lib/notion-classes';

export const metadata = {title: 'Art Classes'};

const whatsappUrl = 'https://wa.me/12068250337';

const fallbackClasses = [
  {
    name: 'Little Makers',
    ages: 'Ages 4–6',
    description:
      'Playful drawing, colour, shape and visual exploration designed for younger children.',
    tone: 'bg-sun/30',
  },
  {
    name: 'Studio Explorers',
    ages: 'Ages 7–10',
    description:
      'Drawing, observation, colour, composition and projects that encourage children to make their own creative choices.',
    tone: 'bg-sky/30',
  },
  {
    name: 'Young Artists',
    ages: 'Ages 11–14',
    description:
      'More developed drawing and visual-thinking projects with room for personal ideas, experimentation and individual expression.',
    tone: 'bg-rose/30',
  },
];

const focusAreas = ['Drawing', 'Colour', 'Observation', 'Creative expression'];

export default async function ArtClasses() {
  const notionContent = await getPublicStudioContent();
  const classes = notionContent.classes.length ? notionContent.classes : fallbackClasses;

  return (
    <>
      <section className="blueprint-paper relative overflow-hidden border-b border-pencil px-5 pb-20 pt-32 md:px-10 md:pb-28 md:pt-44">
        <div className="absolute -right-20 top-28 h-64 w-80 rotate-6 border border-ink/15 bg-rose opacity-35 shadow-field" />
        <div className="absolute right-12 top-32 h-44 w-44 rounded-full border border-dashed border-ink/20" />
        <div className="relative mx-auto max-w-7xl">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-10 bg-clay" />
            <Eyebrow>Architectmata Studio</Eyebrow>
          </div>
          <h1 className="max-w-5xl font-serif text-5xl leading-[.98] md:text-8xl">
            Drawing, colour, observation and creative expression.
          </h1>
          <p className="mt-8 max-w-3xl border-l border-pencil pl-5 text-lg leading-relaxed text-ink/70 dark:text-paper/70 md:text-xl">
            Small-group art classes for children in Redmond, WA, designed to help them look
            closely, explore ideas, work confidently with drawing and colour, and develop their
            own way of expressing what they see and imagine.
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="focus-ring mt-9 inline-flex rounded-full bg-ink px-6 py-4 text-sm font-bold text-paper transition hover:-translate-y-1 dark:bg-paper dark:text-ink sm:px-8"
          >
            October batches — enquire about availability
          </a>
        </div>
      </section>

      <section className="px-5 py-20 md:px-10 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 md:grid-cols-[1fr_1.2fr] md:items-center">
            <PlaceholderImage
              className="aspect-square"
              tone="bg-clay"
              label="A place for looking, drawing and making"
            />
            <div>
              <SectionHead eyebrow="Class philosophy" title="A space to look closely and make freely" />
              <p className="text-lg leading-relaxed opacity-70">
                Architectmata Studio focuses on drawing, colour, observation and creative
                expression. Children are encouraged to notice details, make their own visual
                choices and enjoy the process of creating rather than simply copying a finished
                result.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-3 text-center text-sm sm:grid-cols-4">
                {focusAreas.map((area, index) => (
                  <span
                    className={`rounded-3xl p-4 ${index % 2 === 0 ? 'bg-sun/40' : 'bg-sky/40'}`}
                    key={area}
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-24 md:mt-28">
            <SectionHead eyebrow="Age groups" title="Find their studio" />
            <div className="grid gap-5 md:grid-cols-3">
              {classes.map(({name, ages, description, ...item}, index) => (
                <article
                  className={`flex h-full flex-col rounded-4xl p-6 ${'tone' in item ? item.tone : ['bg-sun/30', 'bg-sky/30', 'bg-rose/30'][index % 3]}`}
                  key={name}
                >
                  <span className="text-xs font-bold uppercase tracking-widest text-clay">
                    {ages}
                  </span>
                  <h3 className="mt-8 font-serif text-3xl">{name}</h3>
                  <p className="mt-4 flex-1 text-sm leading-relaxed opacity-70">{description}</p>
                  <div className="mt-8 border-t border-ink/15 pt-5 text-sm leading-relaxed">
                    <strong className="block">
                      {'availability' in item
                        ? item.availability.split('·')[0].trim()
                        : 'Upcoming October batch'}
                    </strong>
                    <span className="opacity-70">
                      {'availability' in item
                        ? item.availability.split('·').slice(1).join('·').trim()
                        : 'Enquire for schedule and availability'}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-24 grid gap-6 md:grid-cols-2 md:gap-10">
            <section className="rounded-4xl border border-ink/15 p-7 md:p-9">
              <Eyebrow>Studio details</Eyebrow>
              <h2 className="font-serif text-4xl">Redmond, WA</h2>
              <p className="mt-5 leading-relaxed opacity-70">
                Exact studio location is shared directly with registered families.
              </p>
              <div className="mt-8 border-t border-ink/15 pt-7">
                <h3 className="font-serif text-2xl">Small by design</h3>
                <p className="mt-3 text-sm leading-relaxed opacity-70">
                  Groups are intentionally kept small so children receive individual attention,
                  have room to explore and feel comfortable sharing their ideas.
                </p>
              </div>
            </section>

            <section className="rounded-4xl bg-sun/30 p-7 md:p-9">
              <Eyebrow>About the teacher</Eyebrow>
              <h2 className="font-serif text-4xl">Meet Manasi</h2>
              <p className="mt-5 leading-relaxed opacity-70">
                Manasi is a conservation architect and former architecture educator who brings
                her background in design, observation and visual thinking into children’s art
                education. Architectmata Studio grew from her interest in helping children look
                closely, stay curious and develop confidence in expressing their own ideas.
              </p>
            </section>
          </div>

          <section className="mt-24 rounded-4xl bg-sky/30 p-6 sm:p-8 md:p-10" id="enquire">
            <div className="grid gap-10 md:grid-cols-[.8fr_1.2fr] md:gap-14">
              <div>
                <Eyebrow>October batches</Eyebrow>
                <h2 className="font-serif text-4xl md:text-5xl">Enquire about a class</h2>
                <p className="mt-4 max-w-md leading-relaxed opacity-70">
                  Tell us your child’s age and what days or times may work for your family.
                  Schedules will be shaped around interest and availability.
                </p>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="focus-ring mt-7 inline-flex rounded-full bg-ink px-7 py-4 font-bold text-paper transition hover:-translate-y-1 dark:bg-paper dark:text-ink"
                >
                  Message on WhatsApp
                </a>
              </div>
              <div className="rounded-4xl bg-paper/70 p-5 sm:p-7 dark:bg-ink/30">
                <ContactForm inquiry />
              </div>
            </div>
          </section>

          <section className="mt-24">
            <SectionHead eyebrow="Inside the studio" title="A glimpse of the space" />
            <p className="-mt-6 mb-8 max-w-2xl text-sm leading-relaxed opacity-65">
              {notionContent.images.length
                ? 'A few details from Architectmata Studio—children making, experimenting and following their ideas.'
                : 'Real studio photographs will be added here soon. These spaces are reserved for images from Architectmata Studio—not stock photography.'}
            </p>
            {notionContent.images.length ? (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                {notionContent.images.map((photo, index) => (
                  <div
                    className={`relative aspect-square overflow-hidden rounded-[2rem] ${index % 2 ? 'mt-8' : ''}`}
                    key={photo.id}
                  >
                    {/* Notion file URLs are signed and refreshed by the server-side query. */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {['bg-sun', 'bg-sky', 'bg-clay', 'bg-rose'].map((tone, index) => (
                  <PlaceholderImage
                    key={tone}
                    className={`aspect-square ${index % 2 ? 'mt-8' : ''}`}
                    tone={tone}
                    label="Studio photograph coming soon"
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      </section>
    </>
  );
}
