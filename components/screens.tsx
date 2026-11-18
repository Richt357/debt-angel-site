import type { ReactNode } from "react";
import { EXAMPLE, START_TOTAL, usd } from "@/lib/example";
import { LineChart } from "./LineChart";
import { Phone } from "./Phone";

// Example data shown inside the mockups (the same four made-up debts used in the comparison section).
const PAID = 240;
const REMAINING = START_TOTAL - PAID;

// Visa from the example debts, paying only the minimum: month-by-month balance (interest = balance x APR / 12, rounded to cents).
function minimumOnly(balance: number, apr: number, min: number) {
  const vals = [balance];
  let b = balance, interest = 0;
  while (b > 0 && vals.length < 1200) {
    const i = Math.round(b * (apr / 100 / 12) * 100) / 100;
    interest += i;
    b = Math.max(0, Math.round((b + i - Math.min(min, b + i)) * 100) / 100);
    vals.push(b);
  }
  return { vals, months: vals.length - 1, interest: Math.round(interest * 100) / 100 };
}
const duration = (m: number) => `${Math.floor(m / 12) ? `${Math.floor(m / 12)} yrs ` : ""}${m % 12 ? `${m % 12} mos` : ""}`.trim();

function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-2xl border border-(--a-border) bg-(--a-card) p-3 ${className}`}>{children}</div>;
}
const Cap = ({ children }: { children: ReactNode }) => <div className="text-[9.5px] text-(--a-muted)">{children}</div>;

function Ring({ percent }: { percent: number }) {
  const r = 28, c = 2 * Math.PI * r;
  return (
    <svg width="72" height="72" viewBox="0 0 72 72">
      <circle cx="36" cy="36" r={r} fill="none" stroke="var(--a-track)" strokeWidth="8" />
      <circle cx="36" cy="36" r={r} fill="none" stroke="var(--a-primary)" strokeWidth="8" strokeLinecap="round" strokeDasharray={`${(percent / 100) * c} ${c}`} transform="rotate(-90 36 36)" />
      <text x="36" y="40" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--a-text)">{percent}%</text>
    </svg>
  );
}

function Bar({ pct, color = "var(--a-primary)" }: { pct: number; color?: string }) {
  return (
    <div className="h-1.5 overflow-hidden rounded-full bg-(--a-track)">
      <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color }} />
    </div>
  );
}

export function DashboardPhone({ mode = "auto" }: { mode?: "auto" | "light" | "dark" }) {
  const av = EXAMPLE.avalanche;
  return (
    <Phone mode={mode} tab="Dashboard" label="Mockup of the Debt Angel dashboard with example data: total debt remaining, a progress ring, paid so far, the debt-free date and a payoff projection chart.">
      <div className="flex flex-col gap-2">
        <Card>
          <div className="flex items-center gap-3">
            <Ring percent={Math.round((PAID / START_TOTAL) * 100)} />
            <div className="min-w-0">
              <Cap>Total debt remaining</Cap>
              <div className="text-[20px] font-extrabold leading-tight">{usd(REMAINING, 2)}</div>
              <Cap>Paid so far</Cap>
              <div className="text-[13px] font-bold text-(--a-success)">{usd(PAID, 2)}</div>
              <Cap>of {usd(START_TOTAL, 2)} originally</Cap>
            </div>
          </div>
        </Card>
        <Card>
          <Cap>Debt-free date (Avalanche, +{usd(EXAMPLE.extra)}/mo extra)</Cap>
          <div className="text-[20px] font-extrabold text-(--a-primary)">May 2029</div>
          <div className="text-[10.5px] text-(--a-muted)">2 yrs 6 mos from now · {usd(av.totalInterest, 2)} total interest</div>
          <div className="mt-0.5 text-[9.5px] font-semibold text-(--a-success)">
            Saves {usd(EXAMPLE.minimumsOnly.totalInterest - av.totalInterest, 2)} in interest vs. paying only minimums
          </div>
        </Card>
        <Card>
          <div className="mb-1 text-[12px] font-bold">Payoff projection</div>
          <LineChart
            width={240}
            height={96}
            series={[
              { values: EXAMPLE.minimumsOnly.balance, color: "var(--a-chart-c)", dashed: true },
              { values: av.balance, color: "var(--a-chart-a)" },
            ]}
            maxMonths={EXAMPLE.minimumsOnly.balance.length - 1}
            strokeWidth={2.5}
          />
          <div className="mt-1 flex gap-3 text-[9px] text-(--a-muted)">
            <span><b className="text-(--a-chart-a)">—</b> Avalanche plan</span>
            <span><b>- -</b> Minimums only</span>
          </div>
        </Card>
        <div className="flex items-center justify-between px-0.5">
          <span className="text-[12px] font-bold">Your debts</span>
          <span className="text-[10px] font-bold text-(--a-primary)">+ Add debt</span>
        </div>
        <Card className="!p-2.5">
          <div className="flex items-center justify-between text-[11px] font-bold">
            <span>Store card</span><span>{usd(1200, 2)}</span>
          </div>
          <div className="mb-1 text-[9.5px] text-(--a-muted)">26.99% APR · min {usd(40)} · <b className="text-(--a-primary)">Focus</b></div>
          <Bar pct={20} />
        </Card>
      </div>
    </Phone>
  );
}

function Strat({ title, sub, r, best, sel }: { title: string; sub: string; r: typeof EXAMPLE.snowball; best?: boolean; sel?: boolean }) {
  return (
    <Card className={sel ? "!border-(--a-primary)" : ""}>
      <div className="flex items-start justify-between">
        <div>
          <div className="text-[12px] font-bold">{title}</div>
          <div className="text-[9.5px] text-(--a-muted)">{sub}</div>
        </div>
        {best && <span className="rounded-full bg-(--a-success-soft) px-1.5 py-0.5 text-[8.5px] font-bold text-(--a-success)">Lowest interest</span>}
      </div>
      <div className="mt-1.5 flex gap-4">
        <div><Cap>Time to debt-free</Cap><div className="text-[11.5px] font-bold">2 yrs 6 mos</div></div>
        <div><Cap>Total interest</Cap><div className="text-[11.5px] font-bold">{usd(r.totalInterest, 2)}</div></div>
      </div>
      <div className="mt-1 text-[9px] text-(--a-muted)">Order: {r.order.map((o) => o.name).join(" → ")}</div>
    </Card>
  );
}

export function StrategyPhone({ mode = "auto" }: { mode?: "auto" | "light" | "dark" }) {
  const { snowball: sn, avalanche: av, minimumsOnly: mo } = EXAMPLE;
  return (
    <Phone mode={mode} tab="Strategy" label="Mockup of the Debt Angel strategy screen with example data: an extra monthly payment control, snowball and avalanche results side by side, and a balance-over-time chart.">
      <div className="flex flex-col gap-2">
        <Card>
          <div className="text-[12px] font-bold">Extra monthly payment</div>
          <div className="mt-1.5 flex items-center gap-2">
            <div className="flex-1 rounded-lg border border-(--a-border) bg-(--a-bg) px-2 py-1.5 text-[12px] font-semibold">$ {EXAMPLE.extra}</div>
            {["− $50", "+ $50", "+ $100"].map((b) => (
              <span key={b} className="rounded-lg bg-(--a-soft) px-1.5 py-1.5 text-[9.5px] font-bold text-(--a-primary)">{b}</span>
            ))}
          </div>
        </Card>
        <div className="rounded-xl bg-(--a-soft) px-2.5 py-2 text-[9.5px] leading-snug text-(--a-text)">
          Avalanche costs {usd(Math.round((sn.totalInterest - av.totalInterest) * 100) / 100, 2)} less interest. Snowball clears your first debt sooner. Both finish in the same time here.
        </div>
        <Strat title="Snowball" sub="Smallest balance first" r={sn} />
        <Strat title="Avalanche" sub="Highest interest rate first" r={av} best sel />
        <Card>
          <div className="mb-1 text-[11px] font-bold">Balance over time</div>
          <LineChart
            width={240}
            height={78}
            maxMonths={mo.balance.length - 1}
            strokeWidth={2.2}
            series={[
              { values: mo.balance, color: "var(--a-chart-c)", dashed: true },
              { values: sn.balance, color: "var(--a-chart-a)" },
              { values: av.balance, color: "var(--a-chart-b)" },
            ]}
          />
          <div className="mt-1 text-[9px] text-(--a-muted)">Minimums only: {duration(mo.months)}, {usd(mo.totalInterest, 2)} interest</div>
        </Card>
      </div>
    </Phone>
  );
}

export function DebtPhone({ mode = "auto" }: { mode?: "auto" | "light" | "dark" }) {
  const visa = minimumOnly(4560, 22.9, 110);
  return (
    <Phone mode={mode} tab={null} label="Mockup of a Debt Angel debt detail screen with example data: balance, progress bar, APR, minimum payment, interest this month, and a payment history.">
      <div className="flex flex-col gap-2">
        <div className="px-1 text-[13px] font-bold">Visa</div>
        <Card>
          <Cap>Remaining balance</Cap>
          <div className="text-[22px] font-extrabold">{usd(4560, 2)}</div>
          <div className="my-1.5"><Bar pct={5} /></div>
          <Cap>5% paid · {usd(240, 2)} of {usd(4800, 2)}</Cap>
          <div className="mt-2 grid grid-cols-3 gap-1.5">
            {[["APR", "22.9%"], ["Minimum / month", "$110.00"], ["Interest this month", "$87.02"]].map(([l, v]) => (
              <div key={l} className="rounded-lg bg-(--a-alt) p-1.5">
                <div className="text-[8.5px] leading-tight text-(--a-muted)">{l}</div>
                <div className="text-[10.5px] font-bold">{v}</div>
              </div>
            ))}
          </div>
        </Card>
        <div className="flex gap-2">
          <span className="flex-1 rounded-xl bg-(--a-primary) py-2.5 text-center text-[11px] font-bold text-(--a-on-primary)">Log payment</span>
          <span className="flex-1 rounded-xl bg-(--a-soft) py-2.5 text-center text-[11px] font-bold text-(--a-primary)">Edit</span>
        </div>
        <Card>
          <div className="text-[12px] font-bold">If you pay only the minimum</div>
          <div className="text-[10px] text-(--a-muted)">Debt-free in {duration(visa.months)} · {usd(visa.interest, 2)} interest</div>
          <LineChart width={240} height={64} series={[{ values: visa.vals, color: "var(--a-chart-a)" }]} strokeWidth={2.2} />
        </Card>
        <Card>
          <div className="mb-1 text-[12px] font-bold">Payment history</div>
          {[["$120.00", "2026-11-05"], ["$120.00", "2026-10-05"]].map(([a, d]) => (
            <div key={d} className="flex items-center justify-between border-t border-(--a-border) py-1.5 first:border-0">
              <span className="text-[11px] font-bold">{a}</span>
              <span className="text-[9.5px] text-(--a-muted)">{d}</span>
            </div>
          ))}
        </Card>
      </div>
    </Phone>
  );
}
