"use client";

import { useState, type FormEvent } from "react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // No backend wired yet — show a local confirmation. Hook this up to an API
    // route or form service (e.g. /api/contact) when one exists.
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center dark:border-emerald-900 dark:bg-emerald-950/30">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600 text-white">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
          Thank you for reaching out!
        </h3>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Our team will get back to you shortly.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm shadow-sm outline-none transition placeholder:text-zinc-400 hover:border-zinc-400 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-zinc-600";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Name
          </label>
          <input id="name" name="name" type="text" required className={inputClass} />
        </div>
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Email
          </label>
          <input id="email" name="email" type="email" required className={inputClass} />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Subject
        </label>
        <input id="subject" name="subject" type="text" className={inputClass} />
      </div>

      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Message
        </label>
        <textarea id="message" name="message" rows={5} required className={inputClass} />
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-brand-red py-3 font-semibold text-white shadow-sm transition-all hover:bg-brand-red-dark hover:shadow-md active:scale-[0.99] sm:w-auto sm:px-8"
      >
        Send Message
      </button>
    </form>
  );
}
