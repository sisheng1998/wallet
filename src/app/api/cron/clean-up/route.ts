import { NextResponse } from "next/server"

import { lucia } from "@/lib/auth"
import { deleteExpiredMagicLinks } from "@/lib/auth/magic-link"
import { deleteExpiredOTPs } from "@/lib/auth/otp"
import { getActionSuccessResponse, getErrorResponse } from "@/lib/response"

export const GET = async (): Promise<NextResponse> => {
  try {
    await lucia.deleteExpiredSessions()
    await deleteExpiredMagicLinks()
    await deleteExpiredOTPs()

    const response = getActionSuccessResponse("Done clean up")
    return NextResponse.json(response, { status: 200 })
  } catch (error) {
    const response = getErrorResponse(error)
    return NextResponse.json(response, { status: 500 })
  }
}
