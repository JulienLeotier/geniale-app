<script setup lang="ts">
import { IUser } from "@/api/models/api/user";
import router from "@/router";
import { useStore } from "@/store";
import { buttonStyle } from "@/styles/button";

import { useUser } from "../compositions/use-user";

import { LeftOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import { Ref, ref } from "vue";
import VOtpInput from "vue3-otp-input";

const otcCode = ref<string>("");
const store = useStore();

const { checkCode } = useUser();
const user: Ref<IUser> = ref(store.user);

const { data: checkCodeData, fetch: CheckCode } = checkCode();

const handleOnComplete = async (_value: string) => {
  await CheckCode({
    pathParameters: {
      id: user.value.id.toString(),
    },
    queries: {
      code: _value,
    },
  });
  if (checkCodeData.value) {
    message.success("Email confirmé avec succès");
    otcCode.value = "";
  } else {
    message.error("Code de confirmation incorrect");
  }
};
const onBack = () => {
  router.go(-1);
};
</script>

<template>
  <a-button @click="onBack()" :style="buttonStyle">
    <template #icon> <LeftOutlined /> </template>
  </a-button>
  <a-row justify="center" align="center">
    <a-col>
      <a-row :gutter="[16, 16]" style="width: 100vw">
        <a-col
          :span="24"
          style="justify-content: center; display: flex; align-content: center"
        >
          <a-image src="./image_check_code.png" :preview="false" />
        </a-col>
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
              "
            >
              <h1>Vérification du code</h1>
            </a-col>
            <a-col
              :span="24"
              style="
                justify-content: center;
                display: flex;
                align-content: center;
              "
            >
              <a-typography>Entrez le code reçu par email</a-typography>
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
          <v-otp-input
            v-model:value="otcCode"
            class="gap-4"
            input-classes="otp-input"
            separator=""
            :num-inputs="6"
            :should-auto-focus="true"
            input-type="letter-numeric"
            :placeholder="['', '', '', '', '', '']"
            @on-complete="handleOnComplete"
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
          <a-flex justify="center" align="center">
            <a-button
              type="primary"
              @click="handleOnComplete"
              style="height: 56px; width: 302px"
            >
              Confirmer
            </a-button>
          </a-flex>
        </a-col>
      </a-row>
    </a-col>
  </a-row>
</template>

<style scoped>
:deep(.otp-input) {
  width: 46px;
  height: 60px;
  padding: 5px;
  margin: 0 5px;
  font-size: 20px;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  text-align: center;
}
:deep(otp-input.is-complete) {
  background-color: #e4e4e4;
}
:deep(.otp-input::-webkit-inner-spin-button),
:deep(.otp-input::-webkit-outer-spin-button) {
  -webkit-appearance: none;
  margin: 0;
}
input::placeholder {
  text-align: center;
}
</style>
