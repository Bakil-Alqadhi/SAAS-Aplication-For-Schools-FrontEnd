import { createStore } from "vuex";
import axios from "axios";
import router from "../router/index";
import { ref } from "vue";

export const storeDataStudents = new createStore({
  router,
  state: {
    students: [],
    student: [],
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

    //student register
    handleStudentRegister: async (context, payload) => {
      await context.dispatch("getToken");
      await axios
        .post("/student/register", {
          school_id: payload.school_id,
          student_first_name: payload.student_first_name,
          student_middle_name: payload.student_middle_name,
          student_last_name: payload.student_last_name,
          parent_first_name: payload.parent_first_name,
          parent_last_name: payload.parent_last_name,
          birthday: payload.birthday,
          sex: payload.sex,
          image_path: payload.image_path,
          student_address: payload.student_address,
          student_phone: payload.student_phone,
          parent_phone: payload.parent_phone,
          student_email: payload.student_email,
          parent_email: payload.parent_email,
          password: payload.password,
          password_confirmation: payload.password_confirmation,
        })
        .then((response) => {
          // context.commit("setAuthStatus", response.data.status);
          console.log("student registrated");
          router.push("/");
        })
        .catch((error) => {
          console.log("student is not registrated");
          if (error.response.status === 422) {
            context.commit("setErrors", error.response.data.errors);
          }
          console.log(error.response.data.errors);
        });
    },

    //fetch all the schools
    fetchStudents: async (context, db) => {
      await context.dispatch("getToken");
      await axios
        .get("api/schools/" + db + "/students")
        .then((response) => {
          context.commit("setStudents", response.data);
          // console.log(response);
        })
        .catch((error) => console.log(error));
    },

    //fetch one student
    fetchOneStudent: async (context, payload) => {
      await context.dispatch("getToken");
      await axios
        .get("api/schools/" + payload.school + "/students/" + payload.student)
        .then((response) => {
          // console.log(response.data);
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
