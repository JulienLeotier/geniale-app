import { reactive } from "vue";

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

export interface IRegisterFormState {
  user: {
    email: string;
    password: string;
    confirmPassword: string;
    username: string;
  };
}
export const RegisterformState = reactive<IRegisterFormState>({
  user: {
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
  },
});
