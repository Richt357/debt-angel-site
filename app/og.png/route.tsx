import { ImageResponse } from "next/og";
import { logoSvg } from "@/lib/logo-svg";

export const dynamic = "force-static";
const size = { width: 1200, height: 630 };

// Served at /og.png (a real .png path, so GitHub Pages sends the right content type to link-preview crawlers).
export function GET() {
  const logo = `data:image/svg+xml;utf8,${encodeURIComponent(logoSvg())}`;
  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: "linear-gradient(135deg,#3b33c4,#4f46e5 55%,#7c70ff)", color: "white", padding: 72, alignItems: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", fontSize: 34, fontWeight: 700, opacity: 0.95 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logo} width={64} height={64} alt="" style={{ marginRight: 18 }} />
            Debt Angel
          </div>
          <div style={{ display: "flex", fontSize: 96, fontWeight: 800, lineHeight: 1.02, marginTop: 40 }}>Pick your poison.</div>
          <div style={{ display: "flex", fontSize: 38, marginTop: 28, opacity: 0.95, lineHeight: 1.3 }}>
            Avalanche saves the most interest. Snowball gets you the fastest first win. Debt Angel runs both.
          </div>
          <div style={{ display: "flex", marginTop: 40, fontSize: 28, opacity: 0.85 }}>Private, offline debt payoff tracker</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
