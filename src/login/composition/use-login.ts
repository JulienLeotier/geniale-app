import { useLoginApi } from "@/login/composition/use-login-api";
import { IFormLoginState, IResetPasswordBody } from "@/login/models/form";
import { ILoginBody } from "@/login/models/login";
import router, { HomeRoute, Register } from "@/router";
import { useStore } from "@/store";

import { message } from "ant-design-vue";
import { computed, reactive, ref } from "vue";

export const useLogin = () => {
  const open = ref<boolean>(false);
  const openError = ref<boolean>(false);

  const showModal = () => {
    open.value = true;
  };
  const showModalError = () => {
    openError.value = true;
  };
  const formState = reactive<IFormLoginState>({
    user: {
      email: "",
      password: "",
    },
  });
  const resetPasswordFormState = reactive<IResetPasswordBody>({
    user: {
      password: "",
      confirmPassword: "",
    },
  });

  const { postLogin, askResetPassword, resetPassword } = useLoginApi();
  const { data: loginData, isFetching, fetch: CreateLogin } = postLogin();
  const {
    data: askResetPasswordData,
    fetch: AskResetPassword,
    isFetching: askResetPasswordFetching,
  } = askResetPassword();
  const {
    data: resetPasswordData,
    fetch: ResetPassword,
    isFetching: ResetPasswordFeching,
  } = resetPassword();

  const store = useStore();

  const onFinishForgetPassword = async (values: IFormLoginState) => {
    await AskResetPassword({
      body: {
        email: values.user.email,
      },
    });
    if (askResetPasswordData.value) {
      showModal();
    } else {
      showModalError();
    }
  };

  const onFinishFailedForgetPassword = (errorInfo: any) => {
    message.error(
      `Erreur lors de la connexion, mot de passe ou email incorrect! ${JSON.stringify(errorInfo)}`,
      2,
    );
  };

  const onFinishResetPassword = async (values: IResetPasswordBody) => {
    await ResetPassword({
      body: {
        token: router.currentRoute.value.query.token as string,
        new_password: values.user.password,
      },
    });
    if (resetPasswordData.value) {
      showModal();
    } else {
      showModalError();
    }
  };

  const onFinish = async (values: IFormLoginState) => {
    await CreateLogin({
      body: { ...values.user } as ILoginBody,
    });
    if (!loginData.value) {
      message.error(
        "Erreur lors de la connexion, mot de passe ou email incorrect!",
      );
    } else {
      store.setToken(loginData.value.token);
      router.push({ name: HomeRoute.name });
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    message.error(
      `Erreur lors de la connexion, mot de passe ou email incorrect! ${JSON.stringify(errorInfo)}`,
      2,
    );
  };

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const disabled = computed(() => {
    return (
      !formState.user.email ||
      !formState.user.password ||
      !validateEmail(formState.user.email)
    );
  });

  const disabledForgetPassword = computed(() => {
    return !formState.user.email || !validateEmail(formState.user.email);
  });

  const disabledResetPassword = computed(() => {
    return (
      !resetPasswordFormState.user.password ||
      !resetPasswordFormState.user.confirmPassword ||
      resetPasswordFormState.user.password !==
        resetPasswordFormState.user.confirmPassword
    );
  });

  const validateMessages = {
    required: "${label} ne doit pas être vide!",
    types: {
      email: "${label} n'est pas un email valide!",
    },
  };

  const register = async () => {
    await router.push({ name: Register.name });
  };

  return {
    formState,
    disabled,
    validateMessages,
    isFetching,
    disabledForgetPassword,
    resetPasswordFormState,
    disabledResetPassword,
    open,
    openError,
    ResetPasswordFeching,
    askResetPasswordFetching,
    showModal,
    onFinishForgetPassword,
    onFinishFailedForgetPassword,
    register,
    onFinish,
    onFinishFailed,
    onFinishResetPassword,
  };
};
