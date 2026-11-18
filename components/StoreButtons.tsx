import { APP_STORE_URL, PLAY_STORE_URL, STORES_LIVE } from "@/lib/site";

// Generic store buttons (not the official badge artwork, which must be downloaded from Google / Apple
// and used under their brand rules once the listings exist). Links are "#" placeholders until the app is published.
function PlayIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 2.8v18.4c0 .5.5.8.9.5l15.7-9.2c.4-.2.4-.8 0-1L4.9 2.3c-.4-.3-.9 0-.9.5z" fill="currentColor" />
    </svg>
  );
}
function AppleIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
        fill="currentColor"
      />
    </svg>
  );
}

function StoreButton({ href, kicker, name, icon }: { href: string; kicker: string; name: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      aria-disabled={!STORES_LIVE}
      aria-label={`${name}: coming soon`}
     
      className="group inline-flex min-h-14 items-center gap-3 rounded-xl bg-ink px-5 py-2.5 text-white shadow-sm ring-1 ring-white/10 transition hover:bg-black dark:bg-white dark:text-ink dark:hover:bg-brand-50"
    >
      {icon}
      <span className="flex flex-col text-left leading-tight">
        <span className="text-[11px] uppercase tracking-wide opacity-80">{kicker}</span>
        <span className="text-base font-semibold">{name}</span>
      </span>
      {!STORES_LIVE && (
        <span className="ml-1 rounded-full bg-gold-light px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-ink">Coming soon</span>
      )}
    </a>
  );
}

export function StoreButtons({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      <StoreButton href={PLAY_STORE_URL} kicker="Get it on" name="Google Play" icon={<PlayIcon />} />
      <StoreButton href={APP_STORE_URL} kicker="Download on the" name="App Store" icon={<AppleIcon />} />
    </div>
  );
}
