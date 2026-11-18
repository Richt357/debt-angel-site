import Link from "next/link";
import { Faq } from "@/components/Faq";
import { FirstWinMeter } from "@/components/FirstWinMeter";
import { LineChart } from "@/components/LineChart";
import { PayoffBars } from "@/components/PayoffBars";
import { Reveal } from "@/components/Reveal";
import { StoreButtons } from "@/components/StoreButtons";
import { DashboardPhone, DebtPhone, StrategyPhone } from "@/components/screens";
import { EXAMPLE, FIRST_WIN, INTEREST_GAP, START_TOTAL, openDebts, snowballExtraInterest, usd } from "@/lib/example";
import { PRICE_LABEL } from "@/lib/site";

const dur = (m: number) => `${Math.floor(m / 12) ? `${Math.floor(m / 12)} yrs ` : ""}${m % 12 ? `${m % 12} mos` : ""}`.trim();
const wrap = "mx-auto w-full max-w-6xl px-5 sm:px-8";

function SectionHead({ kicker, title, children }: { kicker: string; title: string; children?: React.ReactNode }) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center">
      <p className="text-sm font-bold uppercase tracking-widest text-(--accent)">{kicker}</p>
      <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">{title}</h2>
      {children && <p className="mt-4 text-lg text-(--fg-muted)">{children}</p>}
    </div>
  );
}

function ExampleTag({ children = "Example numbers" }: { children?: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-gold bg-gold-light/25 px-2.5 py-0.5 text-xs font-bold text-(--fg)">
      {children}
    </span>
  );
}

export default function Home() {
  const { avalanche: av, snowball: sn, minimumsOnly: mo } = EXAMPLE;
  return (
    <>
      {/* ───────── HERO: the core tension ───────── */}
      <section className="relative overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(124,112,255,.28),transparent_70%)] dark:bg-[radial-gradient(60%_50%_at_50%_0%,rgba(140,147,255,.2),transparent_70%)]" />
        <div className={`${wrap} pb-16 pt-12 text-center sm:pt-20`}>
          <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-(--line) bg-(--surface) px-4 py-1.5 text-sm font-medium text-(--fg-muted)">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-gold-light" />
            Private · Offline · No account
          </p>
          <h1 className="mx-auto mt-6 max-w-4xl text-5xl font-extrabold tracking-tight sm:text-7xl">
            Pick your <span className="text-(--accent)">poison.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-(--fg-muted) sm:text-xl">
            There are two proven ways to pay off debt. One saves you the most money. The other keeps you from quitting. Both are valid, and Debt Angel supports both.
          </p>

          <div className="relative mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-2" role="group" aria-label="Avalanche versus snowball">
            <div aria-hidden="true" className="absolute left-1/2 top-1/2 z-10 hidden h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-(--page) bg-gold-light text-sm font-black text-ink shadow-lg md:flex">
              VS
            </div>

            <article className="rounded-3xl border-2 p-6 text-left sm:p-8" style={{ borderColor: "var(--avalanche)", background: "var(--surface)" }}>
              <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--avalanche)" }}>The math path</p>
              <h2 className="mt-1 text-4xl font-extrabold">Avalanche</h2>
              <p className="mt-1 font-medium text-(--fg-muted)">Highest interest rate first</p>
              <p className="mt-5 text-2xl font-extrabold leading-tight sm:text-3xl">Lowest total interest.</p>
              <p className="mt-2 text-(--fg-muted)">Every extra dollar goes to your most expensive debt, so across the whole payoff you pay the least in interest.</p>
              <FirstWinMeter strategy="avalanche" />
            </article>

            <article className="rounded-3xl border-2 p-6 text-left sm:p-8" style={{ borderColor: "var(--snowball)", background: "var(--surface)" }}>
              <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--snowball)" }}>The momentum path</p>
              <h2 className="mt-1 text-4xl font-extrabold">Snowball</h2>
              <p className="mt-1 font-medium text-(--fg-muted)">Smallest balance first</p>
              <p className="mt-5 text-2xl font-extrabold leading-tight sm:text-3xl">Fastest first win.</p>
              <p className="mt-2 text-(--fg-muted)">You clear your smallest balance first. Seeing a debt disappear early can make it easier to keep going.</p>
              <FirstWinMeter strategy="snowball" />
            </article>
          </div>

          <p className="mx-auto mt-10 max-w-3xl text-2xl font-bold tracking-tight sm:text-3xl">
            Debt Angel runs both and shows you the difference for your real debts.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4">
            <StoreButtons className="justify-center" />
            <Link href="/#compare" className="inline-flex min-h-11 items-center gap-1 font-semibold text-(--accent) underline-offset-4 hover:underline">
              See the same debts run both ways <span aria-hidden="true">↓</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ───────── COMPARE: example-data visual ───────── */}
      <section id="compare" className="border-y border-(--line) bg-(--surface) py-20">
        <div className={wrap}>
          <SectionHead kicker="The same debts, two paths" title="Watch both plans play out">
            Four made-up debts and {usd(EXAMPLE.extra)} extra per month, run through the same payoff math the app uses. <ExampleTag /> Your numbers will differ.
          </SectionHead>

          <div className="mx-auto mb-8 max-w-3xl rounded-2xl border border-(--line) bg-(--page) p-5">
            <h3 className="mb-3 flex flex-wrap items-center gap-2 text-sm font-bold uppercase tracking-wide text-(--fg-muted)">
              Example debts · {usd(START_TOTAL)} in total <ExampleTag />
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[440px] text-left text-sm">
                <thead className="text-xs text-(--fg-muted)">
                  <tr><th className="pb-1.5 font-semibold">Debt</th><th className="pb-1.5 font-semibold">Balance</th><th className="pb-1.5 font-semibold">APR</th><th className="pb-1.5 font-semibold">Minimum</th></tr>
                </thead>
                <tbody>
                  {EXAMPLE.debts.map((d) => (
                    <tr key={d.id} className="border-t border-(--line)">
                      <th scope="row" className="py-2 font-semibold">{d.name}</th>
                      <td>{usd(d.balance)}</td><td>{d.apr}%</td><td>{usd(d.minPayment)}/mo</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {([["avalanche", "Avalanche", "Pays off the highest APR first", av], ["snowball", "Snowball", "Pays off the smallest balance first", sn]] as const).map(([key, name, sub, r]) => (
              <div key={key} className="rounded-3xl border-2 bg-(--page) p-6" style={{ borderColor: key === "avalanche" ? "var(--avalanche)" : "var(--snowball)" }}>
                <div className="mb-5 flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h3 className="text-2xl font-extrabold">{name}</h3>
                    <p className="text-sm text-(--fg-muted)">{sub}</p>
                  </div>
                  <ExampleTag />
                </div>
                <PayoffBars strategy={key} />
                <dl className="mt-6 grid grid-cols-3 gap-3 border-t border-(--line) pt-4 text-sm">
                  <div><dt className="text-xs text-(--fg-muted)">First win</dt><dd className="font-bold">Month {FIRST_WIN[key].month}</dd></div>
                  <div><dt className="text-xs text-(--fg-muted)">Debt-free</dt><dd className="font-bold">{dur(r.months)}</dd></div>
                  <div><dt className="text-xs text-(--fg-muted)">Total interest</dt><dd className="font-bold">{usd(r.totalInterest, 2)}</dd></div>
                </dl>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[1.25fr_1fr]">
            <div className="rounded-3xl border border-(--line) bg-(--page) p-6">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-lg font-bold">The same payoff, two ways to see it</h3>
                <ExampleTag />
              </div>
              <Reveal>
                <p className="mb-1 text-sm font-semibold text-(--fg-muted)">Momentum: debts still open</p>
                <LineChart
                  width={560}
                  height={190}
                  axes
                  strokeWidth={3.5}
                  maxValue={4}
                  maxMonths={av.months}
                  yTicks={[0, 1, 2, 3, 4]}
                  xTicks={[0, 6, 12, 18, 24, 30]}
                  formatY={(n) => String(n)}
                  title={`Step-style chart of debts still open each month. Snowball is down to three debts after month ${sn.order[0].month}; avalanche takes until month ${av.order[0].month}. Both reach zero debts in month ${av.months}.`}
                  series={[
                    { values: openDebts(av), color: "var(--avalanche)" },
                    { values: openDebts(sn), color: "var(--snowball)", delay: "0.15s" },
                  ]}
                />
                <p className="mb-1 mt-6 text-sm font-semibold text-(--fg-muted)">The math: extra interest the snowball plan has paid</p>
                <LineChart
                  width={560}
                  height={190}
                  axes
                  strokeWidth={3.5}
                  maxValue={100}
                  maxMonths={av.months}
                  yTicks={[0, 25, 50, 75, 100]}
                  xTicks={[0, 6, 12, 18, 24, 30]}
                  formatY={(n) => `$${n}`}
                  title={`Line chart of how much more interest the snowball plan has paid than the avalanche plan, growing to ${usd(INTEREST_GAP, 2)} by the end.`}
                  series={[{ values: snowballExtraInterest(), color: "var(--snowball)" }]}
                />
              </Reveal>
              <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm">
                <li className="flex items-center gap-2"><span aria-hidden="true" className="h-1.5 w-6 rounded" style={{ background: "var(--avalanche)" }} />Avalanche</li>
                <li className="flex items-center gap-2"><span aria-hidden="true" className="h-1.5 w-6 rounded" style={{ background: "var(--snowball)" }} />Snowball</li>
              </ul>
            </div>

            <div className="rounded-3xl border border-(--line) bg-(--page) p-6">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-lg font-bold">The difference</h3>
                <ExampleTag />
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[320px] text-left text-sm">
                  <thead className="text-xs text-(--fg-muted)">
                    <tr><th className="pb-2 font-semibold"><span className="sr-only">Measure</span></th><th className="pb-2 font-semibold" style={{ color: "var(--avalanche)" }}>Avalanche</th><th className="pb-2 font-semibold" style={{ color: "var(--snowball)" }}>Snowball</th><th className="pb-2 font-semibold">Minimums only</th></tr>
                  </thead>
                  <tbody className="[&_td]:py-2.5 [&_th]:py-2.5 [&_tr]:border-t [&_tr]:border-(--line)">
                    <tr><th scope="row" className="pr-2 text-xs font-semibold text-(--fg-muted)">First debt cleared</th><td className="font-bold">Month {av.order[0].month}</td><td className="font-bold">Month {sn.order[0].month}</td><td>Month {mo.order[0].month}</td></tr>
                    <tr><th scope="row" className="pr-2 text-xs font-semibold text-(--fg-muted)">Debt-free in</th><td className="font-bold">{dur(av.months)}</td><td className="font-bold">{dur(sn.months)}</td><td>{dur(mo.months)}</td></tr>
                    <tr><th scope="row" className="pr-2 text-xs font-semibold text-(--fg-muted)">Total interest</th><td className="font-bold">{usd(av.totalInterest, 2)}</td><td className="font-bold">{usd(sn.totalInterest, 2)}</td><td>{usd(mo.totalInterest, 2)}</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-sm text-(--fg-muted)">
                In this example, avalanche costs {usd(INTEREST_GAP, 2)} less interest, while snowball clears its first debt {av.order[0].month - sn.order[0].month} months sooner. Both finish in {av.months} months. How big the gap is depends on your rates and balances, which is why it is worth running on your real debts.
              </p>
            </div>
          </div>

          {/* The payoff line */}
          <div className="mt-16 grid items-center gap-10 lg:grid-cols-[1fr_auto] lg:gap-16">
            <div>
              <h3 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Debt Angel runs both and shows you the difference for your real debts.</h3>
              <p className="mt-4 text-lg text-(--fg-muted)">Enter your debts once. Then slide an extra monthly payment up or down and watch both plans update side by side.</p>
              <ul className="mt-6 space-y-3 text-(--fg)">
                {[
                  "Months to debt-free and total interest, for snowball and avalanche",
                  "The exact order your debts get paid off under each plan",
                  "A minimums-only baseline, so you can see what the extra payment buys you",
                  "An adjustable extra monthly payment, with quick +$50 and +$100 buttons",
                  "A clear warning when a minimum payment doesn't even cover the interest",
                ].map((t) => (
                  <li key={t} className="flex gap-3"><Check />{t}</li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="float-slow"><StrategyPhone /></div>
              <p className="text-center text-xs text-(--fg-muted)">Recreation of the Strategy screen · <ExampleTag>Example data</ExampleTag></p>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── WHICH ONE ───────── */}
      <section className="py-20">
        <div className={wrap}>
          <SectionHead kicker="Snowball vs avalanche, in plain English" title="Which one is right for you?">
            Either plan works if you keep paying. The question is what keeps <em>you</em> going.
          </SectionHead>
          <div className="grid gap-5 md:grid-cols-2">
            {[
              { name: "Avalanche", color: "var(--avalanche)", how: "Pay the minimum on everything, then put all your extra money on the debt with the highest interest rate. When it's gone, roll its payment into the next-highest rate.", fit: ["You want the lowest total interest", "You're motivated by the numbers", "Your highest-rate debt is also a large one, so the first win may take a while"] },
              { name: "Snowball", color: "var(--snowball)", how: "Pay the minimum on everything, then put all your extra money on the smallest balance. When it's gone, roll its payment into the next-smallest balance.", fit: ["You want a quick win to build momentum", "You've started and quit plans before", "You'd rather feel progress early, even if it costs a little more interest"] },
            ].map((s) => (
              <article key={s.name} className="rounded-3xl border border-(--line) bg-(--surface) p-7">
                <h3 className="text-2xl font-extrabold" style={{ color: s.color }}>{s.name}</h3>
                <p className="mt-2 text-(--fg-muted)">{s.how}</p>
                <p className="mt-5 text-sm font-bold uppercase tracking-wide">A good fit if…</p>
                <ul className="mt-2 space-y-2">
                  {s.fit.map((f) => (<li key={f} className="flex gap-3"><Check color={s.color} />{f}</li>))}
                </ul>
              </article>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-3xl rounded-2xl bg-(--accent-soft) p-5 text-center text-lg font-medium">
            Can&apos;t decide? Run both, pick one, and switch any time. Your payment history stays, and the plan re-runs on your latest numbers.
          </p>
        </div>
      </section>

      {/* ───────── HOW IT WORKS ───────── */}
      <section id="how" className="border-y border-(--line) bg-(--surface) py-20">
        <div className={wrap}>
          <SectionHead kicker="How it works" title="Three steps, no sign-up" />
          <ol className="grid gap-5 md:grid-cols-3">
            {[
              ["Add your debts", "Name, current balance, interest rate (APR) and minimum payment. Credit cards, loans, a medical bill, anything you owe."],
              ["Compare both plans", "Set an extra monthly amount and see snowball and avalanche side by side: months, total interest, payoff order, and a minimums-only baseline."],
              ["Pay, log, repeat", "Log each payment and watch your progress ring, your balance chart and your debt-free date update."],
            ].map(([t, d], i) => (
              <li key={t} className="rounded-3xl border border-(--line) bg-(--page) p-7">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-600 text-lg font-extrabold text-white dark:bg-brand-400 dark:text-night">{i + 1}</span>
                <h3 className="mt-4 text-xl font-bold">{t}</h3>
                <p className="mt-2 text-(--fg-muted)">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ───────── FEATURES (supporting) ───────── */}
      <section id="features" className="py-20">
        <div className={wrap}>
          <SectionHead kicker="Everything else you get" title="Built to keep you on track">
            The comparison is the heart of Debt Angel. These are the tools around it.
          </SectionHead>

          <div className="mb-14 flex flex-wrap items-start justify-center gap-10">
            <figure className="flex flex-col items-center gap-3">
              <DashboardPhone mode="light" />
              <figcaption className="text-center text-xs text-(--fg-muted)">Dashboard, light mode · <ExampleTag>Example data</ExampleTag></figcaption>
            </figure>
            <figure className="flex flex-col items-center gap-3">
              <DebtPhone mode="dark" />
              <figcaption className="text-center text-xs text-(--fg-muted)">Debt detail, dark mode · <ExampleTag>Example data</ExampleTag></figcaption>
            </figure>
          </div>

          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Add any debt", "Name, balance, APR and minimum payment. Edit or delete any time. 0% APR is supported.", "M12 5v14M5 12h14"],
              ["Log payments", "Record each payment with a date and optional note, and keep a full history per debt.", "M3 6h18M3 12h18M3 18h12"],
              ["A simple dashboard", "Total debt, paid so far, a progress ring, your debt-free date and a payoff chart.", "M4 20V10M10 20V4M16 20v-8M22 20H2"],
              ["Both strategies", "Snowball vs avalanche with an adjustable extra payment, and a minimums-only baseline.", "M7 7l5-4 5 4M7 17l5 4 5-4"],
              ["Low-minimum warnings", "Told when a minimum doesn't cover a month of interest, before it surprises you.", "M12 9v4M12 17h.01M10.3 3.9L2.4 18a2 2 0 0 0 1.7 3h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"],
              ["Light and dark mode", "Follows your phone's setting. Large tap targets and screen-reader labels throughout.", "M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"],
              ["Offline and private", "Works with no connection. Your data stays on your device. No account, no tracking.", "M12 3l8 3v6c0 5-3.4 8-8 9-4.6-1-8-4-8-9V6z"],
              ["JSON export", "Optional backup: share a JSON copy of your data wherever you choose.", "M12 3v12M7 10l5 5 5-5M5 21h14"],
            ].map(([t, d, p]) => (
              <li key={t} className="rounded-2xl border border-(--line) bg-(--surface) p-5">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-(--accent-soft) text-(--accent)">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={p} /></svg>
                </span>
                <h3 className="mt-3 font-bold">{t}</h3>
                <p className="mt-1 text-sm text-(--fg-muted)">{d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────── PRIVACY ───────── */}
      <section id="privacy" className="border-y border-(--line) bg-(--surface) py-20">
        <div className={`${wrap} grid items-center gap-10 lg:grid-cols-2`}>
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-(--accent)">Privacy</p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">Your debts are your business.</h2>
            <p className="mt-4 text-lg text-(--fg-muted)">Debt Angel is built so there is nothing for us to collect.</p>
            <ul className="mt-6 space-y-3">
              {[
                "No account, sign-up or email address",
                "Everything you enter stays on your device, in the app's private storage",
                "No ads, no analytics, no tracking",
                "No bank connection: you type your own numbers",
                "Works fully offline",
                "Export a backup only if you choose to, and delete all data from Settings any time",
              ].map((t) => (<li key={t} className="flex gap-3"><Check />{t}</li>))}
            </ul>
            <Link href="/privacy/" className="mt-6 inline-flex min-h-11 items-center font-semibold text-(--accent) underline underline-offset-4">Read the privacy policy</Link>
          </div>
          <div className="rounded-3xl border border-(--line) bg-(--page) p-8">
            <svg viewBox="0 0 24 24" width="56" height="56" fill="none" stroke="var(--accent)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3l8 3v6c0 5-3.4 8-8 9-4.6-1-8-4-8-9V6z" /><path d="M9 12l2 2 4-4" /></svg>
            <p className="mt-4 text-xl font-bold">What happens to your data?</p>
            <dl className="mt-4 space-y-3 text-sm">
              {[["Sent to us", "Nothing."], ["Stored", "On your phone only."], ["Needs internet", "No."], ["Needs an account", "No."]].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 border-b border-(--line) pb-2"><dt className="text-(--fg-muted)">{k}</dt><dd className="font-bold">{v}</dd></div>
              ))}
            </dl>
            <p className="mt-4 text-xs text-(--fg-muted)">Your phone&apos;s own backup (such as Google backup or iCloud) may copy app data, depending on your device settings.</p>
          </div>
        </div>
      </section>

      {/* ───────── GET THE APP ───────── */}
      <section id="get" className="py-20">
        <div className={`${wrap} text-center`}>
          <SectionHead kicker="Get the app" title="Debt Angel is coming to Android and iOS">
            The store listings aren&apos;t live yet. These buttons are placeholders and will link to the real listings when the app is published.
          </SectionHead>
          <StoreButtons className="justify-center" />
          <div className="mx-auto mt-10 max-w-sm rounded-3xl border-2 border-(--accent) bg-(--surface) p-7">
            <p className="text-sm font-bold uppercase tracking-widest text-(--fg-muted)">Price</p>
            <p className="mt-1 text-5xl font-extrabold">{PRICE_LABEL}</p>
            <p className="mt-2 text-(--fg-muted)">No payments, ads or subscriptions in the app.</p>
          </div>

          <aside className="mx-auto mt-10 max-w-2xl rounded-2xl border border-dashed border-(--line) p-5 text-left text-sm text-(--fg-muted)">
            <p className="font-bold text-(--fg)">Coming later: Sponsor a Debt <span className="ml-1 rounded-full bg-(--surface-alt) px-2 py-0.5 text-xs">Not available today</span></p>
            <p className="mt-1">
              We may add an optional program where identity-verified donors can choose to contribute toward reviewed cases, with any payment sent directly to the creditor. It is not part of the app today, the tracker would keep working without it, and nothing about it promises that any case will be approved or funded.
            </p>
          </aside>
        </div>
      </section>

      {/* ───────── FAQ ───────── */}
      <section id="faq" className="border-t border-(--line) bg-(--surface) py-20">
        <div className="mx-auto w-full max-w-3xl px-5 sm:px-8">
          <SectionHead kicker="FAQ" title="Questions, answered" />
          <Faq />
          <p className="mt-6 text-center text-sm text-(--fg-muted)">Debt Angel provides estimates based on the numbers you enter. It is not financial advice.</p>
        </div>
      </section>
    </>
  );
}

function Check({ color = "var(--accent)" }: { color?: string }) {
  return (
    <svg className="mt-1 h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}
