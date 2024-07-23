import type { IsNever } from "@/api/utils/ts/is-never";

import type {
  UseFetchOptions,
  UseFetchReturn as VueUseFetchReturn,
} from "@vueuse/core";
import type { Ref } from "vue";

export type Body = Record<string, any>;
export type Queries = Record<string, unknown>;
export type PathParameters = Record<string, string>;

type FetchOptionBody = {
  body?: Body;
};

type FetchOptionQuery = {
  queries?: Queries;
};

type FetchOptionsPathParameters<
  TPathParameters extends PathParameters = never,
> = {
  pathParameters: TPathParameters;
};

export type FetchOptions<TPathParameters extends PathParameters = never> =
  IsNever<TPathParameters> extends IsNever<never>
    ? FetchOptionBody & FetchOptionQuery
    : FetchOptionBody &
        FetchOptionQuery &
        FetchOptionsPathParameters<TPathParameters>;

export type ConfigFetch = {
  endpoint: string;
  queries?: Queries;
  requestOptions?: Omit<RequestInit, "body" | "method"> & {
    method: "POST" | "PUT" | "PATCH" | "DELETE" | "GET";
    auth?: boolean;
    returnType?: "json" | "blob";
  };
  useFetchOptions?: Omit<UseFetchOptions, "immediate" | "refetch" | "fetch">;
};
export interface Urls {
  api: string;
}

export type UseFetchReturn<TReturn> = Omit<
  VueUseFetchReturn<TReturn>,
  "error"
> & {
  error: Ref<string | null>;
};

export type FetchApiReturn<
  TPathParameters extends PathParameters = never,
  TReturn = never,
> = {
  fetch: (options: FetchOptions<TPathParameters>) => Promise<void>;
} & Omit<UseFetchReturn<TReturn>, "execute">;
