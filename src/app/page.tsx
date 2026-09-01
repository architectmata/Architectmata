import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Instagram, Mail } from "lucide-react";
import Header from "@/components/header";
import { Reveal } from "@/components/motion";
import { NewsletterSignup } from "@/components/newsletter-signup";
import { brandBasics } from "@/data/site-content";

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
  },
  {
    title: "Remember",
    copy: "Keepsakes, family stories and ways of holding on to place.",
    href: "/remember",
    image: "/images/architectmata/architectural-column-base-study.jpg",
    alt: "A hand-drawn architectural detail preserved as part of a family and place archive"
  }
] as const;

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-plaster text-teak transition-colors dark:bg-[#12150f] dark:text-plaster">
      <Header />
      <Hero />
      <FiveDoors />
      <NewsletterAndInstagram />
      <Footer />
    </main>
  );
}

function Hero() {
  return (
    <section className="entrance-hero">
      <Image alt="Manasi sketching during heritage documentation on a traditional timber roof" src="/images/architectmata/site-sketching-roof.jpg" fill priority className="object-cover object-[68%_center] sm:object-center" sizes="100vw" />
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

function FiveDoors() {
  return (
    <section className="section-shell homepage-doors" aria-labelledby="doors-heading">
      <Reveal className="doors-heading">
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
                <span className="door-number">0{index + 1}</span>
                <span className="door-title-row">
                  <strong>{door.title}</strong>
                  <ArrowRight aria-hidden size={24} />
                </span>
                <span className="door-description">{door.copy}</span>
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function NewsletterAndInstagram() {
  return (
    <section className="sandstone-band" id="newsletter">
      <div className="section-shell homepage-connect">
        <Reveal className="homepage-connect-card homepage-newsletter-card">
          <div className="homepage-newsletter-copy">
            <p className="museum-caption">Newsletter</p>
            <h2><span lang="mr">मनाचे खेळ</span> · Manache Khel</h2>
            <p>A monthly letter for parents raising curious children — with books, places, observations and simple ideas to try together.</p>
          </div>
          <div className="newsletter-panel homepage-newsletter-panel">
            <NewsletterSignup buttonLabel="Subscribe" />
          </div>
        </Reveal>
        <Reveal className="homepage-connect-card instagram-card" delay={0.08}>
          <div className="instagram-profile" aria-hidden>
            <div className="instagram-profile-image">
              <Image src="/images/field-notes/manasi-portrait.jpg" alt="" fill className="object-cover" sizes="96px" />
            </div>
            <div>
              <span className="font-serif text-xl font-semibold">Architectmata</span>
              <span>@architectmata</span>
            </div>
          </div>
          <div className="instagram-copy">
            <p className="museum-caption">Instagram</p>
            <h2>Follow along on Instagram</h2>
            <p>Architecture, books, places and small things worth noticing. Children’s books, heritage, travel and everyday observations at @architectmata.</p>
          </div>
          <a className="button-primary instagram-button" href={brandBasics.instagramUrl} target="_blank" rel="noreferrer">
            <Instagram aria-hidden size={18} /> Visit @architectmata
          </a>
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
