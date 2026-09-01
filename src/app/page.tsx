import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Instagram, Mail } from "lucide-react";
import { Reveal } from "@/components/motion";
import { MobileNavigation } from "@/components/mobile-navigation";
import { NewsletterSignup } from "@/components/newsletter-signup";
import { SiteSearch } from "@/components/site-search";
import { ThemeToggle } from "@/components/theme-toggle";
import { brandBasics, navItems } from "@/data/site-content";

const doors = [
  {
    title: "Observe",
    copy: "Look closer at buildings, streets and everyday places.",
    href: "/observe",
    image: "/images/architectmata/conservation-fieldwork.jpg",
    alt: "Conservation architect documenting a carved wooden facade during fieldwork"
  },
  {
    title: "Read",
    copy: "Books that help children understand places, people and the world.",
    href: "/read",
    image: "/images/books/A dragon on the roof.jpeg",
    alt: "Children's architecture book displayed as part of the Architectmata bookshelf"
  },
  {
    title: "Explore",
    copy: "Travel, museums and places worth noticing together.",
    href: "/travel",
    image: "/images/architectmata/shaniwar-wada-interior-arch.jpeg",
    alt: "Historic interior arch inviting families to look closely at a place"
  },
  {
    title: "Create",
    copy: "Art, architecture activities and things to make.",
    href: "/art-classes",
    image: "/images/studio/shared-prompt-drawings.webp",
    alt: "Children's drawings made from a shared creative prompt"
  }
] as const;

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-plaster text-teak transition-colors dark:bg-[#12150f] dark:text-plaster">
      <Navigation />
      <Hero />
      <FourDoors />
      <Newsletter />
      <Footer />
    </main>
  );
}

function Navigation() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-teak/15 bg-[rgba(255,250,240,0.95)] backdrop-blur-md dark:border-plaster/15 dark:bg-[rgba(18,21,15,0.95)]">
      <nav aria-label="Main navigation" className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link className="flex items-center gap-3" href="/" aria-label="Architectmata home">
          <span className="grid h-10 w-10 place-items-center border border-teak/35 bg-terracotta text-sm font-semibold text-limewash dark:border-plaster/30">A</span>
          <span>
            <span className="block font-serif text-xl font-semibold leading-none">Architectmata</span>
            <span className="hidden text-[0.68rem] uppercase tracking-[0.22em] text-teak/65 dark:text-plaster/65 sm:block">{brandBasics.tagline}</span>
          </span>
        </Link>
        <div className="ml-auto hidden items-center gap-6 lg:flex">
          {navItems.map((item) => (
            <Link className="text-sm text-teak/75 transition hover:text-terracotta dark:text-plaster/75 dark:hover:text-marigold" href={item.href} key={item.label}>{item.label}</Link>
          ))}
        </div>
        <SiteSearch />
        <ThemeToggle />
      </nav>
      <MobileNavigation items={navItems} />
    </header>
  );
}

function Hero() {
  return (
    <section className="entrance-hero">
      <Image alt="Manasi sketching during heritage documentation on a traditional timber roof" src="/images/architectmata/site-sketching-roof.jpg" fill priority className="object-cover" sizes="100vw" />
      <div className="entrance-hero-shade" />
      <div className="entrance-hero-frame">
        <Reveal className="entrance-hero-copy">
          <p className="museum-caption">Architectmata</p>
          <h1>Architecture, books and places for curious families</h1>
          <p className="entrance-hero-intro">Helping children look closer at the world around them — through buildings, stories, travel and making.</p>
          <p className="entrance-hero-note">Observe first. Name later.</p>
        </Reveal>
      </div>
    </section>
  );
}

function FourDoors() {
  return (
    <section className="section-shell homepage-doors" aria-labelledby="doors-heading">
      <Reveal className="doors-heading">
        <p className="museum-caption">Four ways in</p>
        <h2 id="doors-heading">Where would you like to begin?</h2>
      </Reveal>
      <div className="doors-grid">
        {doors.map((door, index) => (
          <Reveal delay={index * 0.06} key={door.title}>
            <Link className="door-card group" href={door.href}>
              <span className="door-image">
                <Image alt={door.alt} src={door.image} fill className="object-cover transition duration-500 group-hover:scale-[1.025]" sizes="(max-width: 768px) 100vw, 50vw" />
                <span className="door-image-shade" aria-hidden />
              </span>
              <span className="door-copy">
                <span><span className="door-number">0{index + 1}</span><strong>{door.title}</strong></span>
                <span>{door.copy}</span>
                <ArrowRight aria-hidden size={24} />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Newsletter() {
  return (
    <section className="sandstone-band" id="newsletter">
      <div className="section-shell homepage-newsletter">
        <Reveal className="homepage-newsletter-copy">
          <p className="museum-caption">Newsletter</p>
          <h2><span lang="mr">मनाचे खेळ</span> · Manache Khel</h2>
          <p>A monthly letter for parents raising curious children — with books, places, observations and simple ideas to try together.</p>
        </Reveal>
        <Reveal className="newsletter-panel homepage-newsletter-panel" delay={0.08}>
          <NewsletterSignup buttonLabel="Subscribe" />
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contact" className="homepage-footer">
      <div className="section-shell homepage-footer-inner">
        <Link className="font-serif text-2xl font-semibold" href="/">Architectmata</Link>
        <nav aria-label="Footer navigation" className="homepage-footer-links">
          <Link href="/about">About</Link>
          <a href="#newsletter">Newsletter</a>
          <a href={brandBasics.instagramUrl} target="_blank" rel="noreferrer"><Instagram aria-hidden size={17} /> Instagram</a>
          <a href={`mailto:${brandBasics.email}`}><Mail aria-hidden size={17} /> Contact</a>
        </nav>
        <p>{brandBasics.copyright}</p>
      </div>
    </footer>
  );
}
