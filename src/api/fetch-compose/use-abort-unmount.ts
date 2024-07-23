import type { FetchApiReturn, PathParameters } from "@/api/models/api/fetch";

import { tryOnUnmounted } from "@vueuse/core";

export const useAbortUnmount = <
  TPathParameters extends PathParameters = never,
  TReturn = never,
>(
  params: FetchApiReturn<TPathParameters, TReturn>,
) => {
  tryOnUnmounted(() => {
    params.abort();
  });
  return params;
};
