<script setup lang="ts">
import { useWhoIAm } from "@/api/common-api/use-whoiam";
import { IUser } from "@/api/models/api/user";
import { useUser } from "@/parameter/compositions/use-user";
import { IFormState, formState } from "@/parameter/models/formInput";
import router, { CheckCodeRoute, LoginRoute } from "@/router";
import { useStore } from "@/store";
import { buttonStyle } from "@/styles/button";

import {
  UserOutlined,
  PhoneOutlined,
  LeftOutlined,
} from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import { Ref, computed, onBeforeMount, ref } from "vue";

const { updateUserById } = useUser();
const { data: whoI, fetch: whoIAm } = useWhoIAm();

const { data: userData, isFetching, fetch: UpdateUser } = updateUserById();

const validateMessages = {
  required: "${label} ne doit pas être vide!",
  types: {
    email: "${label} n'est pas un email valide!",
  },
};

const onFinish = async (values: IFormState) => {
  await UpdateUser({
    pathParameters: {
      id: user.value.id.toString(),
    },
    body: {
      email: values.user.email,
      username: values.user.username,
      phone: values.user.phone,
    },
  });
  if (userData.value) {
    message.success("Utilisateur modifié avec succès");
    await whoIAm({});
    if (whoI.value) {
      store.setUser(whoI.value.user);
      if (whoI.value.user.is_google_user)
        message.success("Utilisateur modifié avec succès");
      else {
        if (user.value.email !== whoI.value.user.email) {
          user.value = whoI.value.user;
          router.push({ name: CheckCodeRoute.name });
        }
      }
    } else {
      message.error("Erreur lors de la récupération de l'utilisateur");
      router.push({ name: LoginRoute.name });
    }
  } else {
    message.error("Erreur lors de la modification de l'utilisateur");
  }
};

const store = useStore();
const user: Ref<IUser> = ref(store.user);

const validateEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const disabled = computed(() => {
  return (
    !formState.user.email ||
    !formState.user.username ||
    !validateEmail(formState.user.email)
  );
});
onBeforeMount(() => {
  formState.user = {
    email: user.value.email,
    username: user.value.username,
    phone: user.value.phone,
    currentPassword: "",
    password: "",
    confirmPassword: "",
  };
});
const onBack = () => {
  router.go(-1);
};
</script>
<template>
  <a-spin :spinning="isFetching">
    <a-button @click="onBack()" :style="buttonStyle">
      <template #icon> <LeftOutlined /> </template>
    </a-button>
    <a-row justify="center" align="center">
      <a-col
        :span="24"
        style="justify-content: center; display: flex; align-content: center"
      >
        <a-row justify="center" align="center">
          <a-col
            :span="24"
            style="
              justify-content: center;
              display: flex;
              align-content: center;
              margin-bottom: 16px;
            "
          >
            <a-avatar :size="200" src="./profile.png"> </a-avatar>
          </a-col>
        </a-row>
      </a-col>
      <a-col
        :span="24"
        style="
          justify-content: center;
          display: flex;
          align-content: center;
          width: 100vw;
        "
      >
        <a-card style="width: 90vw; background-color: #247687; color: white">
          <a-row justify="center" align="center">
            <a-col
              :span="24"
              style="
                justify-content: center;
                display: flex;
                align-content: center;
                color: white;
              "
            >
              <h1>Mon profile</h1>
            </a-col>
            <a-col
              :span="24"
              style="
                justify-content: center;
                display: flex;
                align-content: center;
              "
            >
              <a-typography style="color: white"
                >Modification du profile</a-typography
              >
            </a-col>
          </a-row>
          <a-form
            :model="formState"
            name="normal_login"
            class="login-form"
            layout="vertical"
            :validate-messages="validateMessages"
            @finish="onFinish"
            style="width: 80vw; padding: 8px"
          >
            <a-form-item
              label="Email"
              :name="['user', 'email']"
              style="margin-left: 8px; margin-right: 8px"
              :rules="[
                {
                  type: 'email',
                  required: true,
                },
              ]"
            >
              <a-input
                v-model:value="formState.user.email"
                autocomplete="current-email"
                :disabled="user.is_google_user"
                placeholder="Email"
                style="height: 48px"
              >
                <template #prefix>
                  <UserOutlined class="site-form-item-icon" />
                </template>
              </a-input>
            </a-form-item>
            <a-form-item
              label="Username"
              :name="['user', 'username']"
              style="margin-left: 8px; margin-right: 8px"
              :rules="[
                {
                  required: true,
                  message: 'Veuillez entrer votre nom d\'utilisateur',
                },
              ]"
            >
              <a-input
                v-model:value="formState.user.username"
                autocomplete="username"
                style="height: 48px"
                placeholder="Nom d'utilisateur"
              >
                <template #prefix>
                  <UserOutlined class="site-form-item-icon" />
                </template>
              </a-input>
            </a-form-item>
            <a-form-item
              label="Téléphone"
              :name="['user', 'phone']"
              style="margin-left: 8px; margin-right: 8px"
            >
              <a-input
                v-model:value="formState.user.phone"
                autocomplete="Téléphone"
                placeholder="Téléphone"
                style="height: 48px"
              >
                <template #prefix>
                  <PhoneOutlined class="site-form-item-icon" />
                </template>
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-flex justify="center" align="center">
                <a-button
                  :disabled="disabled"
                  type="primary"
                  html-type="submit"
                  style="height: 56px; width: 302px"
                >
                  Enregister
                </a-button>
              </a-flex>
            </a-form-item>
          </a-form>
        </a-card>
      </a-col>
    </a-row>
  </a-spin>
</template>
<style scoped>
:deep(.ant-card .ant-card-body) {
  padding: 0;
  padding-left: 15px;
}
:deep(.ant-form-item .ant-form-item-label > label) {
  color: white;
}
</style>
