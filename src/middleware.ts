import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const privateRoutes = ["/freelancer", "/hirer"];

export const middleware = (request: NextRequest) => {
  const cookie = request.cookies.get("token");
  const token = cookie?.value;

  if (privateRoutes.includes(request.nextUrl.pathname)) {
    if (!token) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
  return NextResponse.next();
};

export const config = {
  matcher: privateRoutes,
};
