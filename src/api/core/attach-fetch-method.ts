import { type Body, ConfigFetch, UseFetchReturn } from "@/api/models/api/fetch";

import type { Ref } from "vue";

export const attachFetchMethod = <TReturn>(
  useFetch: UseFetchReturn<TReturn>,
  options: ConfigFetch["requestOptions"],
  serializedBody: Ref<string | Body | undefined>,
): UseFetchReturn<TReturn> => {
  switch (options?.method) {
    case "POST":
      return useFetch.post(serializedBody);
    case "PUT":
      return useFetch.put(serializedBody);
    case "PATCH":
      return useFetch.patch(serializedBody);
    case "DELETE":
      return useFetch.delete(serializedBody);
    case "GET":
    default:
      return useFetch.get();
  }
};
