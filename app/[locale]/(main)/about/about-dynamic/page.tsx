import Calc from "./components/Calc";
import { getTranslations } from "next-intl/server";
// export { generateStaticParams } from "@/i18n";

// export const dynamic = "force-static";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  let locale = resolvedParams.locale;
  if (!locale) {
    locale = "en"; // 默认 locale 为 "en"
  }

  const t = await getTranslations({
    locale,
    namespace: "home",
  });
  return {
    title: t("title"),
    description: t("description"),
    keywords: [],
    canonicalUrlRelative: "/ai-about",
  };
}

const page = async ({ params }: any) => {
  const resolvedParams = await params;
  let locale = resolvedParams.locale;
  if (!locale) {
    locale = "en"; // 默认 locale 为 "en"
  }

  const t = await getTranslations({
    locale,
    namespace: "home",
  });
  return (
    <div>
      <h1>{t("title")}</h1>
      <p>{t("description")}</p>
      <Calc />
    </div>
  );
};

export default page;
