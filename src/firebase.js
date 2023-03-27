// import firebase from "firebase/app";
// import "firebase/firestore";
// import "firebase/storage";

// const firebaseConfig = {
//   apiKey: "AIzaSyCblJeb0mlwA4HpDQBvyBB0Gr5VGcT5UOI",
//   authDomain: "shkola-app.firebaseapp.com",
//   projectId: "shkola-app",
//   storageBucket: "shkola-app.appspot.com",
//   messagingSenderId: "827368572019",
//   appId: "1:827368572019:web:ab8d74aa840ef08da25606",
//   measurementId: "G-TR3BCM6J2Z",
// };

// const fb = firebase.initializeApp(firebaseConfig);
// const db = firebase.firestore();
// // const storage = firebase.storage();

// export default { fb, db };

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCblJeb0mlwA4HpDQBvyBB0Gr5VGcT5UOI",
  authDomain: "shkola-app.firebaseapp.com",
  projectId: "shkola-app",
  storageBucket: "shkola-app.appspot.com",
  messagingSenderId: "827368572019",
  appId: "1:827368572019:web:ab8d74aa840ef08da25606",
  measurementId: "G-TR3BCM6J2Z",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

import { getStorage } from "firebase/storage";
const storage = getStorage(app);

export { storage };
