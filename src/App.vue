<script setup lang="ts">
import { theme } from "@/assets/theme";

import router, { AccountRoute, HomeRoute, RolesRoute } from "./router";

import {
  HomeOutlined,
  HomeTwoTone,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons-vue";
import { ref } from "vue";

const homeActive = ref(true);
const healthProfessionalActive = ref(false);
const accountActive = ref(false);
const onClickHome = () => {
  homeActive.value = true;
  healthProfessionalActive.value = false;
  accountActive.value = false;
  router.push({ name: HomeRoute.name });
};
const onClickHealthProfessional = () => {
  healthProfessionalActive.value = true;
  homeActive.value = false;
  accountActive.value = false;
  router.push({ name: RolesRoute.name });
};
const onClickAccount = () => {
  accountActive.value = true;
  homeActive.value = false;
  healthProfessionalActive.value = false;
  router.push({ name: AccountRoute.name });
};
</script>

<template>
  <a-config-provider :theme="theme">
    <router-view />
    <a-layout-footer class="bottom-menu">
      <a-row justify="space-around" style="height: 80px">
        <a-col>
          <a-button
            type="text"
            @click="onClickHome()"
            :style="
              homeActive
                ? {
                    backgroundColor: 'rgba(229,163,163, 0.1)',
                    height: '100%',
                  }
                : {
                    height: '100%',
                  }
            "
          >
            <a-row justify="center" align="center">
              <a-col :span="24">
                <HomeTwoTone
                  v-if="homeActive"
                  style="font-size: 24px"
                  two-tone-color="#E5A3A3"
                />
                <HomeOutlined v-else style="font-size: 24px" />
              </a-col>
              <a-col :span="24"
                ><span :style="homeActive ? { color: '#E5A3A3' } : {}"
                  >Home</span
                ></a-col
              >
            </a-row>
          </a-button>
        </a-col>
        <a-col>
          <a-button
            type="text"
            @click="onClickHealthProfessional()"
            :style="
              healthProfessionalActive
                ? {
                    backgroundColor: 'rgba(229,163,163, 0.1)',
                    height: '100%',
                  }
                : {
                    height: '100%',
                  }
            "
          >
            <a-row justify="center" align="center">
              <a-col :span="24">
                <TeamOutlined
                  v-if="healthProfessionalActive"
                  style="font-size: 24px; color: #e5a3a3"
                />
                <TeamOutlined v-else style="font-size: 24px" />
              </a-col>
              <a-col :span="24"
                ><span
                  :style="healthProfessionalActive ? { color: '#E5A3A3' } : {}"
                  >Psychologues</span
                >
              </a-col>
            </a-row>
          </a-button>
        </a-col>
        <a-col>
          <a-button
            type="text"
            @click="onClickAccount()"
            :style="
              accountActive
                ? {
                    backgroundColor: 'rgba(229,163,163, 0.1)',
                    height: '100%',
                  }
                : {
                    height: '100%',
                  }
            "
          >
            <a-row justify="center" align="center">
              <a-col :span="24">
                <UserOutlined
                  v-if="accountActive"
                  style="font-size: 24px; color: #e5a3a3"
                />
                <UserOutlined v-else style="font-size: 24px" />
              </a-col>
              <a-col :span="24"
                ><span :style="accountActive ? { color: '#E5A3A3' } : {}"
                  >Profile</span
                ></a-col
              >
            </a-row>
          </a-button>
        </a-col>
      </a-row>
    </a-layout-footer>
  </a-config-provider>
</template>
<style scoped>
.bottom-menu {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 80px;
  background: #fff;
  border-top: 1px solid #e8e8e8;
}
</style>
