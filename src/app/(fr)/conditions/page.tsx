import TermsPage, { buildTermsMetadata } from "@/components/TermsPage";
import fr from "@/content/fr";

export const metadata = buildTermsMetadata(fr);

export default function Page() {
  return <TermsPage content={fr} />;
}
