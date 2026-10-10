import { NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export function proxy(request) {
  const { pathname } = request.nextUrl;

  const isProtectedRoute =
    pathname.startsWith("/profile") || /^\/products\/[^/]+\/?$/.test(pathname);

  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  const sessionCookie = getSessionCookie(request);

  if (!sessionCookie) {
    const signInUrl = new URL("/signin", request.url);
    signInUrl.searchParams.set(
      "callbackURL",
      `${pathname}${request.nextUrl.search}`,
    );

    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/products/:path*"],
};
