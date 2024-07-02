const DEFAULT_ERROR_MESSAGE = "An unknown error occurred"

export const DEFAULT_ERROR_TITLE = "Uh oh! Something went wrong."

export type SuccessResponse<T> = {
  success: boolean
  data: T
}

export type ErrorResponse = {
  success: boolean
  message: string
}

export const getSuccessResponse = <T>(data?: T): SuccessResponse<T> => ({
  success: true,
  data: data as T,
})

export const getErrorResponse = (error: any): ErrorResponse => {
  const message = getErrorMessage(error)

  return {
    success: false,
    message,
  }
}

export const getUrlWithError = (
  baseUrl: string,
  path: string,
  error: unknown
) => {
  const url = new URL(path, baseUrl)
  const message = getErrorMessage(error)

  url.searchParams.set("error", message)

  return url
}

export type ActionResponse = {
  success: boolean
  message: string
}

export const getActionSuccessResponse = (message: string): ActionResponse => ({
  success: true,
  message,
})

export const getActionErrorResponse = (error: unknown): ActionResponse => {
  const message = getErrorMessage(error)

  return {
    success: false,
    message,
  }
}

const getErrorMessage = (error: unknown): string => {
  const errorMessage =
    error instanceof Error
      ? error.message
      : typeof error === "string"
        ? error
        : DEFAULT_ERROR_MESSAGE

  logErrorMessage(errorMessage)

  return errorMessage
}

const logErrorMessage = (message: string) => {
  if (process.env.NODE_ENV !== "development") return
  console.error("[Error]:", message)
}
