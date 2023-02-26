import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("../components/Login.vue"),
    },
    {
      path: "/register",
      name: "Register",
      component: () => import("../components/Register.vue"),
    },
    {
      path: "/school-register",
      name: "SchoolRegister",
      component: () => import("../components/director/SchoolRegister.vue"),
    },
    {
      path: "/forgot-password",
      name: "ForgotPassword",
      component: () => import("../components/ForgetPassword.vue"),
    },
    {
      path: "/password-reset/:token",
      name: "ResetPassword",
      component: () => import("../components/ResetPassword.vue"),
    },
    {
      path: "/schools",
      name: "SchoolsView",
      component: () => import("../views/SchoolsView.vue"),
    },
    {
      path: "/schools/:id/school-details",
      name: "SchoolDetailView",
      component: () => import("../views/SchoolDetailsView.vue"),
      props: true,
    },
  ],
});

export default router;
