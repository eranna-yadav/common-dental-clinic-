import type { SmileVariant } from "@/data/gallery";

/**
 * Stylised SVG smile used as a placeholder for before/after cases until real,
 * consented patient photos are added (see data/gallery.ts).
 */
const UPPER = [
  { w: 30, h: 36 }, { w: 34, h: 42 }, { w: 36, h: 48 }, { w: 34, h: 52 }, { w: 44, h: 60 },
  { w: 44, h: 60 }, { w: 34, h: 52 }, { w: 36, h: 48 }, { w: 34, h: 42 }, { w: 30, h: 36 },
];

export function SmileIllustration({ variant, className, title, uid }: { variant: SmileVariant; className?: string; title: string; uid: string }) {
  const id = `smile-${uid}`;
  const stained = variant === "stained";
  const toothTop = stained ? "#E7CF8F" : "#FFFFFF";
  const toothBottom = stained ? "#CDAE62" : "#EAF2F2";

  // Lay out teeth symmetrically around centre (x=200)
  const gap = variant === "gap" ? 3 : 1.5;
  const totalW = UPPER.reduce((a, t) => a + t.w + gap, 0);
  let x = 200 - totalW / 2;
  const teeth = UPPER.map((t, i) => {
    const extraGap = variant === "gap" && i === 5 ? 16 : 0;
    x += extraGap;
    const cx = x + t.w / 2;
    x += t.w + gap;
    const dx = cx - 200;
    const top = 92 + dx * dx * 0.0016; // follow the arch
    const h = t.h * (variant === "worn" ? 0.74 : 1);
    let rot = 0;
    let shiftY = 0;
    if (variant === "crowded") {
      rot = [0, 4, -8, 12, -6, 9, -12, 6, -4, 0][i];
      shiftY = [0, 2, 4, -3, 3, -2, 5, 1, 2, 0][i];
    }
    return { ...t, cx, top: top + shiftY, h, rot, i };
  });

  return (
    <svg viewBox="0 0 400 240" role="img" aria-label={title} className={className} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={`${id}-skin`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#E7B795" />
          <stop offset="1" stopColor="#C98F6B" />
        </linearGradient>
        <linearGradient id={`${id}-tooth`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={toothBottom} />
          <stop offset="0.35" stopColor={toothTop} />
          <stop offset="1" stopColor={toothTop} />
        </linearGradient>
        <clipPath id={`${id}-mouth`}>
          <path d="M62 112 Q200 52 338 112 Q200 214 62 112 Z" />
        </clipPath>
      </defs>
      <rect width="400" height="240" fill={`url(#${id}-skin)`} />
      {/* Lips */}
      <path d="M40 112 Q120 46 200 66 Q280 46 360 112 Q200 250 40 112 Z" fill="#B85C68" />
      <path d="M62 112 Q200 52 338 112 Q200 214 62 112 Z" fill="#4A1620" />
      <g clipPath={`url(#${id}-mouth)`}>
        {/* Upper gum */}
        <path d="M40 60 L360 60 L360 98 Q200 70 40 98 Z" fill="#E58D98" />
        {/* Tongue */}
        <ellipse cx="200" cy="190" rx="90" ry="34" fill="#C8505F" />
        {/* Lower teeth */}
        {[-3, -2, -1, 0, 1, 2, 3].map((k) => {
          const cx = 200 + k * 30;
          const y = 146 - Math.abs(k) * 6;
          return <rect key={k} x={cx - 13} y={y} width={26} height={34} rx={7} fill={`url(#${id}-tooth)`} opacity={0.92} />;
        })}
        {/* Upper teeth */}
        {teeth.map((t) => {
          if (variant === "missing" && t.i === 6) return null;
          return (
            <g key={t.i} transform={`rotate(${t.rot} ${t.cx} ${t.top + t.h / 2})`}>
              <rect x={t.cx - t.w / 2} y={t.top - 12} width={t.w} height={t.h + 12} rx={variant === "worn" ? 4 : 10} fill={`url(#${id}-tooth)`} stroke="#00000014" />
              <rect x={t.cx - t.w / 2 + 5} y={t.top + 4} width={4} height={t.h * 0.5} rx={2} fill="#FFFFFF" opacity={stained ? 0.25 : 0.7} />
            </g>
          );
        })}
        {variant === "chipped" && (
          <>
            <path d={`M${teeth[4].cx - 4} ${teeth[4].top + teeth[4].h + 1} l22 0 l0 -16 Z`} fill="#4A1620" />
            <path d={`M${teeth[5].cx - 22} ${teeth[5].top + teeth[5].h + 1} l14 0 l-14 -11 Z`} fill="#4A1620" />
          </>
        )}
      </g>
    </svg>
  );
}
