import { createApp } from "vue";
import App from "./App.vue";
import "./axois";
import { storeAuthSchools } from "./store/storeAuthSchools";
import { storeDataSchools } from "./store/storeDataSchools";

import router from "./router";
import "./assets/main.css";

const app = createApp(App);
app.use({
  storeAuthSchools: storeAuthSchools,
  storeDataSchools: storeDataSchools,
});
app.use(router);
app.mount("#app");
