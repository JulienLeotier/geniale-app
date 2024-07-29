<script setup lang="ts">
import { theme } from "@/assets/theme";

import {
  AccountRoute,
  AdminRoute,
  CreateRoomRoute,
  ForgetPassword,
  GallerieRoute,
  HomeRoute,
  LoginRoute,
  onboardingRoute,
  Register,
  ResetPassword,
} from "./router";

import {
  HomeOutlined,
  HomeTwoTone,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons-vue";
import { computed, onBeforeMount, ref, watch } from "vue";
import { useRouter } from "vue-router";

const homeActive = ref(true);
const GallerieActive = ref(false);
const accountActive = ref(false);
const router = useRouter();
const currentRouter = ref(router.currentRoute.value);

onBeforeMount(() => {
  currentRouter.value = router.currentRoute.value;
  if (currentRouter.value.name === HomeRoute.name) {
    homeActive.value = true;
    GallerieActive.value = false;
    accountActive.value = false;
  } else if (currentRouter.value.name === GallerieRoute.name) {
    GallerieActive.value = true;
    homeActive.value = false;
    accountActive.value = false;
  } else if (currentRouter.value.name === AccountRoute.name) {
    accountActive.value = true;
    homeActive.value = false;
    GallerieActive.value = false;
  }
});

watch(
  () => router.currentRoute.value,
  () => {
    currentRouter.value = router.currentRoute.value;
    if (currentRouter.value.name === HomeRoute.name) {
      homeActive.value = true;
      GallerieActive.value = false;
      accountActive.value = false;
    } else if (currentRouter.value.name === GallerieRoute.name) {
      GallerieActive.value = true;
      homeActive.value = false;
      accountActive.value = false;
    } else if (currentRouter.value.name === AccountRoute.name) {
      accountActive.value = true;
      homeActive.value = false;
      GallerieActive.value = false;
    }
  },
  { deep: true },
);

const onClickHome = async () => {
  homeActive.value = true;
  GallerieActive.value = false;
  accountActive.value = false;
  await router.push({ name: HomeRoute.name });
};
const onClickGallerie = async () => {
  GallerieActive.value = true;
  homeActive.value = false;
  accountActive.value = false;
  await router.push({ name: GallerieRoute.name });
};
const onClickAccount = async () => {
  accountActive.value = true;
  homeActive.value = false;
  GallerieActive.value = false;
  await router.push({ name: AccountRoute.name });
};
const currentRouteName = computed(() => {
  return (
    currentRouter.value.name !== LoginRoute.name &&
    currentRouter.value.name !== onboardingRoute.name &&
    currentRouter.value.name !== ForgetPassword.name &&
    currentRouter.value.name !== ResetPassword.name &&
    currentRouter.value.name !== Register.name &&
    currentRouter.value.name !== AdminRoute.name &&
    currentRouter.value.name !== CreateRoomRoute.name
  );
});
</script>

<template>
  <a-config-provider :theme="theme">
    <router-view />
    <a-layout-footer class="bottom-menu" v-if="currentRouteName">
      <a-row justify="space-around" style="height: 80px">
        <a-col>
          <a-button
            type="text"
            @click="onClickHome()"
            :style="
              homeActive
                ? {
                    backgroundColor: 'rgba(241, 181, 65, 0.1)',
                    height: '100%',
                    borderRadius: '70%',
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
                  two-tone-color="#f1b541"
                />
                <HomeOutlined v-else style="font-size: 24px" />
              </a-col>
              <a-col :span="24"
                ><span :style="homeActive ? { color: '#f1b541' } : {}"
                  >Acceuil</span
                ></a-col
              >
            </a-row>
          </a-button>
        </a-col>
        <a-col>
          <a-button
            type="text"
            @click="onClickGallerie()"
            :style="
              GallerieActive
                ? {
                    backgroundColor: 'rgba(241, 181, 65, 0.1)',
                    height: '100%',
                    borderRadius: '70%',
                  }
                : {
                    height: '100%',
                  }
            "
          >
            <a-row justify="center" align="center">
              <a-col :span="24">
                <TeamOutlined
                  v-if="GallerieActive"
                  style="font-size: 24px; color: #f1b541"
                />
                <TeamOutlined v-else style="font-size: 24px" />
              </a-col>
              <a-col :span="24"
                ><span :style="GallerieActive ? { color: '#f1b541' } : {}"
                  >Galleries</span
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
                    backgroundColor: 'rgba(241, 181, 65, 0.1)',
                    height: '100%',
                    borderRadius: '70%',
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
                  style="font-size: 24px; color: #f1b541"
                />
                <UserOutlined v-else style="font-size: 24px" />
              </a-col>
              <a-col :span="24"
                ><span :style="accountActive ? { color: '#f1b541' } : {}"
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
<style>
.bottom-menu {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 80px;
  background: #fff;
  border-top: 1px solid #f1b541;
}
body {
  background-image: url("./background.png");
  background-size: cover;
  background-position: bottom;
  height: 100%;
}
</style>
