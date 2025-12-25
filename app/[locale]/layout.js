import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params; // Next.js 16+ 需要 await params
  setRequestLocale(locale); // 让页面静态渲染
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}