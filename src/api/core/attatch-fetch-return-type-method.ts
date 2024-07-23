import type { ConfigFetch, UseFetchReturn } from "@/api/models/api/fetch";

export const attachFetchReturnTypeMethod = <TReturn>(
  useFetch: UseFetchReturn<TReturn>,
  options: ConfigFetch["requestOptions"],
): UseFetchReturn<TReturn> => {
  switch (options?.returnType) {
    case "blob":
      return useFetch.blob() as unknown as UseFetchReturn<TReturn>;
    case "json":
    default:
      return useFetch.json<TReturn>();
  }
};
