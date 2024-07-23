import type { ConfigFetch, Queries } from "@/api/models/api/fetch";
import { serializeQueries } from "@/api/utils/serialize-queries";

import { useCloned } from "@vueuse/core";
import { computed, ref } from "vue";

export const useQuery = (config: ConfigFetch) => {
  const _defaultQueries = ref(config.queries ?? {});
  const _queries = useCloned(_defaultQueries).cloned;

  const updateQueries = (queries?: Queries) => {
    _queries.value = queries ?? useCloned(_defaultQueries).cloned.value;
  };

  const serializedQueries = computed(() => {
    return serializeQueries(_queries.value);
  });

  return {
    updateQueries,
    serializedQueries,
  };
};
