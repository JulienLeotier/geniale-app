<script setup lang="ts">
import { ParamsToObject } from "@/api/utils/parse-object-value-to-string";
import router, { HomeRoute } from "@/router";
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
</script>
<template>
  <div>
    <h1>Bienvenue {{ user.username }}</h1>
  </div>
</template>
