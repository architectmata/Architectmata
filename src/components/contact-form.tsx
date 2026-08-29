export default function ContactForm({inquiry = false}: {inquiry?: boolean}) {
  return (
    <div className="grid content-start gap-5 rounded-4xl bg-sky/20 p-8">
      <h2 className="font-serif text-3xl">{inquiry ? 'Ask about a class' : 'Write to Architectmata'}</h2>
      <p className="leading-relaxed opacity-70">Send your note directly by email and Manasi will reply as soon as she can.</p>
      <a
        className="justify-self-start rounded-full bg-ink px-7 py-4 font-bold text-paper transition hover:-translate-y-1 dark:bg-paper dark:text-ink"
        href={`mailto:hello.architectmata@gmail.com${inquiry ? '?subject=Architectmata%20class%20inquiry' : ''}`}
      >
        Email Architectmata
      </a>
    </div>
  );
}
