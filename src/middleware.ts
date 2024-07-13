import { headers } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import { verifyRequestOrigin } from "lucia"

import { Paths } from "@/lib/constants"
import env from "@/lib/env"
import { getErrorResponse } from "@/lib/response"

export const middleware = async (
  request: NextRequest
): Promise<NextResponse> => {
  if (request.nextUrl.pathname.startsWith(Paths.Cron)) {
    const { API_TOKEN } = env
    const token = headers().get("Authorization")?.split("Bearer ")[1]

    if (!token || token !== API_TOKEN) {
      const response = getErrorResponse("Unauthorized")
      return NextResponse.json(response, { status: 401 })
    }

    return NextResponse.next()
  }

  if (request.method === "GET") return NextResponse.next()

  const originHeader = request.headers.get("Origin")
  const forwardedHostHeader = request.headers.get("X-Forwarded-Host")
  const hostHeader = request.headers.get("Host")

  const hostToVerify = forwardedHostHeader || hostHeader

  if (
    !originHeader ||
    !hostToVerify ||
    !verifyRequestOrigin(originHeader, [hostToVerify])
  ) {
    return NextResponse.json(getErrorResponse("Invalid origin"), {
      status: 403,
    })
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/((?!api|static|.*\\..*|_next|favicon.ico|sitemap.xml|robots.txt).*)",
    "/api/cron/:path*",
  ],
}
