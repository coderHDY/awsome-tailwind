import { getRequestConfig } from "next-intl/server";

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

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !languages.map((lang) => lang.lang).includes(locale)) {
    locale = defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../locales/${locale}.json`)).default,
  };
});

export async function generateStaticParams() {
  const locales = [
    "ar", "de", "en", "es", "fr", "hi", "id", "it",
    "ja", "ko", "ms", "pl", "pt", "ru", "th", "tr", "zh",
  ].map((locale) => ({ locale }));
  return locales;
}
