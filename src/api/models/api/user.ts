import { IEntity } from "./entity";

export interface IUser {
  id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  username: string;
  email: string;
  phone: string;
  entity: IEntity[];
  is_google_user: boolean;
  email_checked: boolean;
}

export interface IUsers {
  users: IUser[];
}
