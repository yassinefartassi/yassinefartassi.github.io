import TermsPage, { buildTermsMetadata } from "@/components/TermsPage";
import en from "@/content/en";

export const metadata = buildTermsMetadata(en);

export default function Page() {
  return <TermsPage content={en} />;
}
