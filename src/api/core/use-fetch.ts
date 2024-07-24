import type {
  ConfigFetch,
  FetchApiReturn,
  Urls,
  PathParameters,
} from "@/api/models/api/fetch";

import { setupUseFetch } from "./setup-use-fetch";
import { useBody } from "./use-body";
import { useEndpoint } from "./use-endpoint";
import { usePathParameters } from "./use-path-parameters";
import { useQuery } from "./use-query";

const urls = ((): Urls => {
  const urls: Urls = {
    api: import.meta.env.QUEST_API_URL ?? "http://quest.freeboxos.fr:37590",
  };
  return urls;
})();

const useFetch = <
  TPathParameters extends PathParameters = never,
  TReturn = never,
>(
  baseUrl: string,
) => {
  return (config: ConfigFetch): FetchApiReturn<TPathParameters, TReturn> => {
    const { updateQueries, serializedQueries } = useQuery(config);
    const { updatePathParameters, pathParameters } = usePathParameters();
    const { updateBody, serializedBody } = useBody();
    const { fullEndpoint } = useEndpoint(
      config.endpoint,
      baseUrl,
      serializedQueries,
      pathParameters,
    );

    const _useFetch = setupUseFetch<TReturn>(
      fullEndpoint,
      serializedBody,
      config,
    );

    const fetch: FetchApiReturn<TPathParameters, TReturn>["fetch"] = (
      fetchOptions,
    ) => {
      if (fetchOptions) {
        updateQueries(fetchOptions.queries);
        if ("pathParameters" in fetchOptions) {
          updatePathParameters(fetchOptions.pathParameters as PathParameters);
        }
        updateBody(fetchOptions.body);
      }
      return _useFetch.execute();
    };

    const { execute, ...useFetchExposed } = _useFetch;

    return {
      ...useFetchExposed,
      fetch,
    };
  };
};

export const useFetchApi = <
  TPathParameters extends PathParameters = never,
  TReturn = never,
>() => useFetch<TPathParameters, TReturn>(urls.api);
