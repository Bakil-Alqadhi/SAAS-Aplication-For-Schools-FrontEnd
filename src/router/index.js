import { createRouter, createWebHistory } from "vue-router";
import { storeAuthUser } from "../store/storeAuthUser";
import { computed } from "vue";
import { mapActions } from "vuex";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import("../views/Frontend/HomeView.vue"),
      meta: { requiresGuest: true },
    },
    {
      path: "/about",
      name: "AboutView",
      component: () => import("../views/Frontend/AboutView.vue"),
      meta: { requiresGuest: true },
    },
    {
      path: "/footer",
      name: "Footer",
      component: () => import("../views/Frontend/FooterView.vue"),
      meta: { requiresGuest: true },
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("../views/LoginView.vue"),
      meta: { requiresGuest: true },
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
      path: "/register-third-step",
      name: "RegisterStepThree",
      component: () => import("../views/Student/RegisterThirdStepView.vue"),
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
      name: "TeacherRegister",
      component: () => import("../views/teachers/RegisterView.vue"),
      meta: { requiresGuest: true },
    },
    {
      path: "/teachers/:id",
      name: "EditTeacher",
      component: () => import("../views/teachers/EditTeacherView.vue"),
      meta: { requiresAuth: true },
      requiresRole: "teacher",
      props: true,
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
      meta: { requiresGuest: true },
    },
    {
      path: "/schools/:id/school-details",
      name: "SchoolDetailView",
      component: () => import("../views/SchoolDetailsView.vue"),
      props: true,
      meta: { requiresGuest: true },
    },
    {
      path: "/students",
      name: "StudentsView",
      component: () => import("../views/Student/StudentsView.vue"),
      meta: {
        requiresAuth: true,
        requiresRole: "director",
      },
    },
    {
      path: "/students/:id/student-details",
      name: "StudentDetailView",
      component: () =>
        import("../views/Student/StudentDetailsView(noneed).vue"),
      meta: { requiresAuth: true },
      props: true,
    },
    {
      path: "/students/:id",
      name: "EditStudent",
      component: () => import("../views/Student/EditStudentView.vue"),
      meta: { requiresAuth: true },
      requiresRole: "student",
      props: true,
    },
    {
      path: "/teachers",
      name: "TeachersView",
      component: () => import("../views/teachers/TeachersView.vue"),
      meta: {
        requiresAuth: true,
        requiresRole: "director",
      },
    },
    {
      path: "/teachers/:id/teacher-details",
      name: "TeacherDetailView",
      component: () =>
        import("../views/teachers/TeacherDetailsView(noneed).vue"),
      meta: {
        requiresAuth: true,
        requiresRole: "director",
      },
      props: true,
    },
    {
      path: "/waiting/:id/teacher-details",
      name: "WaitingTeacherDetailView",
      component: () => import("../views/Director/TeacherDetailsView.vue"),
      meta: {
        requiresAuth: true,
        requiresRole: "director",
      },
      props: true,
    },
    {
      path: "/waiting/:id/student-details",
      name: "WaitingStudentDetailView",
      component: () => import("../views/Director/StudentDetailsView.vue"),
      meta: {
        requiresAuth: true,
        requiresRole: "director",
      },
      props: true,
    },
    {
      path: "/waiting",
      name: "WaitingView",
      component: () => import("../views/Director/WaitingView.vue"),
      meta: {
        requiresAuth: true,
        requiresRole: "director",
      },
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
      meta: {
        requiresAuth: true,
        requiresRole: "director",
      },
    },
    {
      path: "/grades/index",
      name: "GradesHome",
      component: () => import("../views/Director/IndexGradesView.vue"),
      meta: {
        requiresAuth: true,
        requiresRole: "director",
      },
    },
    {
      path: "/grades/:id",
      name: "EditGrade",
      component: () => import("../views/Director/EditGradeView.vue"),
      meta: {
        requiresAuth: true,
        requiresRole: "director",
      },
      props: true,
    },
    {
      path: "/grade/create",
      name: "CreateGrade",
      component: () => import("../views/Director/CreateGradeView.vue"),
      meta: {
        requiresAuth: true,
        requiresRole: "director",
      },
    },
    {
      path: "/classrooms/create",
      name: "CreateClassroom",
      component: () => import("../views/Director/CreateClassroomView.vue"),
      meta: {
        requiresAuth: true,
        requiresRole: "director",
      },
    },
    {
      path: "/classrooms/index",
      name: "Classrooms",
      component: () => import("../views/Director/IndexClassroomsView.vue"),
      meta: {
        requiresAuth: true,
        requiresRole: "director",
      },
    },
    {
      path: "/classrooms/:id",
      name: "EditClassroom",
      component: () => import("../views/Director/EditClassroomView.vue"),
      meta: {
        requiresAuth: true,
        requiresRole: "director",
      },
      props: true,
    },
    {
      path: "/classrooms/:id/index",
      name: "ShowClassroom",
      component: () => import("../views/Director/ClassroomDetailsView.vue"),
      meta: {
        requiresAuth: true,
        requiresRole: "director",
      },
      props: true,
    },
    {
      path: "/sections/index",
      name: "Sections",
      component: () => import("../views/Director/IndexSectionsView.vue"),
      meta: {
        requiresAuth: true,
        requiresRole: "director",
      },
    },
    {
      path: "/sections/:id",
      name: "EditSection",
      component: () => import("../views/Director/EditSectionsView.vue"),
      meta: {
        requiresAuth: true,
        requiresRole: "director",
      },
      props: true,
    },
    {
      path: "/add/students/to/sections/:id",
      name: "AddingStudentToSection",
      component: () =>
        import("../views/Student/AddingStudentsToSectionView.vue"),
      meta: {
        requiresAuth: true,
        requiresRole: "director",
      },
      props: true,
    },
    {
      path: "/sections/:id/index",
      name: "ShowSection",
      component: () => import("../views/Director/SectionDetailsView.vue"),
      meta: {
        requiresAuth: true,
        requiresRole: "director",
      },
      props: true,
    },
    {
      path: "/sections/create",
      name: "CreateSections",
      component: () => import("../views/Director/CreateSectionsView.vue"),
      meta: {
        requiresAuth: true,
        requiresRole: "director",
      },
    },
    //Start Exam's routes
    {
      path: "/quizzes/index",
      name: "IndexQuiz",
      component: () => import("../views/Director/Quizzes/IndexQuizzesView.vue"),
      meta: {
        requiresAuth: true,
        requiresRole: "director",
      },
    },
    {
      path: "/quizzes/create",
      name: "CreateQuiz",
      component: () => import("../views/Director/Quizzes/CreateQuizView.vue"),
      meta: {
        requiresAuth: true,
        requiresRole: "director",
      },
    },
    {
      path: "/quizzes/:id/edit",
      name: "EditQuiz",
      component: () => import("../views/Director/Quizzes/EditQuizView.vue"),
      meta: {
        requiresAuth: true,
        requiresRole: "director",
      },
      props: true,
    },
    //End Exam's routes
    {
      path: "/promotions/index",
      name: "IndexPromotions",
      component: () => import("../views/Director/IndexPromotionsView.vue"),
      meta: {
        requiresAuth: true,
        requiresRole: "director",
      },
    },
    {
      path: "/promotions/create",
      name: "CreatePromotions",
      component: () => import("../views/Director/CreatePromotionView.vue"),
      meta: {
        requiresAuth: true,
        requiresRole: "director",
      },
    },
    {
      path: "/graduated/index",
      name: "IndexGraduated",
      component: () => import("../views/Director/IndexGraduateView.vue"),
      meta: {
        requiresAuth: true,
        requiresRole: "director",
      },
    },
    //Start Subjects routes
    {
      path: "/subjects/index",
      name: "IndexSubject",
      component: () =>
        import("../views/Director/Subjects/IndexSubjectsView.vue"),
      meta: {
        requiresAuth: true,
        requiresRole: "director",
      },
    },
    {
      path: "/subjects/create",
      name: "CreateSubject",
      component: () =>
        import("../views/Director/Subjects/CreateSubjectView.vue"),
      meta: {
        requiresAuth: true,
        requiresRole: "director",
      },
    },
    {
      path: "/subjects/:id",
      name: "EditSubject",
      component: () => import("../views/Director/Subjects/EditSubjectView.vue"),
      meta: {
        requiresAuth: true,
        requiresRole: "director",
      },
      props: true,
    },
    //End  Subjects routes
    {
      path: "/graduated/create",
      name: "CreateGraduated",
      component: () => import("../views/Director/CreateGraduatedView.vue"),
      meta: {
        requiresAuth: true,
        requiresRole: "director",
      },
    },
    {
      path: "/teacher/dashboard",
      name: "TeacherDashboard",
      component: () => import("../views/teachers/DashboardView.vue"),
      meta: {
        requiresAuth: true,
        requiresRole: "teacher",
      },
    },
    {
      path: "/",
      name: "TeacherHome",
      component: () => import("../views/teachers/DashboardView.vue"),
      meta: {
        requiresAuth: true,
        requiresRole: "teacher",
      },
    },
    {
      path: "/teacher/section/:id/attendance",
      name: "CreateAttendanceView",
      component: () => import("../views/teachers/CreateAttendanceView.vue"),
      meta: {
        requiresAuth: true,
        requiresRole: "teacher",
      },
      props: true,
    },
    {
      path: "/teacher/sections/index",
      name: "IndexTeacherSectionsView",
      component: () => import("../views/teachers/IndexTeacherSectionsView.vue"),
      meta: {
        requiresAuth: true,
        requiresRole: "teacher",
      },
      props: true,
    },
    {
      path: "/teacher/quizzes",
      name: "TeacherQuizzes",
      component: () => import("../views/teachers/Questions/IndexQuizzesView.vue"),
      meta: {
        requiresAuth: true,
        requiresRole: "teacher",
      },
    },
    {
      path: "/questions/index",
      name: "IndexQuestionsTeacher",
      component: () =>
        import("../views/teachers/Questions/IndexQuestionsView.vue"),
      meta: {
        requiresAuth: true,
        requiresRole: "teacher",
      },
    },
    {
      path: "/questions/create",
      name: "CreateQuestion",
      component: () =>
        import("../views/teachers/Questions/CreateQuestionView.vue"),
      meta: {
        requiresAuth: true,
        requiresRole: "teacher",
      },
    },
    {
      path: "/questions/:id/edit",
      name: "EditQuestionTeacher",
      component: () =>
        import("../views/teachers/Questions/EditQuestionView.vue"),
      meta: {
        requiresAuth: true,
        requiresRole: "teacher",
      },
      props: true,
    },
    {
      path: "/student/dashboard",
      name: "StudentDashboard",
      component: () => import("../views/Student/DashboardView.vue"),
      meta: {
        requiresAuth: true,
        requiresRole: "student",
      },
    },
    {
      path: "/student/parents",
      name: "ParentsDashboard",
      component: () => import("../views/Student/ParentsView.vue"),
      meta: {
        requiresAuth: true,
        requiresRole: "student",
      },
    },
    {
      path: "/error-component",
      name: "ErrorComponent",
      component: () => import("../views/ErrorComponent.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    // catch-all 404 route
    // { path: "*", component: NotFound },
  ],
});

router.beforeEach(
  (to, from, next) => {
    const authUser = localStorage.getItem("guard");
    if (to.meta.requiresAuth && !authUser) {
      next("/login");
    } else if (to.meta.requiresAuth && authUser) {
      if (to.meta.requiresRole && authUser !== to.meta.requiresRole) {
        next("/error-component");
      } else {
        next();
      }
    } else if (to.meta.requiresGuest && authUser) {
      router.go(-1);
      // next();
      // next("/home");
    } else if (to.meta.requiresGuest && !authUser) {
      next();
      // router.go(-1);
    }

    // if (to.meta.requiresGuest && authUser) {
    //   const requiresRole = to.matched.some((record) => record.meta.requiresRole);
    //   if (requiresRole && authUser.userType !== requiresRole) {
    //     next("/error-component");
    //   } else {
    //     next();
    //   }
    // return {
    //   name: "Home",
    // };
  }
  //   // const requiresRole = to.matched.some((record) => record.meta.requiresRole);
  //   // if (requiresRole && authUser.userType != requiresRole) {
  //   //   next("/error-component");
  //   // } else {
  //   //   next();
  //   // }

  //   return {
  //     name: 'Home'
  //   }
  // }
  // else{
  //   // else if (to.meta.requiresAuth && !authUser) {
  //     // return {
  //   //   name: "Login",
  //   // };
  //   next("/login");
  // }
  //  else {
  //   return {
  //     name: "Home",
  //   };
  // }
  // }
);
export default router;
