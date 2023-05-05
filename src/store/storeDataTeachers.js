import { createStore } from "vuex";
import axios from "axios";
import router from "../router/index";

export const storeDataTeachers = new createStore({
  router,
  state: {
    teachers: [],
    teacher: {},
    errors: {},
    message: null,
    deleteMessage: null,
  },
  getters: {
    teachers: (state) => state.teachers,
    teacher: (state) => state.teacher,
    errors: (state) => state.errors,
    message: (state) => state.message,
    deleteMessage: (state) => state.deleteMessage,
  },
  mutations: {
    //set schools data
    setTeachers: (state, data) => {
      state.teachers = data;
    },

    //set one school
    setOneTeacher: (state, data) => {
      state.teacher = data;
    },

    //setting errors
    setErrors: (state, errors) => {
      state.errors = errors;
    },

    //setting message
    setMessage: (state, message) => {
      state.message = message;
    },
    setDeleteMessage: (state, message) => {
      state.deleteMessage = message;
    },
  },
  actions: {
    //get Token
    getToken: async () => {
      await axios.get("/sanctum/csrf-cookie");
    },

    //login teacher
    handleTeacherLogin: async (context, payload) => {
      await context.dispatch("getToken");
      await axios
        .post(
          "/login",
          {
            email: payload.email,
            password: payload.password,
          },
          {
            headers: {
              "X-Sanctum-Guard": "teacher",
              "X-School": payload.school_id,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          const token = response.data.token;

          localStorage.setItem("guard", "teacher");
          localStorage.setItem("school", payload.school_id);
          localStorage.setItem("token", token);
          router.push("/teacher/dashboard");
        })
        .catch((error) => {
          if (error.response.status === 422) {
            context.commit("setErrors", error.response.data.errors);
          }
          console.log(error.response.data.errors);
        });
    },
    //teacher register
    handleTeacherRegister: async (context, payload) => {
      await context.dispatch("getToken");
      await axios
        .post(
          "/api/register",
          {
            first_name: payload.first_name,
            last_name: payload.last_name,
            about: payload.about,
            image: payload.image,
            about: payload.about,
            // specialization: payload.specialization,
            address: payload.address,
            phone: payload.phone,
            email: payload.email,
            password: payload.password,
            password_confirmation: payload.password_confirmation,
          },
          {
            headers: {
              "X-Sanctum-Guard": "teacher",
              "X-School": payload.school_id,
            },
          }
        )
        .then((response) => {
          const token = response.data.data.token;
          localStorage.setItem("guard", "teacher");
          localStorage.setItem("school", payload.school_id);
          localStorage.setItem("token", token);
          // context.commit("setAuthStatus", response.data.status);
          // window.location.reload();
          setTimeout(() => {
            location.reload();
          }, 1000);
          router.push("/teacher/dashboard");
          // router.go(router.push("/teacher/dashboard"));
        })
        .catch((error) => {
          if (error.response.status === 422) {
            context.commit("setErrors", error.response.data.errors);
          }
          console.log(error.response.data.errors);
        });
    },

    //fetch all the teachers
    fetchTeachers: async (context) => {
      await axios
        .get("api/teachers")
        .then((response) => {
          context.commit("setTeachers", response.data.data);
          // console.log(response);
        })
        .catch((error) => console.log(error));
    },
    //fetch one teacher
    fetchOneTeacher: async (context, id) => {
      await axios
        .get("api/teachers/" + id)
        .then((response) => {
          // console.log(response.data.data);
          context.commit("setOneTeacher", response.data.data);
        })
        .catch((error) => console.log(error));
    },
    //update profile teacher
    updateTeacher: async (context, payload) => {
      await context.dispatch("getToken");
      await axios
        .put("/api/teachers/" + payload.id, {
          first_name: payload.first_name,
          last_name: payload.last_name,
          about: payload.about,
          image: payload.image,
          phone: payload.phone,
          email: payload.email,
        })
        .then((response) => {
          context.commit("setMessage", response.data.message);
          setTimeout(() => {
            context.commit("setMessage", null);
          }, 4000);
          router.push("/teacher/dashboard");
          // console.log(response.data.message);
        })
        .catch((error) => {
          if (error.response.status === 422) {
            context.commit("setErrors", error.response.data.errors);
          }
          console.log(error.response.data.errors);
        });
    },
  },
});
