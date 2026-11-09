import DemoPage, { buildDemoMetadata } from "@/components/demo/DemoPage";
import RppgDemo from "@/components/demo/RppgDemo";
import en from "@/content/en";

export const metadata = buildDemoMetadata(en, "nexus");

export default function Page() {
  return (
    <DemoPage content={en} demo="nexus">
      <RppgDemo copy={en.demos.nexus} common={en.demos.common} termsPath={en.terms.path} />
    </DemoPage>
  );
}
