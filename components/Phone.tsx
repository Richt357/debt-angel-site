import type { ReactNode } from "react";

/**
 * A phone frame whose contents are HTML/SVG recreations of the real app screens (no screenshots, no binaries).
 * mode: "auto" follows the site's light/dark setting; "light"/"dark" pins the app palette.
 * All content inside is decorative example data: the wrapper carries one accessible description.
 */
export function Phone({
  children,
  label,
  mode = "auto",
  tab,
  className = "",
}: {
  children: ReactNode;
  label: string;
  mode?: "auto" | "light" | "dark";
  tab: "Dashboard" | "Debts" | "Strategy" | "Settings" | null;
  className?: string;
}) {
  const modeClass = mode === "light" ? "app-light" : mode === "dark" ? "app-dark" : "";
  return (
    <figure className={`mx-auto w-[272px] shrink-0 ${className}`}>
      <div
        role="img"
        aria-label={label}
        className={`${modeClass} relative rounded-[2.6rem] border-[7px] border-[#1b1d33] bg-(--a-bg) shadow-2xl shadow-brand-900/30 ring-1 ring-black/10 dark:border-[#2e3260]`}
      >
        <div aria-hidden="true" className="relative flex h-[548px] flex-col overflow-hidden rounded-[2.1rem] bg-(--a-bg) text-(--a-text)">
          {/* status bar + camera */}
          <div className="flex items-center justify-between px-5 pt-2.5 text-[10px] font-semibold text-(--a-muted)">
            <span>9:41</span>
            <span className="absolute left-1/2 top-2 h-3.5 w-3.5 -translate-x-1/2 rounded-full bg-[#1b1d33]" />
            <span>100%</span>
          </div>
          <div className="min-h-0 flex-1 overflow-hidden px-3 pb-2 pt-2.5">{children}</div>
          {tab && <TabBar active={tab} />}
        </div>
      </div>
    </figure>
  );
}

function TabIcon({ name }: { name: string }) {
  const common = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (name) {
    case "Dashboard":
      return (<svg {...common}><path d="M3 11l9-8 9 8" /><path d="M5 10v10h14V10" /></svg>);
    case "Debts":
      return (<svg {...common}><rect x="3" y="6" width="18" height="13" rx="2" /><path d="M3 10h18M16 14h2" /></svg>);
    case "Strategy":
      return (<svg {...common}><path d="M4 20V10M10 20V4M16 20v-8M22 20H2" /></svg>);
    default:
      return (<svg {...common}><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1" /></svg>);
  }
}

function TabBar({ active }: { active: string }) {
  return (
    <div className="flex border-t border-(--a-border) bg-(--a-card) px-1 pb-2.5 pt-1.5">
      {["Dashboard", "Debts", "Strategy", "Settings"].map((t) => (
        <div key={t} className={`flex flex-1 flex-col items-center gap-0.5 text-[9px] font-semibold ${t === active ? "text-(--a-primary)" : "text-(--a-muted)"}`}>
          <TabIcon name={t} />
          {t}
        </div>
      ))}
    </div>
  );
}
