/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Calc from "./components/Calc";
import { getTranslations } from "next-intl/server";
export { generateStaticParams } from "@/i18n/request";

export const dynamic = "force-static";

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

      <div className="w-[80vw] h-[80vw] bg-red-500 relative">
        <img
          src="https://cdn.pixabay.com/photo/2024/08/08/10/06/beauty-8954102_1280.png"
          alt="about"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="relative mt-2 w-[80vw] h-[80vw] bg-blue-500">
        <Image
          src="https://cdn.pixabay.com/photo/2024/08/08/10/06/beauty-8954102_1280.png"
          alt="about"
          fill
          className="object-cover"
          sizes="
          (max-width: 640px) 100vw,
          (max-width: 1024px) 50vw,
          33vw
        "
        />
      </div>
    </div>
  );
};

export default page;
