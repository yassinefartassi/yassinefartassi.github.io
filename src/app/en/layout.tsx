import type { ReactNode } from "react";
import RootShell from "@/components/RootShell";
import en from "@/content/en";
import { buildMetadata } from "@/lib/seo";

export { viewport } from "@/lib/seo";
export const metadata = buildMetadata(en);

export default function Layout({ children }: { children: ReactNode }) {
  return <RootShell content={en}>{children}</RootShell>;
}
