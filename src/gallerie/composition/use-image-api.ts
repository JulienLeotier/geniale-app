import { useFetchAbortCatch } from "@/api/fetch-composer";
import { ExtractPathParametersFromEndpoint } from "@/api/utils/ts/extract-path-parameters-from-endpoint";

import { IImageResponse, IImagesResponse, IResponse } from "../models/image";

export const useImageApi = () => {
  const postImage = () => {
    const config = {
      endpoint: "/images",
      requestOptions: {
        method: "POST",
      },
    } as const;
    const fetchSetup = useFetchAbortCatch<
      IImageResponse,
      ExtractPathParametersFromEndpoint<typeof config.endpoint>
    >(config);
    return fetchSetup;
  };

  const getImages = () => {
    const config = {
      endpoint: "/images",
      requestOptions: {
        method: "GET",
      },
    } as const;
    const fetchSetup = useFetchAbortCatch<
      IImagesResponse,
      ExtractPathParametersFromEndpoint<typeof config.endpoint>
    >(config);
    return fetchSetup;
  };

  const getImage = () => {
    const config = {
      endpoint: "/images/${id}",
      requestOptions: {
        method: "GET",
      },
    } as const;
    const fetchSetup = useFetchAbortCatch<
      IImageResponse,
      ExtractPathParametersFromEndpoint<typeof config.endpoint>
    >(config);
    return fetchSetup;
  };

  const deleteImage = () => {
    const config = {
      endpoint: "/images/${id}",
      requestOptions: {
        method: "DELETE",
      },
    } as const;
    const fetchSetup = useFetchAbortCatch<
      IResponse,
      ExtractPathParametersFromEndpoint<typeof config.endpoint>
    >(config);
    return fetchSetup;
  };
  return { postImage, getImages, getImage, deleteImage };
};
