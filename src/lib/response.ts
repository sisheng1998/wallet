export type SuccessResponse<T = null> = {
  success: boolean;
  data: T;
};

export type ErrorResponse = {
  success: boolean;
  message: string;
};

export const getSuccessResponse = <T = null>(data?: T): SuccessResponse<T> => ({
  success: true,
  data: data ?? (null as T),
});

export const getErrorResponse = (error: any): ErrorResponse => ({
  success: false,
  message:
    error instanceof Error
      ? error.message
      : typeof error === "string"
        ? error
        : "An unknown error occurred",
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
        : "An unknown error occurred",
  );

  return url;
};
