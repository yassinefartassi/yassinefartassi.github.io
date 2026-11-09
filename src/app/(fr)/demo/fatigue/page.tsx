import DemoPage, { buildDemoMetadata } from "@/components/demo/DemoPage";
import FatigueDemo from "@/components/demo/FatigueDemo";
import fr from "@/content/fr";

export const metadata = buildDemoMetadata(fr, "fatigue");

export default function Page() {
  return (
    <DemoPage content={fr} demo="fatigue">
      <FatigueDemo copy={fr.demos.fatigue} common={fr.demos.common} termsPath={fr.terms.path} locale={fr.htmlLang} />
    </DemoPage>
  );
}
