import { ImageResponse } from "next/og";
import type { Content } from "@/content/types";

export const OG_SIZE = { width: 1200, height: 630 };

/** Open Graph / Twitter card in the site's style: dark, soft teal field, one glass panel. */
export function renderOgImage(c: Content) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          padding: 64,
          // soft colour fields as layered gradients (no clipped shapes)
          backgroundColor: "#0b0d0d",
          backgroundImage:
            "radial-gradient(circle at 88% 8%, rgba(58,150,126,0.5) 0%, rgba(58,150,126,0) 48%), radial-gradient(circle at 6% 104%, rgba(140,128,104,0.32) 0%, rgba(140,128,104,0) 46%)",
        }}
      >
        {/* glass panel */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
            padding: "56px 64px",
            borderRadius: 32,
            background: "rgba(255,255,255,0.07)",
            border: "1px solid rgba(255,255,255,0.16)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.18)",
            color: "#f1f4f3",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 26, color: "#b0bab7" }}>
            <div style={{ width: 12, height: 12, borderRadius: 9999, background: "#72c7b1" }} />
            {c.hero.status}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 96, fontWeight: 600, letterSpacing: -3, lineHeight: 1 }}>
              {c.person.name}
            </div>
            <div style={{ marginTop: 28, fontSize: 38, color: "#f1f4f3" }}>
              {c.meta.ogKicker}
            </div>
            <div style={{ marginTop: 10, fontSize: 30, color: "#b0bab7" }}>{c.hero.focus.join(" · ")}</div>
          </div>
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
