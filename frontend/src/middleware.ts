import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const isLoggedIn = request.cookies.get("isLoggedIn")?.value === "true";

  if (!isLoggedIn) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/game/:path*"],
};
