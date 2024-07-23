import { reactive } from "vue";

export interface IFormState {
  user: {
    email: string;
    password: string;
    currentPassword: string;
    confirmPassword: string;
    username: string;
    phone: string;
  };
}
export const formState = reactive<IFormState>({
  user: {
    email: "",
    currentPassword: "",
    password: "",
    confirmPassword: "",
    username: "",
    phone: "",
  },
});
