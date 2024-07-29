import { useFetchAbortCatch } from "@/api/fetch-composer";
import { ExtractPathParametersFromEndpoint } from "@/api/utils/ts/extract-path-parameters-from-endpoint";

import { IRoleRoomResponse, IRoleRooms } from "../models/role-room";

export const useRoleRoomApi = () => {
  const postRoleRoom = () => {
    const config = {
      endpoint: "/role_rooms",
      requestOptions: {
        method: "POST",
      },
    } as const;
    const fetchSetup = useFetchAbortCatch<
      IRoleRoomResponse,
      ExtractPathParametersFromEndpoint<typeof config.endpoint>
    >(config);
    return fetchSetup;
  };

  const updateRoleRoom = () => {
    const config = {
      endpoint: "/role_rooms/${id}",
      requestOptions: {
        method: "PATCH",
      },
    } as const;
    const fetchSetup = useFetchAbortCatch<
      IRoleRoomResponse,
      ExtractPathParametersFromEndpoint<typeof config.endpoint>
    >(config);
    return fetchSetup;
  };

  const deleteRoleRoom = () => {
    const config = {
      endpoint: "/role_rooms/${id}",
      requestOptions: {
        method: "DELETE",
      },
    } as const;
    const fetchSetup = useFetchAbortCatch<
      IRoleRoomResponse,
      ExtractPathParametersFromEndpoint<typeof config.endpoint>
    >(config);
    return fetchSetup;
  };

  const getRoomRoleByRoomIdAndUserId = () => {
    const config = {
      endpoint: "/room_roles/user/${user_id}/room/${room_id}",
      requestOptions: {
        method: "GET",
      },
    } as const;
    const fetchSetup = useFetchAbortCatch<
      IRoleRooms,
      ExtractPathParametersFromEndpoint<typeof config.endpoint>
    >(config);
    return fetchSetup;
  };

  return {
    postRoleRoom,
    updateRoleRoom,
    deleteRoleRoom,
    getRoomRoleByRoomIdAndUserId,
  };
};
