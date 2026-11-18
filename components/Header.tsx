import Link from "next/link";
import { SITE_NAME } from "@/lib/site";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

const NAV = [
  ["#compare", "Compare"],
  ["#how", "How it works"],
  ["#features", "Features"],
  ["#privacy", "Privacy"],
  ["#faq", "FAQ"],
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-(--line) bg-(--page)/85 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-3 px-5 sm:px-8">
        <Link href="/" className="flex min-h-11 items-center gap-2.5 font-extrabold tracking-tight">
          <Logo size={34} />
          <span className="text-lg">{SITE_NAME}</span>
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {NAV.map(([href, label]) => (
            <Link key={href} href={`/${href}`} className="flex min-h-11 items-center rounded-lg px-3 text-sm font-medium text-(--fg-muted) hover:bg-(--surface-alt) hover:text-(--fg)">
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/#get" className="inline-flex min-h-11 items-center rounded-full bg-brand-600 px-4 text-sm font-semibold text-white shadow-sm hover:bg-brand-700 dark:bg-brand-400 dark:text-night dark:hover:bg-brand-300">
            Get the app
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
