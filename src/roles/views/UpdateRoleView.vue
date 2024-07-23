<script setup lang="ts">
import router, { createRightsRoute } from "@/router";

import { useRoleApi } from "../compositions/use-role-api";

import { message } from "ant-design-vue";
import { computed, onBeforeMount, ref } from "vue";

const { updateRole, getRights, getRole } = useRoleApi();
const { data: updateRoleData, fetch: updateRoleApi } = updateRole();
const { data: role, fetch: getRoleApi } = getRole();
const { data: rights, fetch: getRightsApi } = getRights();
const id = router.currentRoute.value.params.id;

const form = ref<{
  name: string;
  rights: number[];
}>({
  name: "",
  rights: [],
});

const options = ref<{ label: string; value: number }[]>([]);

const onFinish = async () => {
  await updateRoleApi({
    pathParameters: {
      id: id.toString(),
    },
    body: {
      id: Number(id),
      name: form.value.name,
      rights: form.value.rights,
    },
  });
  if (updateRoleData.value) {
    message.success("Role modifié avec succès");
    router.go(-1);
  } else {
    message.error("Erreur lors de la modification du role");
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
  await getRoleApi({
    pathParameters: {
      id: id.toString(),
    },
  });
  if (role.value) {
    form.value.name = role.value.role.name;
    form.value.rights = role.value.role.rights.map((right) => right.id);
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
        >Mettre à jour</a-button
      >
    </a-form-item>
  </a-form>
</template>
