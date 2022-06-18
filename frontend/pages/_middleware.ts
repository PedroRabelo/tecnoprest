import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  const cookies = req.cookies["tecnoprest.token"];
  const { pathname } = req.nextUrl;

  const url = req.nextUrl.clone();

  const tenantPath = pathname.startsWith("/app");
  const adminPath = pathname.startsWith("/admin");

  if (adminPath || tenantPath) {
    if (!cookies) {
      return NextResponse.rewrite(`${process.env.NEXTAUTH_URL}/login`);
    }
  }

  return NextResponse.rewrite(url);
}
