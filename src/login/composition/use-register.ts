import { RegisterformState } from "../models/form";
import { useLoginApi } from "./use-login-api";

import { computed, ref } from "vue";

export const useRegister = () => {
  const { register } = useLoginApi();
  const {
    fetch: registerFetch,
    isFetching: isFetchingRegister,
    data: user,
  } = register();
  const open = ref<boolean>(false);
  const openError = ref<boolean>(false);

  const onFinishRegister = async () => {
    await registerFetch({
      body: RegisterformState.user,
    });
    if (user.value) {
      open.value = true;
    } else {
      openError.value = true;
    }
  };

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateConfirmPassword = (_: any, value: string) => {
    if (value !== RegisterformState.user.password) {
      return Promise.reject("Les mots de passe ne correspondent pas");
    }
    return Promise.resolve();
  };

  const disabledRegister = computed(() => {
    return (
      !RegisterformState.user.email ||
      !validateEmail(RegisterformState.user.email) ||
      !RegisterformState.user.username ||
      !RegisterformState.user.password ||
      !RegisterformState.user.confirmPassword ||
      RegisterformState.user.password !== RegisterformState.user.confirmPassword
    );
  });

  const validateMessages = {
    required: "${label} ne doit pas être vide!",
    types: {
      email: "${label} n'est pas un email valide!",
    },
  };

  return {
    onFinishRegister,
    open,
    openError,
    validateEmail,
    validateConfirmPassword,
    validateMessages,
    disabledRegister,
    isFetchingRegister,
  };
};
