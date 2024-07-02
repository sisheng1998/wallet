import { NextRequest, NextResponse } from "next/server"
import { verifyRequestOrigin } from "lucia"

export const middleware = async (
  request: NextRequest
): Promise<NextResponse> => {
  if (request.method === "GET") {
    return NextResponse.next()
  }

  const originHeader = request.headers.get("Origin")
  const forwardedHostHeader = request.headers.get("X-Forwarded-Host")
  const hostHeader = request.headers.get("Host")

  const hostToVerify = forwardedHostHeader || hostHeader

  if (
    !originHeader ||
    !hostToVerify ||
    !verifyRequestOrigin(originHeader, [hostToVerify])
  ) {
    return new NextResponse(null, {
      status: 403,
    })
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/((?!api|static|.*\\..*|_next|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
}
