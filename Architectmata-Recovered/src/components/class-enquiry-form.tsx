"use client";

import { useState } from "react";
import { Send } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/12068250337";
const fieldClass =
  "mt-2 w-full border border-teak/25 bg-limewash/60 px-4 py-3 text-teak outline-none transition placeholder:text-teak/40 focus:border-terracotta dark:border-plaster/25 dark:bg-plaster/5 dark:text-plaster";

export function ClassEnquiryForm() {
  const [opened, setOpened] = useState(false);

  return (
    <form
      className="grid gap-5"
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const message = [
          "Hello Manasi, I’d like to enquire about an October art class.",
          `Parent / guardian: ${data.get("name")}`,
          `Email: ${data.get("email")}`,
          `Child’s age: ${data.get("childAge")}`,
          `Preferred day or time: ${data.get("preferredTime")}`,
          `Message: ${data.get("message")}`
        ].join("\n");

        window.open(`${WHATSAPP_URL}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
        setOpened(true);
      }}
    >
      <label className="text-sm font-medium">
        Parent / guardian name
        <input className={fieldClass} name="name" required />
      </label>
      <label className="text-sm font-medium">
        Email
        <input className={fieldClass} name="email" type="email" required />
      </label>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-medium">
          Child’s age
          <input className={fieldClass} name="childAge" required />
        </label>
        <label className="text-sm font-medium">
          Preferred day or time
          <input className={fieldClass} name="preferredTime" required />
        </label>
      </div>
      <label className="text-sm font-medium">
        Message
        <textarea className={`${fieldClass} resize-none`} name="message" required rows={5} />
      </label>
      <button className="button-primary w-full justify-center sm:w-fit" type="submit">
        Continue on WhatsApp <Send aria-hidden size={17} />
      </button>
      {opened ? (
        <p className="text-sm text-teak/65 dark:text-plaster/65" role="status">
          WhatsApp has opened with your enquiry. Review the message there, then tap send.
        </p>
      ) : null}
    </form>
  );
}
