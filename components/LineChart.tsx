export type ChartSeries = { values: number[]; color: string; dashed?: boolean; width?: number; delay?: string };

/**
 * Small dependency-free SVG line chart of balance over time (month 0 .. N).
 * `color` is any CSS colour or var(...). Solid lines animate (draw) when inside a <Reveal>.
 */
export function LineChart({
  series,
  width = 320,
  height = 160,
  maxValue,
  maxMonths,
  axes = false,
  strokeWidth = 3,
  labelColor = "var(--fg-muted)",
  gridColor = "var(--line)",
  yTicks = [],
  xTicks = [],
  formatY = (n: number) => String(n),
  title,
}: {
  series: ChartSeries[];
  width?: number;
  height?: number;
  maxValue?: number;
  maxMonths?: number;
  axes?: boolean;
  strokeWidth?: number;
  labelColor?: string;
  gridColor?: string;
  yTicks?: number[];
  xTicks?: number[];
  formatY?: (n: number) => string;
  title?: string;
}) {
  const padL = axes ? 46 : 4, padR = axes ? 20 : 8, padT = 8, padB = axes ? 26 : 6;
  const max = maxValue ?? Math.max(...series.flatMap((s) => s.values));
  const n = maxMonths ?? Math.max(...series.map((s) => s.values.length - 1));
  const x = (i: number) => padL + (i / n) * (width - padL - padR);
  const y = (v: number) => padT + (1 - v / max) * (height - padT - padB);
  const path = (vals: number[]) => vals.map((v, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(" ");

  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" role={title ? "img" : undefined} aria-label={title} aria-hidden={title ? undefined : true} className="block h-auto">
      {axes &&
        yTicks.map((t) => (
          <g key={t}>
            <line x1={padL} x2={width - padR} y1={y(t)} y2={y(t)} stroke={gridColor} strokeWidth={1} />
            <text x={padL - 6} y={y(t) + 4} textAnchor="end" fontSize="11" fill={labelColor}>
              {formatY(t)}
            </text>
          </g>
        ))}
      {axes &&
        xTicks.map((t) => (
          <text key={t} x={x(t)} y={height - 6} textAnchor="middle" fontSize="11" fill={labelColor}>
            {t === 0 ? "Now" : `${t} mo`}
          </text>
        ))}
      {axes && <line x1={padL} x2={width - padR} y1={y(0)} y2={y(0)} stroke={gridColor} strokeWidth={1.5} />}
      {series.map((s, i) =>
        s.dashed ? (
          <path key={i} d={path(s.values)} fill="none" stroke={s.color} strokeWidth={s.width ?? strokeWidth - 0.5} strokeDasharray="5 5" strokeLinecap="round" strokeLinejoin="round" />
        ) : (
          <path
            key={i}
            d={path(s.values)}
            pathLength={1}
            className="draw"
            style={{ ["--d" as string]: s.delay ?? "0s" }}
            fill="none"
            stroke={s.color}
            strokeWidth={s.width ?? strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ),
      )}
    </svg>
  );
}
