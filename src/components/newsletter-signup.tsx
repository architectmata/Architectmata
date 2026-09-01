import { ArrowRight } from "lucide-react";

const kitOptions = JSON.stringify({
  settings: {
    after_subscribe: {
      action: "message",
      success_message: "You're almost there. Check your email to confirm your subscription."
    }
  }
});

export function NewsletterSignup({ buttonLabel = "Join Manache Khel" }: { buttonLabel?: string }) {
  return (
    <form
      action="https://app.kit.com/forms/9863628/subscriptions"
      method="post"
      className="formkit-form newsletter-form"
      data-sv-form="9863628"
      data-uid="c22480a0fb"
      data-format="inline"
      data-version="5"
      data-options={kitOptions}
      aria-label="Subscribe to Manache Khel"
      aria-live="polite"
    >
      <div data-element="fields" className="newsletter-fields">
        <div className="newsletter-field">
          <label htmlFor="newsletter-email">Email address</label>
          <input
            id="newsletter-email"
            name="email_address"
            type="email"
            autoComplete="email"
            placeholder="Email address"
            required
          />
        </div>
        <button type="submit" data-element="submit">
          <span>{buttonLabel}</span>
          <ArrowRight aria-hidden size={17} />
        </button>
      </div>
      <ul
        className="formkit-alert formkit-alert-error newsletter-errors"
        data-element="errors"
        data-group="alert"
        aria-live="assertive"
      />
      <p className="newsletter-privacy">No spam. Unsubscribe anytime.</p>
    </form>
  );
}
