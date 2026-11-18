import { EXAMPLE } from "@/lib/example";
import { Reveal } from "./Reveal";

const SPAN = EXAMPLE.avalanche.months;

/** A 30-month track with a gold marker where the first debt is cleared (EXAMPLE data). */
export function FirstWinMeter({ strategy }: { strategy: "avalanche" | "snowball" }) {
  const first = EXAMPLE[strategy].order[0];
  const color = strategy === "avalanche" ? "var(--avalanche)" : "var(--snowball)";
  const pct = (first.month / SPAN) * 100;
  return (
    <Reveal>
      <div className="mt-5 rounded-xl bg-(--surface-alt) p-4 text-left">
        <div className="flex items-baseline justify-between gap-2 text-sm">
          <span className="font-semibold">First debt cleared</span>
          <span className="text-lg font-extrabold" style={{ color }}>Month {first.month}</span>
        </div>
        <div className="relative mt-3 h-3 rounded-full bg-(--line)" aria-hidden="true">
          <div className="grow-x absolute inset-y-0 left-0 rounded-full" style={{ width: `${pct}%`, background: color }} />
          <div className="absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-white bg-gold-light shadow" style={{ left: `${pct}%` }} />
        </div>
        <div className="mt-1.5 flex justify-between text-[11px] text-(--fg-muted)" aria-hidden="true">
          <span>Now</span>
          <span>Month {SPAN}</span>
        </div>
        <p className="mt-2 text-xs text-(--fg-muted)">Example: {first.name}. Example numbers, not a prediction for your debts.</p>
      </div>
    </Reveal>
  );
}
