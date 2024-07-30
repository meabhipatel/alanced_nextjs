import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const privateRoutes = ["/why-alanced", "/contact-us"];

export const middleware = (request: NextRequest) => {
  const cookie = request.cookies.get("token");
  const token = cookie?.value;

  if (!token && privateRoutes.includes(request.nextUrl.pathname))
    return NextResponse.redirect(new URL("/", request.url));
};

export const config = {
  matcher: privateRoutes,
};
