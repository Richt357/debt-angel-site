import { EXAMPLE } from "@/lib/example";
import { Reveal } from "./Reveal";

const SCALE = Math.max(EXAMPLE.avalanche.months, EXAMPLE.snowball.months);

/** Animated payoff bars: one bar per debt, ending in the month that debt reaches $0 (EXAMPLE data). */
export function PayoffBars({ strategy }: { strategy: "avalanche" | "snowball" }) {
  const r = EXAMPLE[strategy];
  const color = strategy === "avalanche" ? "var(--avalanche)" : "var(--snowball)";
  return (
    <Reveal>
      <ol className="space-y-3" aria-label={`${strategy} payoff order (example)`}>
        {r.order.map((o, i) => {
          const pct = (o.month / SCALE) * 100;
          const d = EXAMPLE.debts.find((x) => x.name === o.name)!;
          return (
            <li key={o.name} className="fade-in" style={{ ["--d" as string]: `${i * 0.12}s` }}>
              <div className="mb-1 flex items-baseline justify-between gap-2 text-sm">
                <span className="font-semibold">
                  <span className="mr-1.5 inline-flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-bold text-white" style={{ background: color }}>{i + 1}</span>
                  {o.name}
                </span>
                <span className="text-xs text-(--fg-muted)">
                  ${d.balance.toLocaleString("en-US")} · {d.apr}% APR
                </span>
              </div>
              <div className="relative h-7 rounded-full bg-(--surface-alt)">
                <div
                  className="grow-x absolute inset-y-0 left-0 rounded-full"
                  style={{ width: `${Math.max(pct, 3)}%`, background: color, ["--d" as string]: `${0.2 + i * 0.25}s`, boxShadow: i === 0 ? "0 0 0 3px #ffc933" : undefined }}
                />
                <span
                  className="fade-in absolute top-1/2 -translate-y-1/2 text-xs font-bold"
                  style={{ ["--d" as string]: `${0.9 + i * 0.25}s`, ...(pct < 25 ? { left: `calc(${pct}% + 12px)`, color: "var(--fg)" } : { right: `calc(${100 - pct}% + 10px)`, color: "#fff" }) }}
                >
                  Month {o.month}
                </span>
              </div>
              {i === 0 && (
                <p className="mt-1 text-xs font-semibold text-(--fg)">
                  <span aria-hidden="true">★ </span>First debt cleared in month {o.month}
                </p>
              )}
            </li>
          );
        })}
      </ol>
    </Reveal>
  );
}
