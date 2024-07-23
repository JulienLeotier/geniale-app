<script lang="ts" setup>
import router, { CreationRoleRoute, UpdateRoleRoute } from "@/router";

import { useRoleApi } from "../compositions/use-role-api";
import { IRight, IRole } from "../models/roles";

import { onBeforeMount } from "vue";

const { getRoles, deleteRole } = useRoleApi();
const {
  data: roles,
  isFetching: isFetchingRoles,
  fetch: getRolesApi,
} = getRoles();
const { fetch: deleteRoleApi } = deleteRole();
const columns = [
  {
    title: "Nom",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Droits",
    dataIndex: "rights",
    key: "rights",
  },
  {
    title: "operation",
    dataIndex: "operation",
    key: "operation",
  },
];
onBeforeMount(async () => {
  await getRolesApi({});
});
const onDelete = async (role: IRole) => {
  await deleteRoleApi({
    pathParameters: {
      id: role.id.toString(),
    },
  });
  await getRolesApi({});
};
const onUpdate = (role: IRole) => {
  router.push({ name: UpdateRoleRoute.name, params: { id: role.id } });
};

const onCreate = () => {
  router.push({ name: CreationRoleRoute.name });
};
const onBack = () => {
  router.go(-1);
};
</script>
<template>
  <a-flex>
    <div style="margin: 8px">
      <a-space>
        <a-button type="primary" @click="onBack">Retour</a-button>
        <a-button type="primary" @click="onCreate">Créer un role</a-button>
      </a-space>
    </div>
  </a-flex>

  <a-spin :spinning="isFetchingRoles">
    <a-table :columns="columns" :dataSource="roles?.roles">
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'rights'">
          {{ record.rights.map((right: IRight) => right.name).join(", ") }}
        </template>
        <template v-if="column.dataIndex === 'operation'">
          <a-space>
            <a-popconfirm
              title="Voulez vous vraiment modifier ce Role ? "
              @confirm="onUpdate(record)"
            >
              <a>modifier</a>
            </a-popconfirm>
            <a-popconfirm
              title="Voulez vous vraiment supprimer ce Role ? "
              @confirm="onDelete(record)"
            >
              <a>supprimer</a>
            </a-popconfirm>
          </a-space>
        </template>
      </template>
    </a-table>
  </a-spin>
</template>
