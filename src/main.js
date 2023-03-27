import { createApp } from "vue";
import App from "./App.vue";
// import { firebaseConfig } from "./firebase-config";
// import firebase from "firebase/app";
// import "firebase/storage";

import "./axois";
import { storeAuthSchools } from "./store/storeAuthSchools";
import { storeDataSchools } from "./store/storeDataSchools";
import { storeAuthUser } from "./store/storeAuthUser";
import "@fortawesome/fontawesome-free/css/all.css";

import router from "./router";
import "./assets/main.css";

// firebase.initializeApp(firebaseConfig);
// export const storage = firebase.storage();
// console.log(storage);
// export const db = firebase.firestore();
const app = createApp(App);
app.use({
  storeAuthSchools: storeAuthSchools,
  storeDataSchools: storeDataSchools,
  storeAuthUser: storeAuthUser,
});
app.use(router);
app.mount("#app");
