import { AUTH_ROUTES, PUBLIC_ROUTES } from "@/constants";
import { getToken } from "next-auth/jwt";
import withAuth, { type NextRequestWithAuth } from "next-auth/middleware";
import { type NextFetchEvent, NextResponse } from "next/server";

export default async function middleware(req: NextRequestWithAuth, event: NextFetchEvent) {
  const { pathname } = req.nextUrl;

  if (AUTH_ROUTES.includes(pathname)) {
    const token = await getToken({ req, secret: process.env.AUTH_SECRET });
    if (token) {
      console.log(token);
      return NextResponse.redirect(new URL("/admin/dashboard", req.nextUrl));
    } else {
      return NextResponse.next();
    }
  }

  if (PUBLIC_ROUTES.includes(pathname)) return NextResponse.next();
  // match /plans/1, /plans/2, /plans/3, etc paths and redirect to /plans/[id]
  // console.log(pathname);
  // console.log("1", pathname.match(/^\/plans\/([a-zA-Z0-9-]+)(\?.*)?$/));
  // console.log("2", pathname.match(/^\/plans\/([a-zA-Z0-9-]+)(\?.*)?$/));
  // if (pathname.match(/^\/plans\/([a-zA-Z0-9-]+)(\?.*)?$/)) return NextResponse.next();

  // Example custom logic: Allow access only if the pathname contains "admin"
  // if (pathname.startsWith("/admin")) {
  //   const userRole = req.headers.get("x-user-role"); // Example of custom role handling
  //   if (userRole !== "admin") {
  //     return new Response("Forbidden", { status: 403 });
  //   }
  // }

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
