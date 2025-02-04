import { NextResponse, type NextRequest } from 'next/server'

const publicRouter = [
    { path: "/login", whenAutenticated: "redirect"}
] as const

const REDIRECT_WHEN_NOT_LOGGED_IN = '/login'
 
export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const response = NextResponse.next();
    const publicRoute = publicRouter.find(route => route.path === path);
    const authToken = request.cookies.get("isLogged")?.value;
    console.log(authToken)

    if (!authToken && publicRoute) {
        return NextResponse.next()
    }

    if (!authToken && !publicRoute) {
        const redirectUrl = request.nextUrl.clone();

        redirectUrl.pathname = REDIRECT_WHEN_NOT_LOGGED_IN;

        return NextResponse.redirect(redirectUrl);
    }

    if (authToken && publicRoute && publicRoute.whenAutenticated === "redirect") {
        const redirectUrl = request.nextUrl.clone();

        redirectUrl.pathname = "/";

        return NextResponse.redirect(redirectUrl);
    }

    if (authToken && !publicRoute) {
        return NextResponse.next()
    }

    if (request.nextUrl.pathname === "/logout") {
        response.cookies.set("isLogged", "", { path: "/login", expires: new Date(0) });
        return NextResponse.redirect(new URL("/login", request.url));
      }

  return NextResponse.next()
}

export const config = {
    matcher: [
      '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
  }