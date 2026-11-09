import DemoPage, { buildDemoMetadata } from "@/components/demo/DemoPage";
import RppgDemo from "@/components/demo/RppgDemo";
import fr from "@/content/fr";

export const metadata = buildDemoMetadata(fr, "nexus");

export default function Page() {
  return (
    <DemoPage content={fr} demo="nexus">
      <RppgDemo copy={fr.demos.nexus} common={fr.demos.common} termsPath={fr.terms.path} />
    </DemoPage>
  );
}
