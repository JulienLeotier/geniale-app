export interface IFormLoginState {
  user: {
    email: string;
    password: string;
  };
}

export interface IResetPasswordBody {
  user: {
    password: string;
    confirmPassword: string;
  };
}
