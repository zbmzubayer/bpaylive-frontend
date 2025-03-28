import { AUTH_ROUTES, PUBLIC_ROUTES, ADMIN_ROUTES } from "@/constants";
import { USER_ROLE } from "@/types";
import { getToken } from "next-auth/jwt";
import withAuth, { type NextRequestWithAuth } from "next-auth/middleware";
import { type NextFetchEvent, NextResponse } from "next/server";

export default async function middleware(req: NextRequestWithAuth, event: NextFetchEvent) {
  const { pathname } = req.nextUrl;

  if (AUTH_ROUTES.includes(pathname)) {
    const token = await getToken({ req, secret: process.env.AUTH_SECRET });
    if (token) {
      return NextResponse.redirect(new URL("/admin/dashboard", req.nextUrl));
    } else {
      return NextResponse.next();
    }
  } else if (ADMIN_ROUTES.includes(pathname)) {
    const token = await getToken({ req, secret: process.env.AUTH_SECRET });
    if (token && token.role === USER_ROLE.SUB_ADMIN) {
      return NextResponse.redirect(new URL("/admin/dashboard", req.nextUrl));
    }
  }
  if (PUBLIC_ROUTES.includes(pathname)) return NextResponse.next();

  // if pathname starts expect /admin and not in AUTH_ROUTES
  if (!pathname.startsWith("/admin")) return NextResponse.next();

  // Continue with the NextAuth middleware
  return withAuth({ secret: process.env.AUTH_SECRET })(req, event);
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
