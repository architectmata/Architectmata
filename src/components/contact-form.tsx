'use client';

import {useState} from 'react';

const fieldClass =
  'mt-2 w-full rounded-2xl border border-ink/20 bg-white/40 px-4 py-3 outline-none focus:border-clay dark:bg-white/5';

export default function ContactForm({inquiry = false}: {inquiry?: boolean}) {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="rounded-4xl bg-sky/40 p-10">
        <h3 className="font-serif text-3xl">Thank you—that’s safely in my notebook.</h3>
        <p className="mt-3 opacity-70">I’ll be in touch soon.</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        setSent(true);
      }}
      className="grid gap-5"
    >
      <label className="text-sm">
        {inquiry ? 'Parent / guardian name' : 'Your name'}
        <input name="name" required className={fieldClass} />
      </label>
      <label className="text-sm">
        {inquiry ? 'Email' : 'Email address'}
        <input name="email" type="email" required className={fieldClass} />
      </label>
      {inquiry && (
        <>
          <label className="text-sm">
            Child’s age
            <input name="childAge" required className={fieldClass} />
          </label>
          <label className="text-sm">
            Preferred day or time
            <input name="preferredTime" required className={fieldClass} />
          </label>
        </>
      )}
      <label className="text-sm">
        {inquiry ? 'Message' : 'What would you like to talk about?'}
        <textarea name="message" required rows={5} className={`${fieldClass} resize-none`} />
      </label>
      <button className="justify-self-start rounded-full bg-ink px-7 py-4 font-bold text-paper transition hover:-translate-y-1 dark:bg-paper dark:text-ink">
        Send message
      </button>
    </form>
  );
}
