<script setup lang="ts">
import router, { CreateRoomRoute, RolesRoute } from "@/router";

const roles = () => {
  router.push({ name: RolesRoute.name });
};
const createRoom = () => {
  router.push({ name: CreateRoomRoute.name });
};
</script>
<template>
  <a-row>
    <a-col :span="24" align="center">
      <a-card title="Roles" style="margin-top: 8px; width: 90vw">
        <a-button type="primary" @click="roles()">Voir les roles</a-button>
      </a-card>
    </a-col>
    <a-col :span="24" align="center">
      <a-card title="Room" style="margin-top: 8px; width: 90vw">
        <a-button type="primary" @click="createRoom()">Créer une room</a-button>
      </a-card>
    </a-col>
  </a-row>
</template>
