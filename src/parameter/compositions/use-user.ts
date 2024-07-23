import { useFetchAbortCatch } from "@/api/fetch-composer";
import { IUser } from "@/api/models/api/user";
import { ExtractPathParametersFromEndpoint } from "@/api/utils/ts/extract-path-parameters-from-endpoint";

export const useUser = () => {
  const getUserById = () => {
    const config = {
      endpoint: "/users/${id}",
      requestOptions: {
        method: "GET",
      },
    } as const;
    const fetchSetup = useFetchAbortCatch<
      IUser,
      ExtractPathParametersFromEndpoint<typeof config.endpoint>
    >(config);
    return fetchSetup;
  };

  const updateUserById = () => {
    const config = {
      endpoint: "/users/${id}",
      requestOptions: {
        method: "PUT",
      },
    } as const;
    const fetchSetup = useFetchAbortCatch<
      IUser,
      ExtractPathParametersFromEndpoint<typeof config.endpoint>
    >(config);
    return fetchSetup;
  };

  const changePassword = () => {
    const config = {
      endpoint: "/users/${id}/change-password",
      requestOptions: {
        method: "PUT",
      },
    } as const;
    const fetchSetup = useFetchAbortCatch<
      IUser,
      ExtractPathParametersFromEndpoint<typeof config.endpoint>
    >(config);
    return fetchSetup;
  };

  const sendEmail = () => {
    const config = {
      endpoint: "/users/${id}/send-email",
      requestOptions: {
        method: "GET",
      },
    } as const;
    const fetchSetup = useFetchAbortCatch<
      IUser,
      ExtractPathParametersFromEndpoint<typeof config.endpoint>
    >(config);
    return fetchSetup;
  };
  const checkCode = () => {
    const config = {
      endpoint: "/users/${id}/check-code",
      requestOptions: {
        method: "GET",
      },
    } as const;
    const fetchSetup = useFetchAbortCatch<
      IUser,
      ExtractPathParametersFromEndpoint<typeof config.endpoint>
    >(config);
    return fetchSetup;
  };
  return { getUserById, updateUserById, changePassword, sendEmail, checkCode };
};
