import Link from "next/link";
import { SITE_NAME } from "@/lib/site";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-(--line) bg-(--surface)">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-5 py-12 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5 font-extrabold">
            <Logo size={32} />
            <span className="text-lg">{SITE_NAME}</span>
          </div>
          <p className="mt-3 max-w-sm text-sm text-(--fg-muted)">
            A private, offline debt payoff tracker. Avalanche or snowball, your choice. Estimates only, not financial advice.
          </p>
        </div>
        <nav aria-label="Footer" className="text-sm">
          <h2 className="mb-2 font-semibold">Explore</h2>
          <ul className="space-y-1">
            {[["#compare", "Avalanche vs snowball"], ["#features", "Features"], ["#privacy", "Privacy"], ["#faq", "FAQ"], ["#get", "Get the app"]].map(([h, l]) => (
              <li key={h}><Link className="inline-flex min-h-11 items-center text-(--fg-muted) hover:text-(--fg) hover:underline" href={`/${h}`}>{l}</Link></li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Legal" className="text-sm">
          <h2 className="mb-2 font-semibold">Legal</h2>
          <ul className="space-y-1">
            <li><Link className="inline-flex min-h-11 items-center text-(--fg-muted) hover:text-(--fg) hover:underline" href="/privacy/">Privacy policy</Link></li>
            <li><Link className="inline-flex min-h-11 items-center text-(--fg-muted) hover:text-(--fg) hover:underline" href="/terms/">Terms of use</Link></li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-(--line) py-5 text-center text-xs text-(--fg-muted)">
        © {new Date().getFullYear()} {SITE_NAME}. Example numbers on this site are illustrations, not real results.
      </div>
    </footer>
  );
}
