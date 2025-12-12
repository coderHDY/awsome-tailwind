import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";

// Can be imported from a shared config
// export const locales = ["en", "zh", 'ja',"ko", "ar", "es","pt", "de", "fr", "ru", "id", "hi", "th", "ms"];
export const languages = [
  { lang: "en", language: "English", flag: "🇺🇸" },
  { lang: "zh", language: "简体中文", flag: "🇨🇳" },
  { lang: "ja", language: "日本語", flag: "🇯🇵" },
  { lang: "ko", language: "한국어", flag: "🇰🇷" },
  { lang: "ar", language: "العربية", flag: "🇸🇦" },
  { lang: "es", language: "Español", flag: "🇪🇸" },
  { lang: "pt", language: "Português", flag: "🇵🇹" },
  { lang: "de", language: "Deutsch", flag: "🇩🇪" },
  { lang: "fr", language: "Français", flag: "🇫🇷" },
  { lang: "ru", language: "Русский", flag: "🇷🇺" },
  { lang: "id", language: "Indonesia", flag: "🇮🇩" },
  { lang: "hi", language: "Hindi", flag: "🇮🇳" },
  { lang: "th", language: "ไทย", flag: "🇹🇭" },
  { lang: "ms", language: "Malay", flag: "🇲🇾" },
  { lang: "pl", language: "Polski", flag: "🇵🇱" },
  { lang: "it", language: "Italiano", flag: "🇮🇹" },
  { lang: "tr", language: "Türkçe", flag: "🇹🇷" },
];

export const defaultLocale = "en";

// export default getRequestConfig(async ({ requestLocale }) => {
//   let locale = await requestLocale;
//   // Validate that the incoming `locale` parameter is valid
//   const validLocale = languages.map((lang) => lang.lang).includes(locale)
//     ? locale
//     : defaultLocale;
//   return {
//     locale: validLocale,
//     messages: (await import(`./locales/${validLocale}.json`)).default,
//     // messages: (await import(`./locales/en.json`)).default
//   };
// });

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  // console.log("---- locale", locale);
  // Validate that the incoming `locale` parameter is valid
  if (!languages.map((lang) => lang.lang).includes(locale)) {
    locale = defaultLocale;
  }

  return {
    locale,
    messages: (await import(`./locales/${locale}.json`)).default,
    // messages: (await import(`./locales/en.json`)).default
  };
});

export async function generateStaticParams() {
  const locales = [
    "ar",
    "de",
    "en",
    "es",
    "fr",
    "hi",
    "id",
    "it",
    "ja",
    "ko",
    "ms",
    "pl",
    "pt",
    "ru",
    "th",
    "tr",
    "zh",
  ].map((locale) => ({ locale }));
  return locales;
}
