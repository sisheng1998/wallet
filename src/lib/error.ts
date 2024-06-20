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
        : "Unknown error",
  );

  return url;
};
