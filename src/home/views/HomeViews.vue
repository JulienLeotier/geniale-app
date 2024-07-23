<script setup lang="ts">
import { ParamsToObject } from "@/api/utils/parse-object-value-to-string";
import router, { AccountRoute, HomeRoute, Logout, RolesRoute } from "@/router";
import { useStore } from "@/store";

import { onBeforeMount, ref, watch } from "vue";

const store = useStore();
const user = ref(store.user);

onBeforeMount(() => {
  const response = ParamsToObject(document.location.search);
  if (response.token) {
    router.push({ name: HomeRoute.name });
  }
});

watch(store.user, (newUser) => {
  user.value = newUser;
});
const logout = () => {
  router.push({ name: Logout.name });
};
const params = () => {
  router.push({ name: AccountRoute.name });
};
const roles = () => {
  router.push({ name: RolesRoute.name });
};
</script>
<template>
  <div>
    <h1>Bienvenue {{ user.username }}</h1>
    <a-card title="Informations">
      <p>Username: {{ user.username }}</p>
      <p>Email: {{ user.email }}</p>
      <a-space>
        <a-button type="primary" @click="params()">Modifier</a-button>
        <a-button type="primary" @click="logout()">Se déconnecter</a-button>
      </a-space>
    </a-card>
    <a-card title="Roles">
      <a-button type="primary" @click="roles()">Voir les roles</a-button>
    </a-card>
  </div>
</template>
