import { useId } from "react";
import { LOGO } from "./logo-data";

/** The Debt Angel app icon (wings + gold halo on the brand gradient), re-drawn as SVG. */
export function Logo({ size = 40, className = "" }: { size?: number; className?: string }) {
  const id = useId();
  return (
    <svg width={size} height={size} viewBox="0 0 1024 1024" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0.5" y2="1">
          <stop offset="0" stopColor="#7C70FF" />
          <stop offset="1" stopColor="#4F46E5" />
        </linearGradient>
      </defs>
      <rect width="1024" height="1024" rx="230" fill={`url(#${id})`} />
      {LOGO.wings.map((e, i) => (
        <ellipse key={i} cx={e.cx} cy={e.cy} rx={e.rx} ry={e.ry} transform={`rotate(${e.rot} ${e.cx} ${e.cy})`} fill="#fff" stroke="#C4C0FA" strokeWidth={4} />
      ))}
      <ellipse cx={LOGO.body.cx} cy={LOGO.body.cy} rx={LOGO.body.rx} ry={LOGO.body.ry} fill="#fff" stroke="#C4C0FA" strokeWidth={4} />
      <ellipse cx={LOGO.halo.cx} cy={LOGO.halo.cy} rx={LOGO.halo.rx} ry={LOGO.halo.ry} fill="none" stroke="#FFC933" strokeWidth={LOGO.halo.sw} />
    </svg>
  );
}
