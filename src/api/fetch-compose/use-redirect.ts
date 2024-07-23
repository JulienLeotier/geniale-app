import type { FetchApiReturn, PathParameters } from "@/api/models/api/fetch";

import { watch } from "vue";

export const useRedirect = <
  TPathParameters extends PathParameters = never,
  TReturn = never,
>(
  params: FetchApiReturn<TPathParameters, TReturn>,
) => {
  watch([params.statusCode, params.error], async ([statusCode, error]) => {
    if (error || (statusCode && statusCode !== 200)) {
      switch (statusCode) {
        case 401: {
          // Unauthorized
          console.error("You are not unauthorized", 2);
          break;
        } // Unauthorized
        case 409: // Conflict
          console.error("Conflict", 2);
          break;
        case 400: // Bad Request
          console.error("Bad request", 2);
          break;
        case 403: {
          // Forbidden
          console.error("You don't have the permission to do this", 2);
          break;
        }
        case 429: // Too Many Requests
          console.error("Too many request", 2);
          break;
        case 405: // Method not allowed
          console.error("Method not allowed", 2);
          break;
        case 500: // Internal Server Error
          console.error(`Server Error (code: ${statusCode})`, 2);
          break;
      }
    }
  });
  return params;
};
