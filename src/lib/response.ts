const DEFAULT_ERROR_MESSAGE = "An unknown error occurred";

export const DEFAULT_ERROR_TITLE = "Uh oh! Something went wrong.";

export type SuccessResponse<T> = {
  success: boolean;
  data: T;
};

export type ErrorResponse = {
  success: boolean;
  message: string;
};

export const getSuccessResponse = <T>(data?: T): SuccessResponse<T> => ({
  success: true,
  data: data as T,
});

export const getErrorResponse = (error: any): ErrorResponse => ({
  success: false,
  message:
    error instanceof Error
      ? error.message
      : typeof error === "string"
        ? error
        : DEFAULT_ERROR_MESSAGE,
});

export const getUrlWithError = (
  baseUrl: string,
  path: string,
  error: unknown,
) => {
  const url = new URL(path, baseUrl);

  url.searchParams.set(
    "error",
    error instanceof Error
      ? error.message
      : typeof error === "string"
        ? error
        : DEFAULT_ERROR_MESSAGE,
  );

  return url;
};

export type ActionResponse = {
  success: boolean;
  message: string;
};

export const getActionSuccessResponse = (message: string): ActionResponse => ({
  success: true,
  message,
});

export const getActionErrorResponse = (error: unknown): ActionResponse => ({
  success: false,
  message:
    error instanceof Error
      ? error.message
      : typeof error === "string"
        ? error
        : DEFAULT_ERROR_MESSAGE,
});
