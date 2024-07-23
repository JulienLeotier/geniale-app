import { useFetchAbortCatch } from "../fetch-composer";
import { IUser } from "../models/api/user";
import { ExtractPathParametersFromEndpoint } from "../utils/ts/extract-path-parameters-from-endpoint";

export const useWhoIAm = () => {
  const config = {
    endpoint: "/whoiam",
    requestOptions: {
      method: "GET",
    },
  } as const;
  const fetchSetup = useFetchAbortCatch<
    { user: IUser },
    ExtractPathParametersFromEndpoint<typeof config.endpoint>
  >(config);
  return fetchSetup;
};
