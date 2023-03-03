import { createRouter, createWebHistory } from "vue-router";
import { storeAuthUser } from "../store/storeAuthUser";
import { computed } from "vue";

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
      component: () => import("../views/Login.vue"),
      // meta: { requiresGuest: true },
    },
    {
      path: "/register-first-step",
      name: "Register",
      component: () => import("../views/Student/RegisterFirstStepView.vue"),
      meta: { requiresGuest: true },
    },
    {
      path: "/register-second-step",
      name: "RegisterStepTwo",
      component: () => import("../views/Student/RegisterSecondStepView.vue"),
      meta: { requiresGuest: true },
    },
    {
      path: "/school-register",
      name: "SchoolRegister",
      component: () => import("../views/Director/SchoolRegister.vue"),
      meta: { requiresGuest: true },
    },
    {
      path: "/teacher-register",
      name: "SchoolRegister",
      component: () => import("../views/teachers/RegisterView.vue"),
      meta: { requiresAuth: true },
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
      path: "/edit-school",
      name: "EditSchool",
      component: () => import("../components/director/EditSchool.vue"),
      meta: { requiresAuth: true },
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
    {
      path: "/teachers",
      name: "TeachersView",
      component: () => import("../views/teachers/TeachersView.vue"),
    },
    {
      path: "/teachers/:id/teacher-details",
      name: "TeacherDetailView",
      component: () => import("../views/teachers/TeacherDetailsView.vue"),
      meta: { requiresAuth: true },
      props: true,
    },
    {
      path: "/test",
      name: "test",
      component: () => import("../views/Test.vue"),
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: () => import("../views/Director/DashboardView.vue"),
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach((to, from) => {
  const authUser = computed(() => storeAuthUser.getters.user);
  if (to.meta.requiresGuest && authUser) {
    return {
      name: "Dashboard",
    };
  } else if (to.meta.requiresAuth && !authenticated) {
    return {
      name: "Login",
    };
  }
});
export default router;
