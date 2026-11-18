import type { Metadata } from "next";
import { LegalPage, PlaceholderNotice } from "@/components/LegalPage";
import { CONTACT_EMAIL, DEVELOPER, EFFECTIVE_DATE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of use",
  description: "Terms of use for the Debt Angel website and app.",
  alternates: { canonical: "./" },
};

export default function Terms() {
  return (
    <LegalPage title="Terms of Use">
      <p><strong>Effective date:</strong> {EFFECTIVE_DATE}<br /><strong>Provider:</strong> {DEVELOPER}<br /><strong>Contact:</strong> {CONTACT_EMAIL}</p>
      <PlaceholderNotice />
      <p>These are plain-language starter terms for the Debt Angel website and app. Have them reviewed by a lawyer before you rely on them.</p>

      <h2>1. What Debt Angel is</h2>
      <p>Debt Angel is a calculator and tracker. You enter your debts and payments, and it estimates payoff dates and interest under different strategies. It does not lend money, move money, connect to your accounts, or give advice.</p>

      <h2>2. Not financial advice</h2>
      <p>Results are estimates based on the numbers you enter and on simplified assumptions (for example, interest charged monthly and payments made at the end of each month). Your lender&apos;s figures may differ. Nothing on this website or in the app is financial, legal, tax or credit-counseling advice. Make your own decisions, and talk to a qualified professional if you need advice.</p>

      <h2>3. Your data</h2>
      <p>Data you enter in the app stays on your device (see the <a href="../privacy/">Privacy Policy</a>). You are responsible for keeping your own backups. If you uninstall the app or delete your data, we cannot recover it.</p>

      <h2>4. Using the app and site</h2>
      <p>Use them lawfully and do not try to disrupt, reverse engineer for harmful purposes, or misuse them. The Debt Angel name, icon and website content belong to their owner.</p>

      <h2>5. No warranty, limited liability</h2>
      <p>The app and website are provided &ldquo;as is&rdquo;, without warranties of any kind. To the extent the law allows, we are not liable for losses arising from your use of, or reliance on, the estimates they show. Nothing here limits any liability that cannot be limited by law.</p>

      <h2>6. Optional future programs</h2>
      <p>If we ever add a separate optional program (such as the planned &ldquo;Sponsor a Debt&rdquo;), it will have its own terms and privacy information, which you would need to accept separately. No such program is available today, and nothing on this site promises that any debt will be paid or that any case will be approved or funded.</p>

      <h2>7. Changes</h2>
      <p>We may update these terms and will post the new version here with a new effective date.</p>

      <h2>8. Contact</h2>
      <p>Questions: <strong>{CONTACT_EMAIL}</strong></p>
    </LegalPage>
  );
}
