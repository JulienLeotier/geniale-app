import { useFetchAbortCatch } from "@/api/fetch-composer";
import { ExtractPathParametersFromEndpoint } from "@/api/utils/ts/extract-path-parameters-from-endpoint";

import { IRoomResponse, IRooms, RoomCreateDTO } from "../models/room";

export const useRoomApi = () => {
  const createRoom = () => {
    const config = {
      endpoint: "/rooms",
      requestOptions: {
        method: "POST",
      },
    } as const;
    const fetchSetup = useFetchAbortCatch<
      RoomCreateDTO,
      ExtractPathParametersFromEndpoint<typeof config.endpoint>
    >(config);
    return fetchSetup;
  };
  const updateRoom = () => {
    const config = {
      endpoint: "/rooms/${id}",
      requestOptions: {
        method: "PATCH",
      },
    } as const;
    const fetchSetup = useFetchAbortCatch<
      IRoomResponse,
      ExtractPathParametersFromEndpoint<typeof config.endpoint>
    >(config);
    return fetchSetup;
  };
  const deleteRoom = () => {
    const config = {
      endpoint: "/rooms/${id}",
      requestOptions: {
        method: "DELETE",
      },
    } as const;
    const fetchSetup = useFetchAbortCatch<
      IRoomResponse,
      ExtractPathParametersFromEndpoint<typeof config.endpoint>
    >(config);
    return fetchSetup;
  };
  const getRooms = () => {
    const config = {
      endpoint: "/rooms",
      requestOptions: {
        method: "GET",
      },
    } as const;
    const fetchSetup = useFetchAbortCatch<
      IRooms,
      ExtractPathParametersFromEndpoint<typeof config.endpoint>
    >(config);
    return fetchSetup;
  };

  const getRoom = () => {
    const config = {
      endpoint: "/rooms/${id}",
      requestOptions: {
        method: "GET",
      },
    } as const;
    const fetchSetup = useFetchAbortCatch<
      IRoomResponse,
      ExtractPathParametersFromEndpoint<typeof config.endpoint>
    >(config);
    return fetchSetup;
  };

  return { createRoom, updateRoom, deleteRoom, getRooms, getRoom };
};
