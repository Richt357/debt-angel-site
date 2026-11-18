// Central place for every placeholder / site-wide setting. Search for "PLACEHOLDER" to find them all.

export const SITE_NAME = "Debt Angel";
export const TAGLINE = "Pick your poison. Debt Angel runs both.";
export const DESCRIPTION =
  "Debt Angel is a private, offline debt payoff tracker for Android and iOS. Compare the avalanche and snowball methods on your real debts, log payments, and see your debt-free date. No account, no tracking.";

// Used for canonical URLs and Open Graph tags. Set NEXT_PUBLIC_SITE_URL when you move to a custom domain.
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://richt357.github.io";
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "/debt-angel-site";

// PLACEHOLDER: store links. Replace "#" with the real listing URLs once the app is published.
export const PLAY_STORE_URL = "#";
export const APP_STORE_URL = "#";
export const STORES_LIVE = false; // set to true when both URLs above are real

// PLACEHOLDER: contact and legal details (shown in square brackets on the privacy policy and terms pages).
export const CONTACT_EMAIL = "[YOUR_CONTACT_EMAIL@example.com]";
export const DEVELOPER = "[YOUR NAME OR COMPANY NAME]";
export const EFFECTIVE_DATE = "[DATE, e.g. 2026-12-01]";

// PLACEHOLDER decision: the app has no payments, ads or subscriptions, so it is shown as "Free".
export const PRICE_LABEL = "Free";
