import { IUser } from "@/api/models/api/user";

export interface IRoom {
  id: number;
  name: string;
  description: string;
  files: string[];
  detective: IUser;
  variant: IUser;
}

export interface IRooms {
  data: IRoom[];
}

export interface IRoomResponse {
  data: IRoom;
}

export interface IFormRoom {
  name: string;
  description: string;
  files: string[];
  detective: number;
  variant: number;
}

interface File {
  id: number;
  url: string;
}

export interface Room {
  id: number;
  name: string;
  description: string;
  enigmaFiles: File[];
  revelationFiles: File[];
  introFiles: File[];
  outroFiles: File[];
  ambianceMusicFiles: File[];
  variant: IUser;
  detective: IUser;
}

export interface RoomCreateDTO {
  id?: number;
  name: string;
  description?: string;
  enigmaFiles?: File[];
  revelationFiles?: File[];
  introFiles?: File[];
  outroFiles?: File[];
  ambianceMusicFiles?: File[];
  variant: number;
  detective: number;
}

export interface RoomResponseDTO {
  id: number;
  name: string;
  description: string;
  enigmaFiles: string[];
  revelationFiles: string[];
  introFiles: string[];
  outroFiles: string[];
  ambianceMusicFiles: string[];
  variant: IUser;
  detective: IUser;
}
