import type {
  FetchApiReturn,
  FetchOptions,
  PathParameters,
  UseFetchReturn,
} from "@/api/models/api/fetch";

import pLimit from "p-limit";
import type { Ref } from "vue";
import { ref } from "vue";

/**
 * Allow to use the same useFetch function with promise all. Doesn't work if the useFetch is attached to a vuejs lifecycle.
 */
export const usePromiseAll = <
  TReturn = unknown,
  TPathParameters extends PathParameters = never,
>(
  fetchSetup: (params?: unknown) => FetchApiReturn<TPathParameters, TReturn>,
  params?: unknown,
) => {
  const result: Ref<UseFetchReturn<TReturn>["data"][]> = ref([]);
  const errors: Ref<UseFetchReturn<TReturn>["error"][]> = ref([]);
  const aborts: Ref<UseFetchReturn<TReturn>["abort"][]> = ref([]);
  const isFetching = ref(false);

  const limit = pLimit(Infinity);

  const fetchAll = async (optionsList: FetchOptions<TPathParameters>[]) => {
    const fetchList: Promise<void>[] = [];
    result.value = [];
    errors.value = [];
    aborts.value = [];

    optionsList.forEach((options) => {
      const { fetch, data, error, abort } = fetchSetup(params);
      fetchList.push(limit(() => fetch(options)));
      result.value.push(data);
      errors.value.push(error);
      aborts.value.push(abort);
    });
    isFetching.value = true;
    await Promise.allSettled(fetchList);
    isFetching.value = false;
  };

  const abortAll = () => {
    aborts.value.forEach((abort) => abort());
    isFetching.value = false;
  };

  return {
    result,
    errors,
    isFetching,
    fetchAll,
    abortAll,
  };
};
