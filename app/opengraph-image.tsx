import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Default social share image (used by pages without their own image). */
export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "linear-gradient(135deg, #0B1F33 0%, #0F766E 100%)", color: "white", fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 72, height: 72, borderRadius: 20, background: "#5EEAD4", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40, color: "#0B1F33", fontWeight: 800 }}>
            {site.shortName[0]}
          </div>
          <div style={{ fontSize: 36, fontWeight: 700 }}>{site.name}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 68, fontWeight: 800, lineHeight: 1.1, maxWidth: 950 }}>{site.tagline}</div>
          <div style={{ display: "flex", fontSize: 30, marginTop: 24, color: "#5EEAD4" }}>
            {`${site.address.locality}, ${site.address.city} · Rated ${site.rating.value}/5 · ${site.phone.display}`}
          </div>
        </div>
        <div style={{ display: "flex", gap: 16 }}>
          {["Painless care", "Implants", "Clear aligners", "Kids dentistry"].map((t) => (
            <div key={t} style={{ padding: "10px 22px", borderRadius: 999, background: "rgba(255,255,255,0.12)", fontSize: 24 }}>{t}</div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
