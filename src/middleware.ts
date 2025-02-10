import { NextResponse, type NextRequest } from "next/server";

const publicRouter = [
  { path: "/login", whenAutenticated: "redirect" },
] as const;
const REDIRECT_WHEN_NOT_LOGGED_IN = "/login";
const REDIRECT_WHEN_LOGGED_IN = "/";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  const publicRoute = publicRouter.find((route) => route.path === path);
  const authToken = request.cookies.get("securetoken")?.value;

  if (!authToken && publicRoute) {
    return NextResponse.next();
  }

  if (!authToken && !publicRoute && path !== "/login") {
    return NextResponse.redirect(
      new URL(REDIRECT_WHEN_NOT_LOGGED_IN, request.url)
    );
  }

  const isValid = await fetch(`${request.nextUrl.origin}/api/auth/validate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token: authToken }),
  })
    .then((res) => res.ok)
    .catch(() => false);

  if (!isValid) {
    return NextResponse.redirect(
      new URL(REDIRECT_WHEN_NOT_LOGGED_IN, request.url)
    );
  }

  if (authToken && publicRoute?.whenAutenticated === "redirect" && path === "/login") {
    return NextResponse.redirect(new URL(REDIRECT_WHEN_LOGGED_IN, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
