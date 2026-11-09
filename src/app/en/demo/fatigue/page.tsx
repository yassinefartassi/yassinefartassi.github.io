import DemoPage, { buildDemoMetadata } from "@/components/demo/DemoPage";
import FatigueDemo from "@/components/demo/FatigueDemo";
import en from "@/content/en";

export const metadata = buildDemoMetadata(en, "fatigue");

export default function Page() {
  return (
    <DemoPage content={en} demo="fatigue">
      <FatigueDemo copy={en.demos.fatigue} common={en.demos.common} termsPath={en.terms.path} locale={en.htmlLang} />
    </DemoPage>
  );
}
