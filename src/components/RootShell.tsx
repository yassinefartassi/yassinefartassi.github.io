import type { ReactNode } from "react";
import type { Content } from "@/content/types";
import { inter } from "@/lib/fonts";
import "@/app/globals.css";

// Runs before first paint: applies a saved theme choice (no flash) and marks
// that JS is available so reveal styles only hide content when they can show it again.
// With no saved choice, CSS follows prefers-color-scheme live.
const BOOT = `(function(){var d=document.documentElement;d.classList.add('js');try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark'){d.setAttribute('data-theme',t);}}catch(e){}})();`;

/** Shared <html>/<body> for both root layouts, so each language gets its own lang attribute. */
export default function RootShell({ content, children }: { content: Content; children: ReactNode }) {
  return (
    <html lang={content.htmlLang} className={inter.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOT }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
