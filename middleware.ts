import { NextRequest, NextResponse } from "next/server";

const SESSION_COOKIES = [
  "authjs.session-token",
  "__Secure-authjs.session-token",
  "next-auth.session-token",
  "__Secure-next-auth.session-token",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // On the login page, delete any stale session cookies from the browser response.
  // cookies().delete() is forbidden in Server Components, so this is the only reliable
  // place to clear them. A bad cookie (e.g. from a different environment) causes
  // NextAuth to throw JWTSessionError on every request until the cookie is gone.
  if (
    pathname === "/admin/login" ||
    pathname.startsWith("/admin/login/") ||
    pathname.startsWith("/api/auth/")
  ) {
    const hasStaleToken = SESSION_COOKIES.some((name) =>
      request.cookies.has(name)
    );
    if (hasStaleToken) {
      const response = NextResponse.next();
      for (const name of SESSION_COOKIES) {
        response.cookies.delete(name);
      }
      return response;
    }
    return NextResponse.next();
  }

  // Admin route protection — redirect to login if no session cookie present.
  // NextAuth v5 (Auth.js) uses "authjs.*" cookie names; v4 used "next-auth.*".
  // We check all variants so this works in dev, production, and Railway (HTTPS).
  if (pathname.startsWith("/admin")) {
    const sessionToken =
      request.cookies.get("authjs.session-token")?.value ??
      request.cookies.get("__Secure-authjs.session-token")?.value ??
      request.cookies.get("next-auth.session-token")?.value ??
      request.cookies.get("__Secure-next-auth.session-token")?.value;

    if (!sessionToken) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
