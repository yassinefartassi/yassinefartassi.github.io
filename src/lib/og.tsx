import { ImageResponse } from "next/og";
import type { Content } from "@/content/types";

export const OG_SIZE = { width: 1200, height: 630 };

/** Open Graph / Twitter card in the site's style: cream, soft orange field, one glass panel. */
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
          backgroundColor: "#f3eee3",
          backgroundImage:
            "radial-gradient(circle at 88% 8%, rgba(217,84,30,0.32) 0%, rgba(217,84,30,0) 48%), radial-gradient(circle at 6% 104%, rgba(17,17,17,0.08) 0%, rgba(17,17,17,0) 46%)",
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
            background: "rgba(250,247,242,0.62)",
            border: "1px solid rgba(17,17,17,0.08)",
            boxShadow: "inset 0 1px 0 rgba(250,247,242,0.95), 0 24px 48px -16px rgba(17,17,17,0.12)",
            color: "#111111",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 26, color: "#504f4c" }}>
            <div style={{ width: 12, height: 12, borderRadius: 9999, background: "#d9541e" }} />
            {c.hero.status}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 96, fontWeight: 600, letterSpacing: -3, lineHeight: 1 }}>
              {c.person.name}
            </div>
            <div style={{ marginTop: 28, fontSize: 38, color: "#111111" }}>
              {c.meta.ogKicker}
            </div>
            <div style={{ marginTop: 10, fontSize: 30, color: "#504f4c" }}>{c.hero.focus.join(" · ")}</div>
          </div>
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
