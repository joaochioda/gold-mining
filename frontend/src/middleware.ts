import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const addressValue = request.cookies.get("address")?.value;

  const isLoggedIn = addressValue !== "null" && addressValue !== undefined;

  if (!isLoggedIn) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/game/:path*"],
};
