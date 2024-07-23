import type { PathParameters } from "@/api/models/api/fetch";

import { useCloned } from "@vueuse/core";
import type { Ref } from "vue";
import { readonly } from "vue";

export const usePathParameters = () => {
  const _defaultPathParameters = {};
  const _pathParameters: Ref<PathParameters> = useCloned(
    _defaultPathParameters,
  ).cloned;

  const updatePathParameters = (pathParameters?: PathParameters) => {
    _pathParameters.value = pathParameters ?? _defaultPathParameters;
  };

  return {
    updatePathParameters,
    pathParameters: readonly(_pathParameters),
  };
};
