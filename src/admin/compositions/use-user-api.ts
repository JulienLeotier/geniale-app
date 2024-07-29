import { useFetchAbortCatch } from "@/api/fetch-composer";
import { IUsers } from "@/api/models/api/user";
import { ExtractPathParametersFromEndpoint } from "@/api/utils/ts/extract-path-parameters-from-endpoint";

export const useUserApi = () => {
  const getAllUsers = () => {
    const config = {
      endpoint: "/users",
      requestOptions: {
        method: "GET",
      },
    } as const;
    const fetchSetup = useFetchAbortCatch<
      IUsers,
      ExtractPathParametersFromEndpoint<typeof config.endpoint>
    >(config);
    return fetchSetup;
  };
  return { getAllUsers };
};
