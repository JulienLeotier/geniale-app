import { useFetchApi } from "@/api/core/use-fetch";
import type { ConfigFetch, PathParameters } from "@/api/models/api/fetch";

import { useAbortUnmount } from "../fetch-compose/use-abort-unmount";
import { useFetchMounted } from "../fetch-compose/use-fetch-mounted";
import { useRedirect } from "../fetch-compose/use-redirect";

export const useFetchAbortCatchAndCall = <
  TReturn = unknown,
  TPathParameters extends PathParameters = never,
>(
  config: ConfigFetch,
) => {
  return useRedirect(
    useAbortUnmount(
      useFetchMounted(useFetchApi<TPathParameters, TReturn>()(config)),
    ),
  );
};

export const useFetchAbortCatch = <
  TReturn = unknown,
  TPathParameters extends PathParameters = never,
>(
  config: ConfigFetch,
) => {
  return useRedirect(
    useAbortUnmount(useFetchApi<TPathParameters, TReturn>()(config)),
  );
};

export const useFetchRedirect = <
  TReturn = unknown,
  TPathParameters extends PathParameters = never,
>(
  config: ConfigFetch,
) => {
  return useRedirect(useFetchApi<TPathParameters, TReturn>()(config));
};
