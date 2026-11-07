import type { ReactNode } from "react";
import RootShell from "@/components/RootShell";
import fr from "@/content/fr";
import { buildMetadata } from "@/lib/seo";

export { viewport } from "@/lib/seo";
export const metadata = buildMetadata(fr);

export default function Layout({ children }: { children: ReactNode }) {
  return <RootShell content={fr}>{children}</RootShell>;
}
