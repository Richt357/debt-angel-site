import type { ReactNode } from "react";

export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <article className="mx-auto w-full max-w-3xl px-5 py-14 sm:px-8 sm:py-20 [&_a]:text-(--accent) [&_a]:underline [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-extrabold [&_h3]:mt-6 [&_h3]:text-lg [&_h3]:font-bold [&_li]:mt-2 [&_p]:mt-3 [&_p]:leading-relaxed [&_ul]:ml-5 [&_ul]:list-disc [&_ul]:mt-3">
      <h1 className="text-4xl font-extrabold tracking-tight">{title}</h1>
      {children}
    </article>
  );
}

export function PlaceholderNotice() {
  return (
    <p className="mt-6 rounded-xl border border-gold bg-gold-light/20 p-4 text-sm" role="note">
      <strong>Placeholders:</strong> items in [square brackets] on this page are placeholders. They must be replaced with real details before this site is promoted or the app is published. This text describes what the software does and is not legal advice.
    </p>
  );
}
