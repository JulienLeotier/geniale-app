import { useFetchAbortCatch } from "@/api/fetch-composer";
import { IUser } from "@/api/models/api/user";
import { ExtractPathParametersFromEndpoint } from "@/api/utils/ts/extract-path-parameters-from-endpoint";
import {
  ILogin,
  ILoginGoogle,
  ILoginGoogleUrl,
  IResetPassword,
} from "@/login/models/login";

export const useLoginApi = () => {
  const postLogin = () => {
    const config = {
      endpoint: "/users/login",
      requestOptions: {
        method: "POST",
      },
    } as const;
    const fetchSetup = useFetchAbortCatch<
      ILogin,
      ExtractPathParametersFromEndpoint<typeof config.endpoint>
    >(config);
    return fetchSetup;
  };

  const googleCallback = () => {
    const config = {
      endpoint: "/auth/google/callback",
      requestOptions: {
        method: "GET",
      },
    } as const;
    const fetchSetup = useFetchAbortCatch<
      ILoginGoogle,
      ExtractPathParametersFromEndpoint<typeof config.endpoint>
    >(config);
    return fetchSetup;
  };

  const googleUrl = () => {
    const config = {
      endpoint: "/auth/google",
      requestOptions: {
        method: "GET",
      },
    } as const;
    const fetchSetup = useFetchAbortCatch<
      ILoginGoogleUrl,
      ExtractPathParametersFromEndpoint<typeof config.endpoint>
    >(config);
    return fetchSetup;
  };

  const askResetPassword = () => {
    const config = {
      endpoint: "/users/request-password-reset",
      requestOptions: {
        method: "POST",
      },
    } as const;
    const fetchSetup = useFetchAbortCatch<
      IResetPassword,
      ExtractPathParametersFromEndpoint<typeof config.endpoint>
    >(config);
    return fetchSetup;
  };

  const resetPassword = () => {
    const config = {
      endpoint: "/users/reset-password",
      requestOptions: {
        method: "POST",
      },
    } as const;
    const fetchSetup = useFetchAbortCatch<
      IResetPassword,
      ExtractPathParametersFromEndpoint<typeof config.endpoint>
    >(config);
    return fetchSetup;
  };

  const register = () => {
    const config = {
      endpoint: "/users/register",
      requestOptions: {
        method: "POST",
      },
    } as const;
    const fetchSetup = useFetchAbortCatch<
      IUser,
      ExtractPathParametersFromEndpoint<typeof config.endpoint>
    >(config);
    return fetchSetup;
  };

  return {
    postLogin,
    googleCallback,
    googleUrl,
    askResetPassword,
    resetPassword,
    register,
  };
};
