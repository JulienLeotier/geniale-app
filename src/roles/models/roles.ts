export interface IRole {
  id: number;
  name: string;
  rights: IRight[];
}

export interface IRight {
  id: number;
  name: string;
}

export interface IRolesApi {
  roles: IRole[];
}

export interface IRightsApi {
  rights: IRight[];
}

export interface IRoleApi {
  role: IRole;
}
