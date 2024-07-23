import type { Queries } from "@/api/models/api/fetch";
import { parseObjectValueToString } from "@/api/utils/parse-object-value-to-string";

export const serializeQueries = (queryObject: Queries) => {
  if (!Object.keys(queryObject).length) {
    return "";
  }
  const queryObjectParsed = parseObjectValueToString(queryObject);
  return "?" + new URLSearchParams(queryObjectParsed).toString();
};
