<script lang="ts" setup>
import router, { LoginRoute } from "@/router";
import { buttonStyle } from "@/styles/button";

import { useRegister } from "../composition/use-register";
import { RegisterformState } from "../models/form";

import {
  LeftOutlined,
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons-vue";

const {
  open,
  openError,
  validateMessages,
  onFinishRegister,
  validateConfirmPassword,
  disabledRegister,
} = useRegister();
const backToLogin = async () => {
  await router.push({ name: LoginRoute.name });
};
const handleOk = async (_e: MouseEvent) => {
  open.value = false;
  await router.push({ name: LoginRoute.name });
};
const handleOkError = (_e: MouseEvent) => {
  openError.value = false;
};
</script>
<template>
  <a-spin :spinning="false">
    <a-modal v-model:open="open" @ok="handleOk">
      <a-result status="success" title="Le compte a été créé avec succès" />
    </a-modal>
    <a-modal v-model:open="openError" @ok="handleOkError">
      <a-result status="error" title="Erreur lors de la création du compte" />
    </a-modal>
    <a-button @click="backToLogin" :style="buttonStyle">
      <template #icon> <LeftOutlined /> </template>
    </a-button>
    <a-row justify="center" align="center">
      <a-col>
        <a-row :gutter="[16, 16]" style="width: 100vw">
          <a-col
            :span="24"
            style="
              justify-content: center;
              display: flex;
              align-content: center;
            "
          >
            <a-image
              src="./image_register.png"
              :preview="false"
              style="max-width: 500px; max-height: 200px; border-radius: 50%"
            />
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
            <a-card
              style="width: 90vw; background-color: #247687; color: white"
            >
              <a-row justify="center" align="center">
                <a-col
                  :span="24"
                  style="
                    justify-content: center;
                    display: flex;
                    align-content: center;
                  "
                >
                  <h1>Enregistrement du compte</h1>
                </a-col>
                <a-col
                  :span="24"
                  style="
                    justify-content: center;
                    display: flex;
                    align-content: center;
                  "
                >
                  <a-typography style="color: white">
                    Entrez un email, un nom d'utilisateur et un mot de passe
                    pour créer un compte
                  </a-typography>
                </a-col>
              </a-row>
              <a-form
                :model="RegisterformState"
                name="normal_login"
                layout="vertical"
                :validate-messages="validateMessages"
                @finish="onFinishRegister"
                style="width: 80vw; padding: 8px"
              >
                <a-form-item
                  label="Email"
                  :name="['user', 'email']"
                  :rules="[
                    {
                      type: 'email',
                      required: true,
                    },
                  ]"
                  style="margin-left: 8px; margin-right: 8px"
                >
                  <a-input
                    v-model:value="RegisterformState.user.email"
                    autocomplete="current-email"
                    style="height: 48px"
                    placeholder="Email"
                  >
                    <template #prefix>
                      <UserOutlined class="site-form-item-icon" />
                    </template>
                  </a-input>
                </a-form-item>
                <a-form-item
                  label="Nom d'utilisateur"
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
                    v-model:value="RegisterformState.user.username"
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
                  label="Mot de passe"
                  :name="['user', 'password']"
                  style="margin-left: 8px; margin-right: 8px"
                  :rules="[
                    {
                      required: true,
                      message: 'Veuillez entrer votre nouveau mot de passe',
                    },
                    {
                      min: 6,
                      message:
                        'Le mot de passe doit contenir au moins 6 caractères',
                    },
                    {
                      pattern: /[a-zA-Z]/,
                      message:
                        'Le mot de passe doit contenir au moins une lettre',
                    },
                    {
                      pattern: /\d/,
                      message:
                        'Le mot de passe doit contenir au moins un chiffre',
                    },
                  ]"
                >
                  <a-input-password
                    v-model:value="RegisterformState.user.password"
                    autocomplete="current-password"
                    style="height: 48px"
                    placeholder="Mot de passe"
                  >
                    <template #prefix>
                      <LockOutlined class="site-form-item-icon" />
                    </template>
                  </a-input-password>
                </a-form-item>
                <a-form-item
                  label="Confirmer le mot de passe"
                  :name="['user', 'confirmPassword']"
                  style="margin-left: 8px; margin-right: 8px"
                  :rules="[
                    {
                      required: true,
                      message: 'Veuillez entrer votre nouveau mot de passe',
                    },
                    {
                      validator: validateConfirmPassword,
                    },
                  ]"
                >
                  <a-input-password
                    v-model:value="RegisterformState.user.confirmPassword"
                    autocomplete="new-password"
                    style="height: 48px"
                    placeholder="Confirmer le mot de passe"
                  >
                    <template #prefix>
                      <LockOutlined class="site-form-item-icon" />
                    </template>
                  </a-input-password>
                </a-form-item>
                <a-form-item>
                  <a-flex justify="center" align="center">
                    <a-button
                      :disabled="disabledRegister"
                      type="primary"
                      html-type="submit"
                      style="height: 56px; width: 302px"
                    >
                      Rejoindre l'agence
                    </a-button>
                  </a-flex>
                </a-form-item>
              </a-form>
            </a-card>
          </a-col>
        </a-row>
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
