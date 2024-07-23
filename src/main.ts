import router from "@/router";

import "ant-design-vue/dist/reset.css";

import Antd from "ant-design-vue";
import { createPinia } from "pinia";
import { createApp, defineAsyncComponent } from "vue";

const App = defineAsyncComponent(() => import("@/App.vue"));
const pinia = createPinia();

const app = createApp(App);
app.use(router);
app.use(pinia);
app.use(Antd);
app.mount("#app");
