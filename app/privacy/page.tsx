import type { Metadata } from "next";
import { LegalPage, PlaceholderNotice } from "@/components/LegalPage";
import { CONTACT_EMAIL, DEVELOPER, EFFECTIVE_DATE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "Debt Angel's privacy policy: no account, no tracking, and your debt data never leaves your device.",
  alternates: { canonical: "./" },
};

export default function Privacy() {
  return (
    <LegalPage title="Privacy Policy for Debt Angel">
      <p><strong>Effective date:</strong> {EFFECTIVE_DATE}<br /><strong>App name:</strong> Debt Angel<br /><strong>Developer / publisher:</strong> {DEVELOPER}<br /><strong>Contact email:</strong> {CONTACT_EMAIL}</p>
      <PlaceholderNotice />

      <h2>Summary</h2>
      <p>Debt Angel is a debt payoff tracker. It needs no account. Everything you enter stays on your device. We do not receive it. There is no advertising, no analytics SDK and no tracking.</p>

      <h2>The app: no data leaves your device</h2>
      <p><strong>What you enter:</strong> debt names, balances, interest rates (APR), minimum payments, records of payments you make (amounts, dates, optional notes), and display preferences.</p>
      <p><strong>Where it is stored:</strong> only in the app&apos;s private storage on your device. It is not uploaded to us or to anyone else. We cannot see, recover or delete it.</p>
      <p><strong>What the app does not do:</strong> it does not require an account, does not connect to your bank or any financial account, and does not use your contacts, location, microphone, photos or files.</p>
      <p><strong>Backups and sharing (your choice):</strong> Settings has an optional &ldquo;Export backup&rdquo; button that opens your device&apos;s share sheet with a text copy of your data. What happens next depends on the app you pick. Your operating system (for example Google backup or iCloud) may also back up app data under your device settings.</p>
      <p><strong>Deleting your data:</strong> Settings &gt; Delete all data, or uninstall the app.</p>

      <h2>This website</h2>
      <p>This website is a static site. It has no accounts, no forms, no analytics and no advertising, and it sets no cookies. If you use the dark mode switch, your choice is saved in your own browser&apos;s local storage so the site remembers it. That value never leaves your browser. Your host (for example GitHub Pages) may keep ordinary server logs under its own privacy policy.</p>

      <h2>Possible future features</h2>
      <p>We may add optional features in future versions. A new feature that collects any data will be described in the app, in this policy and in the store listing before it collects anything, and the debt tracker will keep working without it.</p>

      <h2>Children</h2>
      <p>Debt Angel is intended for people 18 and over. We do not knowingly collect information from anyone, and because the app keeps your data on your device, we hold no information about children or anyone else.</p>

      <h2>Financial disclaimer</h2>
      <p>Debt Angel is a calculator and tracking tool. Payoff dates and interest figures are estimates based on the numbers you enter. Nothing here is financial, legal or tax advice.</p>

      <h2>Changes to this policy</h2>
      <p>If this policy changes we will post the updated version at this web address and update the effective date.</p>

      <h2>Contact</h2>
      <p>Questions or requests about this policy: <strong>{CONTACT_EMAIL}</strong></p>
    </LegalPage>
  );
}
