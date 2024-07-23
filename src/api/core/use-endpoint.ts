import type { PathParameters } from "@/api/models/api/fetch";

import type { Ref } from "vue";
import { computed, ref } from "vue";

// Catch all ${...} from the urlTemplate
const regexPathParameter = /\$\{[^}]*\}/gm;
// Remove ${...} from the PathParameters Template to extract the key of pathParameter
const extractPathParameters = (pathParametersTemplate: string) =>
  pathParametersTemplate.substring(2, pathParametersTemplate.length - 1);

const replacePathParameterKeyByPathParameterValue = (
  urlTemplate: string,
  pathParameterTemplate: string,
  pathParametersValue: string,
) => {
  let _urlTemplate = urlTemplate;
  if (pathParametersValue) {
    _urlTemplate = _urlTemplate.replace(
      pathParameterTemplate,
      pathParametersValue,
    );
  }

  return _urlTemplate;
};

const fromTemplateToValue = (
  pathParametersTemplate: string,
  pathParameters: PathParameters,
) => {
  const pathParametersKey = extractPathParameters(pathParametersTemplate);
  return pathParameters[pathParametersKey];
};

const serializedEndpoint = (
  urlTemplate: string,
  pathParametersTemplates: RegExpMatchArray[],
  pathParameters: PathParameters,
) =>
  pathParametersTemplates.reduce((acc, [pathParametersTemplate]) => {
    const pathParametersValue = fromTemplateToValue(
      pathParametersTemplate,
      pathParameters,
    );
    acc = replacePathParameterKeyByPathParameterValue(
      acc,
      pathParametersTemplate,
      pathParametersValue,
    );
    return acc;
  }, urlTemplate);

export const useEndpoint = (
  urlTemplate: string,
  baseUrl: string,
  serializedQueries: Ref<string>,
  pathParameters: Ref<PathParameters>,
) => {
  const _urlTemplate = ref(urlTemplate);

  const endpointSerialized = computed(() => {
    const pathParametersTemplates = [
      ..._urlTemplate.value.matchAll(regexPathParameter),
    ];
    return serializedEndpoint(
      _urlTemplate.value,
      pathParametersTemplates,
      pathParameters.value,
    );
  });

  const fullEndpoint = computed(
    () => `${baseUrl}${endpointSerialized.value}${serializedQueries.value}`,
  );

  return {
    fullEndpoint,
  };
};
