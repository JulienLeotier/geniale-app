import { IUser } from "@/api/models/api/user";

import { IRoom } from "./room";

export interface IRoleRoom {
  ID: number;
  CreatedAt: string | null;
  UpdatedAt: string | null;
  DeletedAt: string | null;
  room_id: IRoom;
  user_id: number;
  user: IUser;
  role: string;
  name: string;
  job: string;
  region: string;
  passion: string;
  anecdote: string;
}

export interface IRoleRooms {
  data: IRoleRoom[];
}

export interface IRoleRoomResponse {
  data: IRoleRoom;
}
