export interface ILoginBody {
  email: string;
  password: string;
  remember: boolean;
}
export interface ILogin {
  message: string;
  token: string;
}

export interface IResetPassword {
  message: string;
}
export interface IResetPasswordBody {
  token: string;
  new_password: string;
}

export interface ILoginGoogle {
  email: string;
  name: string;
  provider: string;
  token: string;
}

export interface ILoginGoogleUrl {
  url: string;
}
