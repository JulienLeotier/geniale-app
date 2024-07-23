<script lang="ts" setup>
import { useLogin } from "@/login/composition/use-login";
import router, { ForgetPassword } from "@/router";

const {
  formState,
  onFinish,
  onFinishFailed,
  googleAuth,
  validateMessages,
  disabled,
  isFetching,
} = useLogin();
const redirectForgetPassword = () => {
  router.push({ name: ForgetPassword.name });
};
</script>
<template>
  <a-spin :spinning="isFetching">
    <a-row justify="center" align="center" wrap="wrap" style="height: 100vh">
      <a-col
        :span="24"
        style="
          justify-content: center;
          display: flex;
          flex-wrap: wrap;
          align-content: center;
        "
      >
        <a-col
          :span="24"
          style="
            justify-content: center;
            display: flex;
            flex-wrap: wrap;
            align-content: center;
          "
        >
          <a-image
            src="./logo.webp"
            :preview="false"
            style="border-radius: 50%; width: 150px; height: 150px; margin: 8px"
          />
        </a-col>
        <a-row justify="center" align="center" wrap="wrap">
          <a-col
            :span="24"
            style="
              justify-content: center;
              display: flex;
              align-content: center;
            "
          >
            <h1>Login</h1>
          </a-col>
          <a-col
            :span="24"
            style="
              justify-content: center;
              display: flex;
              align-content: center;
            "
          >
            <a-typography>
              Entrer votre email et votre mot de passe pour vous connecter
            </a-typography>
          </a-col>
          <a-col
            :span="24"
            style="
              justify-content: center;
              display: flex;
              align-content: center;
              width: 100vw;
              padding: 8px;
            "
          >
            <a-form
              :model="formState"
              name="normal_login"
              class="login-form"
              layout="vertical"
              :validate-messages="validateMessages"
              @finish="onFinish"
              @finishFailed="onFinishFailed"
              :disabled="isFetching"
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
                  placeholder="Email"
                  autocomplete="current-email"
                  style="height: 48px"
                >
                </a-input>
              </a-form-item>

              <a-form-item
                label="Mot de passe"
                :name="['user', 'password']"
                :rules="[
                  {
                    required: true,
                    message: 'Veuillez entrer votre mot de passe',
                  },
                ]"
                style="margin-left: 8px; margin-right: 8px"
              >
                <a-input-password
                  v-model:value="formState.user.password"
                  placeholder="Mot de passe"
                  autocomplete="current-password"
                  style="height: 48px"
                >
                </a-input-password>
              </a-form-item>
              <a-form-item>
                <a-flex justify="flex-end">
                  <a-button type="link" @click="redirectForgetPassword()">
                    Mot de passe oublié ?
                  </a-button>
                </a-flex>
              </a-form-item>
              <a-form-item>
                <a-flex justify="center" align="center">
                  <a-button
                    :disabled="disabled"
                    type="primary"
                    html-type="submit"
                    style="height: 56px; width: 302px"
                  >
                    Se connecter
                  </a-button>
                </a-flex>
              </a-form-item>
            </a-form>
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
            <a-divider dashed>OU</a-divider>
          </a-col>
          <a-col
            :span="24"
            style="
              justify-content: center;
              display: flex;
              align-content: center;
              width: 100vw;
              padding: 8px;
            "
          >
            <a-button
              @click="googleAuth()"
              style="
                height: 56px;
                width: 302px;
                font-weight: 700;
                font-size: 16px;
              "
            >
              Se connecter avec google
            </a-button>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
  </a-spin>
</template>
<style scoped>
.login-form {
  width: 100vw;
}
</style>
