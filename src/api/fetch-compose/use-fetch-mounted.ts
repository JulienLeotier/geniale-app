import type { FetchApiReturn, PathParameters } from "@/api/models/api/fetch";

import { tryOnMounted } from "@vueuse/core";

export const useFetchMounted = <
  TPathParameters extends PathParameters = never,
  TReturn = never,
>(
  params: FetchApiReturn<TPathParameters, TReturn>,
) => {
  tryOnMounted(async () => {
    // @ts-ignore
    await params.fetch({});
  });
  return params;
};
