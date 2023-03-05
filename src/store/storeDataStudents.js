import { createStore } from "vuex";
import axios from "axios";
import router from "../router/index";
import { ref } from "vue";

export const storeDataStudents = new createStore({
  router,
  state: {
    students: [],
    student: {},
    errors: {},
  },
  getters: {
    students: (state) => state.students,
    student: (state) => state.student,
    errors: (state) => state.errors,
  },
  mutations: {
    //set schools data
    setStudents: (state, data) => {
      state.students = data;
    },

    //set one school
    setOneStudent: (state, data) => {
      state.student = data;
    },

    //setting errors
    setErrors: (state, errors) => {
      state.errors = errors;
    },
  },
  actions: {
    //get Token
    getToken: async () => {
      await axios.get("/sanctum/csrf-cookie");
    },

    //login teacher
    handleStudentLogin: async (context, payload) => {
      await context.dispatch("getToken"); //because I called it inside storeAuthUser in getUser from LoginView
      await axios
        .post("/student/login", {
          school: payload.school_id,
          email: payload.email,
          password: payload.password,
        })
        .then(() => {
          router.push("/");
        })
        .catch((error) => {
          if (error.response.status === 422) {
            context.commit("setErrors", error.response.data.errors);
          }
          console.log(error.response.data.errors);
        });
    },

    //fetch all the schools
    fetchStudents: async (context, db) => {
      await axios
        .get("api/schools/" + db + "/students")
        .then((response) => {
          context.commit("setStudents", response.data.data);
          console.log(response);
        })
        .catch((error) => console.log(error));
    },

    //fetch one student
    fetchOneStudent: async (context, payload) => {
      await axios
        .get("api/schools/" + payload.school + "/students/" + payload.teacher)
        .then((response) => {
          console.log(response.data);
          context.commit("setOneStudent", response.data);
        })
        .catch((error) => console.log(error));
    },

    //show details school
    // showSchool: async (context, id) => {
    //   await context.dispatch("getToken");
    //   //   await
    // },
  },
});
