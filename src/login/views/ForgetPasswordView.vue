<script lang="ts" setup>
import { useLogin } from "@/login/composition/use-login";
import router, { LoginRoute } from "@/router";
import { buttonStyle } from "@/styles/button";

import { LeftOutlined } from "@ant-design/icons-vue";
import { UserOutlined } from "@ant-design/icons-vue";

const {
  formState,
  onFinishForgetPassword,
  onFinishFailedForgetPassword,
  validateMessages,
  disabledForgetPassword,
  askResetPasswordFetching,
  open,
  openError,
} = useLogin();
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
  <a-spin :spinning="askResetPasswordFetching">
    <a-modal v-model:open="open" @ok="handleOk">
      <a-result
        status="success"
        title="Un email vous à été envoyé afin de réinitialiser votre mot de passe"
      />
    </a-modal>
    <a-modal v-model:open="openError" @ok="handleOkError">
      <a-result status="error" title="Erreur lors de l'envoie du mail" />
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
              src="./image_forget_password.png"
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
            "
          >
          </a-col>
          <a-col
            :span="24"
            style="
              justify-content: center;
              display: flex;
              align-content: center;
              width: 90vw;
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
                    color: white;
                  "
                >
                  <h1>Mot de passe oublié</h1>
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
                    Entrez votre email pour réinitialiser votre mot de passe
                  </a-typography>
                </a-col>
              </a-row>
              <a-form
                :model="formState"
                name="normal_login"
                layout="vertical"
                :validate-messages="validateMessages"
                @finish="onFinishForgetPassword"
                @finishFailed="onFinishFailedForgetPassword"
                style="width: 80vw; padding: 8px"
                :disabled="askResetPasswordFetching"
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
                    v-model:value="formState.user.email"
                    autocomplete="current-email"
                    style="height: 48px"
                    placeholder="Email"
                  >
                    <template #prefix>
                      <UserOutlined class="site-form-item-icon" />
                    </template>
                  </a-input>
                </a-form-item>

                <a-form-item>
                  <a-flex justify="center" align="center">
                    <a-button
                      :disabled="disabledForgetPassword"
                      type="primary"
                      html-type="submit"
                      style="height: 56px; width: 302px"
                    >
                      Envoyer un email de réinitialisation
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
