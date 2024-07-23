<script setup lang="ts">
import router, { createRightsRoute } from "@/router";

import { useRoleApi } from "../compositions/use-role-api";

import { message } from "ant-design-vue";
import { computed, onBeforeMount, ref } from "vue";

const { createRole, getRights } = useRoleApi();
const { data: roleCreated, fetch: createRoleApi } = createRole();
const { data: rights, fetch: getRightsApi } = getRights();

const form = ref({
  name: "",
  rights: rights.value?.rights || [],
});

const options = ref<{ label: string; value: number }[]>([]);

const onFinish = async () => {
  await createRoleApi({
    body: form.value,
  });
  if (roleCreated.value) {
    message.success("Role créé avec succès");
    router.go(-1);
  } else {
    message.error("Erreur lors de la création du role");
  }
};
onBeforeMount(async () => {
  await getRightsApi({});
  if (rights.value) {
    options.value = rights.value.rights.map((right) => ({
      label: right.name,
      value: right.id,
    }));
  }
});
const validateMessages = {
  required: "${label} ne doit pas être vide!",
};
const onBack = () => {
  router.go(-1);
};

const disabled = computed(() => {
  return !form.value.name || !form.value.rights.length;
});
const onCreateRight = () => {
  router.push({ name: createRightsRoute.name });
};
</script>

<template>
  <a-flex>
    <div style="margin: 8px">
      <a-space>
        <a-button type="primary" @click="onBack">Retour</a-button>
        <a-button type="primary" @click="onCreateRight"
          >Créer un droit</a-button
        >
      </a-space>
    </div>
  </a-flex>

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
    <a-form-item label="Les droits" name="rights" :rules="[{ required: true }]">
      <a-checkbox-group v-model:value="form.rights" :options="options">
      </a-checkbox-group>
    </a-form-item>
    <a-form-item>
      <a-button type="primary" html-type="submit" :disabled="disabled"
        >Créer</a-button
      >
    </a-form-item>
  </a-form>
</template>
