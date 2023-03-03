import { createApp } from "vue";
import App from "./App.vue";
import "./axois";
import { storeAuthSchools } from "./store/storeAuthSchools";
import { storeDataSchools } from "./store/storeDataSchools";
import { storeAuthUser } from "./store/storeAuthUser";
import "@fortawesome/fontawesome-free/css/all.css";

import router from "./router";
import "./assets/main.css";

const app = createApp(App);
app.use({
  storeAuthSchools: storeAuthSchools,
  storeDataSchools: storeDataSchools,
  storeAuthUser: storeAuthUser,
});
app.use(router);
app.mount("#app");
