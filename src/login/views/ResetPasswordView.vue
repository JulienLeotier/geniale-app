<script lang="ts" setup>
import { useLogin } from "@/login/composition/use-login";
import router, { LoginRoute } from "@/router";
import { buttonStyle } from "@/styles/button";

import { LockOutlined, LeftOutlined } from "@ant-design/icons-vue";

const {
  resetPasswordFormState,
  onFinishResetPassword,
  validateMessages,
  disabledResetPassword,
  open,
  openError,
  ResetPasswordFeching,
} = useLogin();

const validateConfirmPassword = (_: any, value: string) => {
  if (value !== resetPasswordFormState.user.password) {
    return Promise.reject("Les mots de passe ne correspondent pas");
  }
  return Promise.resolve();
};

const backToLogin = () => {
  router.push({ name: LoginRoute.name });
};

const handleOk = (_e: MouseEvent) => {
  open.value = false;
  router.push({ name: LoginRoute.name });
};
const handleOkError = (_e: MouseEvent) => {
  openError.value = false;
};
</script>

<template>
  <a-spin :spinning="ResetPasswordFeching">
    <a-modal v-model:open="open" @ok="handleOk">
      <a-result
        status="success"
        title="Mot de passe réinitialisé avec succès"
      />
    </a-modal>
    <a-modal v-model:open="openError" @ok="handleOkError">
      <a-result
        status="error"
        title="Erreur lors de la réinitialisation du mot de passe"
      />
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
            <a-image src="./image_reset_password.png" :preview="false" />
          </a-col>
          <a-col
            :span="24"
            style="
              justify-content: center;
              display: flex;
              align-content: center;
            "
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
                <h1>Réinitialisation du mot de passe</h1>
              </a-col>
              <a-col
                :span="24"
                style="
                  justify-content: center;
                  display: flex;
                  align-content: center;
                "
              >
                <a-typography> Entrez votre nouveau mot de passe </a-typography>
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
            <a-form
              :model="resetPasswordFormState"
              name="reset_password"
              layout="vertical"
              :validate-messages="validateMessages"
              @finish="onFinishResetPassword"
              style="width: 100vw; padding: 8px"
              :disabled="ResetPasswordFeching"
            >
              <a-form-item
                label="Nom d'utilisateur"
                :name="['user', 'username']"
                style="display: none"
              >
                <a-input
                  v-model:value="resetPasswordFormState.user.password"
                  autocomplete="username"
                />
              </a-form-item>
              <a-form-item
                label="Mot de passe"
                :name="['user', 'password']"
                style="margin-left: 8px; margin-right: 8px"
                :rules="[
                  {
                    required: true,
                    message: 'Veuillez entrer votre mot de passe',
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
                  v-model:value="resetPasswordFormState.user.password"
                  autocomplete="new-password"
                  style="height: 48px"
                >
                  <template #prefix>
                    <LockOutlined class="site-form-item-icon" />
                  </template>
                </a-input-password>
              </a-form-item>
              <a-form-item
                label="Confirmer le mot de passe"
                :name="['user', 'confirmPassword']"
                :rules="[
                  {
                    required: true,
                    message: 'Veuillez confirmer votre mot de passe',
                  },
                  {
                    validator: validateConfirmPassword,
                  },
                ]"
                style="margin-left: 8px; margin-right: 8px"
              >
                <a-input-password
                  v-model:value="resetPasswordFormState.user.confirmPassword"
                  autocomplete="new-password"
                  style="height: 48px"
                >
                  <template #prefix>
                    <LockOutlined class="site-form-item-icon" />
                  </template>
                </a-input-password>
              </a-form-item>
              <a-form-item>
                <a-flex justify="center" align="center">
                  <a-button
                    :disabled="disabledResetPassword"
                    type="primary"
                    html-type="submit"
                    style="height: 56px; width: 302px"
                  >
                    Réinitialiser le mot de passe
                  </a-button>
                </a-flex>
              </a-form-item>
            </a-form>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
  </a-spin>
</template>
