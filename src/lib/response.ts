export type SuccessResponse<T> = {
  status: "success";
  status_code: number;
  data: T;
};

export type ErrorResponse = {
  status: "error";
  status_code: number;
  message: string;
};

export const getSuccessResponse = <T>(
  data: T,
  status_code: number,
): SuccessResponse<T> => ({
  status: "success",
  status_code,
  data,
});

export const getErrorResponse = (
  error: any,
  status_code: number,
): ErrorResponse => ({
  status: "error",
  status_code,
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
