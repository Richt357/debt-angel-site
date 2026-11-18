import { LOGO } from "@/components/logo-data";

/** The logo as a standalone SVG string (used for the Open Graph image). */
export function logoSvg(): string {
  const wings = LOGO.wings
    .map((e) => `<ellipse cx="${e.cx}" cy="${e.cy}" rx="${e.rx}" ry="${e.ry}" transform="rotate(${e.rot} ${e.cx} ${e.cy})" fill="#fff" stroke="#C4C0FA" stroke-width="4"/>`)
    .join("");
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><defs><linearGradient id="g" x1="0" y1="0" x2="0.5" y2="1"><stop offset="0" stop-color="#7C70FF"/><stop offset="1" stop-color="#4F46E5"/></linearGradient></defs>` +
    `<rect width="1024" height="1024" rx="230" fill="url(#g)"/>${wings}` +
    `<ellipse cx="${LOGO.body.cx}" cy="${LOGO.body.cy}" rx="${LOGO.body.rx}" ry="${LOGO.body.ry}" fill="#fff" stroke="#C4C0FA" stroke-width="4"/>` +
    `<ellipse cx="${LOGO.halo.cx}" cy="${LOGO.halo.cy}" rx="${LOGO.halo.rx}" ry="${LOGO.halo.ry}" fill="none" stroke="#FFC933" stroke-width="${LOGO.halo.sw}"/></svg>`
  );
}
