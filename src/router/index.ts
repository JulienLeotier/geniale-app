import { useWhoIAm } from "@/api/common-api/use-whoiam";
import { ParamsToObject } from "@/api/utils/parse-object-value-to-string";
import GallerieViews from "@/gallerie/views/gallerieViews.vue";
import HomeViews from "@/home/views/HomeViews.vue";
import ForgetPasswordView from "@/login/views/ForgetPasswordView.vue";
import LoginView from "@/login/views/LoginView.vue";
import RegisterView from "@/login/views/RegisterView.vue";
import ResetPasswordView from "@/login/views/ResetPasswordView.vue";
import OnbordingView from "@/onbording/views/onbordingView.vue";
import AccountView from "@/parameter/views/AccountView.vue";
import CheckCodeView from "@/parameter/views/CheckCodeView.vue";
import CreateRightView from "@/roles/views/CreateRightView.vue";
import CreateRoleView from "@/roles/views/CreateRoleView.vue";
import RolesView from "@/roles/views/RolesView.vue";
import UpdateRoleView from "@/roles/views/UpdateRoleView.vue";
import { useStore } from "@/store";

import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

export const LoginRoute = {
  path: "/Login",
  name: "Login",
  component: LoginView,
} as const as RouteRecordRaw;

export const onboardingRoute = {
  path: "/",
  name: "onBoarding",
  component: OnbordingView,
} as const as RouteRecordRaw;

export const HomeRoute = {
  path: "/home",
  name: "Home",
  component: HomeViews,
  beforeEnter: async (_to, _from, next) => {
    const store = useStore();
    const { data: whoiam, fetch: getWhoIam } = useWhoIAm();
    const response = ParamsToObject(document.location.search);
    if (response.token) {
      store.setToken(response.token);
    }
    if (localStorage.getItem("token")) {
      await getWhoIam({});
      if (!whoiam.value) {
        store.setToken(null);
        store.setUser(null);
        next({ name: "Login" });
      } else {
        store.setUser(whoiam.value.user);
        next();
      }
    } else {
      store.setToken(null);
      store.setUser(null);
      next({ name: "Login" });
    }
  },
} as const as RouteRecordRaw;

export const Logout = {
  path: "/logout",
  name: "Logout",
  beforeEnter: (_to, _from, next) => {
    const store = useStore();
    store.setToken(null);
    store.setUser(null);
    next({ name: "Login" });
  },
} as const as RouteRecordRaw;

export const ResetPassword = {
  path: "/reset-password",
  name: "ResetPassword",
  component: ResetPasswordView,
  beforeEnter: async (_to, _from, next) => {
    const response = ParamsToObject(document.location.search);
    if (!response.token) {
      next({ name: LoginRoute.name });
    } else {
      next();
    }
  },
} as const as RouteRecordRaw;

export const ForgetPassword = {
  path: "/forget-password",
  name: "ForgetPassword",
  component: ForgetPasswordView,
} as const as RouteRecordRaw;

export const Register = {
  path: "/register",
  name: "Register",
  component: RegisterView,
} as const as RouteRecordRaw;

export const AccountRoute = {
  path: "/account",
  name: "Account",
  component: AccountView,
  beforeEnter: async (_to, _from, next) => {
    const store = useStore();
    const { data: whoiam, fetch: getWhoIam } = useWhoIAm();
    if (localStorage.getItem("token")) {
      await getWhoIam({});
      if (!whoiam.value) {
        store.setToken(null);
        store.setUser(null);
        next({ name: "Login" });
      } else {
        store.setUser(whoiam.value.user);
        next();
      }
    } else {
      store.setToken(null);
      store.setUser(null);
      next({ name: "Login" });
    }
  },
} as const as RouteRecordRaw;

export const CheckCodeRoute = {
  path: "/check-code",
  name: "CheckCode",
  component: CheckCodeView,
  beforeEnter: async (_to, _from, next) => {
    const store = useStore();
    const { data: whoiam, fetch: getWhoIam } = useWhoIAm();
    if (localStorage.getItem("token")) {
      await getWhoIam({});
      if (!whoiam.value) {
        store.setToken(null);
        store.setUser(null);
        next({ name: "Login" });
      } else {
        store.setUser(whoiam.value.user);
        next();
      }
    } else {
      store.setToken(null);
      store.setUser(null);
      next({ name: "Login" });
    }
  },
} as const as RouteRecordRaw;
export const CreationRoleRoute = {
  path: "/create-role",
  name: "CreateRole",
  component: CreateRoleView,
  beforeEnter: async (_to, _from, next) => {
    const store = useStore();
    const { data: whoiam, fetch: getWhoIam } = useWhoIAm();
    if (localStorage.getItem("token")) {
      await getWhoIam({});
      if (!whoiam.value) {
        store.setToken(null);
        store.setUser(null);
        next({ name: "Login" });
      } else {
        store.setUser(whoiam.value.user);
        next();
      }
    } else {
      store.setToken(null);
      store.setUser(null);
      next({ name: "Login" });
    }
  },
} as const as RouteRecordRaw;

export const UpdateRoleRoute = {
  path: "/update-role/:id",
  name: "UpdateRole",
  component: UpdateRoleView,
  beforeEnter: async (_to, _from, next) => {
    const store = useStore();
    const { data: whoiam, fetch: getWhoIam } = useWhoIAm();
    if (localStorage.getItem("token")) {
      await getWhoIam({});
      if (!whoiam.value) {
        store.setToken(null);
        store.setUser(null);
        next({ name: "Login" });
      } else {
        store.setUser(whoiam.value.user);
        next();
      }
    } else {
      store.setToken(null);
      store.setUser(null);
      next({ name: "Login" });
    }
  },
} as const as RouteRecordRaw;

export const RolesRoute = {
  path: "/roles",
  name: "Roles",
  component: RolesView,
  beforeEnter: async (_to, _from, next) => {
    const store = useStore();
    const { data: whoiam, fetch: getWhoIam } = useWhoIAm();
    if (localStorage.getItem("token")) {
      await getWhoIam({});
      if (!whoiam.value) {
        store.setToken(null);
        store.setUser(null);
        next({ name: "Login" });
      } else {
        store.setUser(whoiam.value.user);
        next();
      }
    } else {
      store.setToken(null);
      store.setUser(null);
      next({ name: "Login" });
    }
  },
} as const as RouteRecordRaw;

export const createRightsRoute = {
  path: "/create-rights",
  name: "CreateRights",
  component: CreateRightView,
  beforeEnter: async (_to, _from, next) => {
    const store = useStore();
    const { data: whoiam, fetch: getWhoIam } = useWhoIAm();
    if (localStorage.getItem("token")) {
      await getWhoIam({});
      if (!whoiam.value) {
        store.setToken(null);
        store.setUser(null);
        next({ name: "Login" });
      } else {
        store.setUser(whoiam.value.user);
        next();
      }
    } else {
      store.setToken(null);
      store.setUser(null);
      next({ name: "Login" });
    }
  },
} as const as RouteRecordRaw;

export const GallerieRoute = {
  path: "/gallerie",
  name: "Gallerie",
  component: GallerieViews,
  beforeEnter: async (_to, _from, next) => {
    const store = useStore();
    const { data: whoiam, fetch: getWhoIam } = useWhoIAm();
    const response = ParamsToObject(document.location.search);
    if (response.token) {
      store.setToken(response.token);
    }
    if (localStorage.getItem("token")) {
      await getWhoIam({});
      if (!whoiam.value) {
        store.setToken(null);
        store.setUser(null);
        next({ name: "Login" });
      } else {
        store.setUser(whoiam.value.user);
        next();
      }
    } else {
      store.setToken(null);
      store.setUser(null);
      next({ name: "Login" });
    }
  },
} as const as RouteRecordRaw;

const routes: Array<RouteRecordRaw> = [
  LoginRoute,
  HomeRoute,
  Logout,
  ForgetPassword,
  ResetPassword,
  AccountRoute,
  CreationRoleRoute,
  UpdateRoleRoute,
  RolesRoute,
  createRightsRoute,
  onboardingRoute,
  CheckCodeRoute,
  Register,
  GallerieRoute,
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
