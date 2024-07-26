<script setup lang="ts">
import router, { RolesRoute } from "@/router";

const roles = () => {
  router.push({ name: RolesRoute.name });
};
</script>
<template>
  <a-card title="Roles">
    <a-button type="primary" @click="roles()">Voir les roles</a-button>
  </a-card>
</template>
