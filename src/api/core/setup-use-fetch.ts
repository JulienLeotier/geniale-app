import type { Body, ConfigFetch } from "@/api/models/api/fetch";

import { attachFetchMethod } from "./attach-fetch-method";
import { attachFetchReturnTypeMethod } from "./attatch-fetch-return-type-method";

import { useFetch as vueUseFetch } from "@vueuse/core";
import type { Ref } from "vue";

export const setupUseFetch = <TReturn>(
  fullEndpoint: Ref<string>,
  serializedBody: Ref<string | Body | undefined>,
  config: ConfigFetch,
) => {
  const { requestOptions, useFetchOptions } = config;
  const _useFetch = vueUseFetch<TReturn>(
    fullEndpoint,
    {
      ...requestOptions,
    },
    {
      ...useFetchOptions,
      async beforeFetch(ctx) {
        const isNeedAuth = requestOptions?.auth ?? true;
        if (isNeedAuth) {
          ctx.options.headers = {
            ...ctx.options.headers,
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          };
        }
        ctx.options.credentials = "include";
        return ctx;
      },
      immediate: false,
      refetch: false,
    },
  );

  return attachFetchMethod(
    attachFetchReturnTypeMethod(_useFetch, config.requestOptions),
    config.requestOptions,
    serializedBody,
  );
};
