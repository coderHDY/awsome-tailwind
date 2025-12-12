import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";

export async function updateSession(request) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  //   const supabase = createServerClient(
  //     process.env.NEXT_PUBLIC_SUPABASE_URL,
  //     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  //     {
  //       cookies: {
  //         getAll() {
  //           return request.cookies.getAll();
  //         },
  //         setAll(cookiesToSet) {
  //           cookiesToSet.forEach(({ name, value }) =>
  //             request.cookies.set(name, value)
  //           );
  //           supabaseResponse = NextResponse.next({
  //             request,
  //           });
  //           cookiesToSet.forEach(({ name, value, options }) =>
  //             supabaseResponse.cookies.set(name, value, options)
  //           );
  //         },
  //       },
  //     }
  //   );

  // refreshing the auth token
  //   await supabase.auth.getUser();

  return supabaseResponse;
}

const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales: [
    "en",
    "zh",
    "ja",
    "ko",
    "ar",
    "es",
    "pt",
    "de",
    "it",
    "pl",
    "tr",
    "fr",
    "ru",
    "id",
    "hi",
    "ms",
    "th",
  ],
  // Used when no locale matches
  defaultLocale: "en",
  localePrefix: "as-needed",
  localeDetection: false,
});

export async function middleware(request) {
  try {
    const intlResult = await intlMiddleware(request);
    // 如果 intlMiddleware 返回了响应，直接返回
    if (intlResult instanceof NextResponse) {
      return intlResult;
    }
    return await updateSession(request);
  } catch (error) {
    console.error("Middleware error:", error);
    // 根据您的错误处理策略返回适当的响应
    return NextResponse.next();
  }
}

// export const config = {
//   // Match only internationalized pathnames
//   //matcher: ['/', '/(en|fi)/:path*']
//   matcher: ["/((?!_next)(?!.*\\.(?:ico|png|svg|jpg|jpeg|xml|txt)$)(?!/api).*)"],
//   //matcher: ['/((?!api|_next|.*\\..*).*)']
// };

export const config = {
  matcher: [
    // 只拦截非 _next、非静态资源、非 api 路径
    "/((?!api|_next|.*\\..*).*)"
  ]
};