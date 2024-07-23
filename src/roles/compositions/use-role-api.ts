import { useFetchAbortCatch } from "@/api/fetch-composer";
import { ExtractPathParametersFromEndpoint } from "@/api/utils/ts/extract-path-parameters-from-endpoint";

import {
  IRight,
  IRightsApi,
  IRole,
  IRoleApi,
  IRolesApi,
} from "../models/roles";

export const useRoleApi = () => {
  const getRole = () => {
    const config = {
      endpoint: "/roles/${id}",
      requestOptions: {
        method: "GET",
      },
    } as const;
    const fetchSetup = useFetchAbortCatch<
      IRoleApi,
      ExtractPathParametersFromEndpoint<typeof config.endpoint>
    >(config);
    return fetchSetup;
  };

  const getRoles = () => {
    const config = {
      endpoint: "/roles",
      requestOptions: {
        method: "GET",
      },
    } as const;
    const fetchSetup = useFetchAbortCatch<
      IRolesApi,
      ExtractPathParametersFromEndpoint<typeof config.endpoint>
    >(config);
    return fetchSetup;
  };
  const createRole = () => {
    const config = {
      endpoint: "/roles",
      requestOptions: {
        method: "POST",
      },
    } as const;
    const fetchSetup = useFetchAbortCatch<
      IRole,
      ExtractPathParametersFromEndpoint<typeof config.endpoint>
    >(config);
    return fetchSetup;
  };
  const updateRole = () => {
    const config = {
      endpoint: "/roles/${id}",
      requestOptions: {
        method: "PUT",
      },
    } as const;
    const fetchSetup = useFetchAbortCatch<
      IRole,
      ExtractPathParametersFromEndpoint<typeof config.endpoint>
    >(config);
    return fetchSetup;
  };

  const deleteRole = () => {
    const config = {
      endpoint: "/roles/${id}",
      requestOptions: {
        method: "DELETE",
      },
    } as const;
    const fetchSetup = useFetchAbortCatch<
      IRole,
      ExtractPathParametersFromEndpoint<typeof config.endpoint>
    >(config);
    return fetchSetup;
  };

  const createRights = () => {
    const config = {
      endpoint: "/rights",
      requestOptions: {
        method: "POST",
      },
    } as const;
    const fetchSetup = useFetchAbortCatch<
      IRight,
      ExtractPathParametersFromEndpoint<typeof config.endpoint>
    >(config);
    return fetchSetup;
  };

  const deleteRights = () => {
    const config = {
      endpoint: "/rights/${id}",
      requestOptions: {
        method: "DELETE",
      },
    } as const;
    const fetchSetup = useFetchAbortCatch<
      IRight,
      ExtractPathParametersFromEndpoint<typeof config.endpoint>
    >(config);
    return fetchSetup;
  };

  const getRights = () => {
    const config = {
      endpoint: "/rights",
      requestOptions: {
        method: "GET",
      },
    } as const;
    const fetchSetup = useFetchAbortCatch<
      IRightsApi,
      ExtractPathParametersFromEndpoint<typeof config.endpoint>
    >(config);
    return fetchSetup;
  };

  return {
    getRole,
    getRoles,
    createRole,
    updateRole,
    deleteRole,
    createRights,
    deleteRights,
    getRights,
  };
};
