const ITEMS: { q: string; a: React.ReactNode }[] = [
  {
    q: "Avalanche or snowball: which is better?",
    a: "Avalanche (highest interest rate first) costs the least interest on paper. Snowball (smallest balance first) gives you the fastest first win, and some people find that momentum is what keeps them going. Both are valid. The best plan is the one you will actually stick with. Debt Angel runs both on your real debts, so you can see the months and the interest each one costs before you choose.",
  },
  {
    q: "Do I need an account?",
    a: "No. There is no sign-up, no login and no email address to give. Open the app and add your debts.",
  },
  {
    q: "Where is my data stored?",
    a: "Only on your device, in the app's private storage. It is not uploaded to us or to anyone else, and the app works fully offline. Your phone's own backup (for example Google backup or iCloud) may back up app data according to your device settings.",
  },
  {
    q: "Does it connect to my bank or credit cards?",
    a: "No. You type in each debt's balance, interest rate (APR) and minimum payment, and log your own payments. Nothing is linked, so nothing is read from your accounts.",
  },
  {
    q: "How are payoff dates and interest calculated?",
    a: "Each month, interest is the balance times the APR divided by 12, rounded to the cent. Every debt then gets its minimum, and the rest of your monthly budget goes to the debt your strategy targets first. When a debt is paid off, its minimum rolls over to the next one. Results are estimates based on the numbers you enter, so they may differ from your lender's statements.",
  },
  {
    q: "What if my minimum payment doesn't cover the interest?",
    a: "Debt Angel warns you. The form shows a live warning, the debt is tagged, and the dashboard explains that the balance will not shrink on minimums alone. The plan keeps simulating honestly: if the debt can never be paid with the payments you entered, it says so instead of showing a made-up date.",
  },
  {
    q: "Can I take my data with me?",
    a: "Yes. Settings has an optional Export backup button that opens your phone's share sheet with a JSON copy of your data. You choose where it goes. You can also delete all data from Settings at any time.",
  },
  {
    q: "How much does it cost?",
    a: "Free. The app has no payments, ads or subscriptions.",
  },
  {
    q: "Which phones does it run on, and when can I get it?",
    a: "Debt Angel is built for Android and iOS from one codebase. It is not in the stores yet. The Google Play and App Store buttons on this page are placeholders marked Coming soon.",
  },
  {
    q: "Is this financial advice?",
    a: "No. Debt Angel is a calculator and tracker. Payoff dates and interest figures are estimates, and nothing on this site or in the app is financial, legal or tax advice.",
  },
  {
    q: "What is Sponsor a Debt?",
    a: "An optional program we may add in a later version. It is not part of the app today. If it ever launches, it would be separate from the tracker, and the tracker would keep working without it. We make no promise that any case would be approved or funded.",
  },
];

export function Faq() {
  return (
    <div className="divide-y divide-(--line) overflow-hidden rounded-2xl border border-(--line) bg-(--surface)">
      {ITEMS.map((it) => (
        <details key={it.q} className="group">
          <summary className="flex min-h-14 cursor-pointer items-center justify-between gap-4 px-5 py-3 text-left font-semibold hover:bg-(--surface-alt)">
            {it.q}
            <svg className="chev h-5 w-5 shrink-0 text-(--fg-muted) transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </summary>
          <p className="px-5 pb-5 text-(--fg-muted)">{it.a}</p>
        </details>
      ))}
    </div>
  );
}
