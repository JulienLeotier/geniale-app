import type { Body } from "@/api/models/api/fetch";

import { useCloned } from "@vueuse/core";
import type { Ref } from "vue";
import { computed } from "vue";

// We need to parse body as string when it's an array
const serializeBody = (body: Body | undefined) => {
  if (Array.isArray(body)) {
    return JSON.stringify(body);
  }

  return body;
};

export const useBody = () => {
  const _defaultBody = {};
  const _body: Ref<Body> = useCloned(_defaultBody).cloned;

  const updateBody = (body?: Body) => {
    _body.value = body ?? _defaultBody;
  };

  const serializedBody = computed(() => serializeBody(_body.value));

  return {
    updateBody,
    serializedBody,
  };
};
