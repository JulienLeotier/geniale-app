<script setup lang="ts">
import router from "@/router";

import { useRoleApi } from "../compositions/use-role-api";

import { message } from "ant-design-vue";
import { computed, ref } from "vue";

const { createRights } = useRoleApi();
const { data: rightsData, fetch: createRightsApi } = createRights();

const form = ref({
  name: "",
});

const onFinish = async () => {
  await createRightsApi({
    body: form.value,
  });
  if (rightsData.value) {
    message.success("Le droit a été créé avec succès");
    router.go(-1);
  } else {
    message.error("Erreur lors de la création du droit");
  }
};

const validateMessages = {
  required: "${label} ne doit pas être vide!",
};
const onBack = () => {
  router.go(-1);
};
const disabled = computed(() => {
  return !form.value.name;
});
</script>

<template>
  <a-button type="primary" @click="onBack">Retour</a-button>
  <a-form
    :form="form"
    :model="form"
    name="normal_login"
    class="login-form"
    layout="vertical"
    @finish="onFinish"
    :validate-messages="validateMessages"
  >
    <a-form-item label="Nom" name="name" :rules="[{ required: true }]">
      <a-input v-model:value="form.name" />
    </a-form-item>
    <a-form-item>
      <a-button type="primary" html-type="submit" :disabled="disabled"
        >Créer</a-button
      >
    </a-form-item>
  </a-form>
</template>
