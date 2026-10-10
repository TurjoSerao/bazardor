import { NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const session = await auth.api.getSession({
  headers: await headers(),
});

if (!session) {
  redirect("/signin");
}

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
    signInUrl.searchParams.set("callbackURL", pathname);

    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/products/:path*"],
};
