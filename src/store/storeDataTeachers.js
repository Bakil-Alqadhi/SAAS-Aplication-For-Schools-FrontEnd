import { createStore } from "vuex";
import axios from "axios";
import router from "../router/index";

export const storeDataTeachers = new createStore({
  router,
  state: {
    teachers: [],
    teacher: [],
    errors: {},
  },
  getters: {
    teachers: (state) => state.teachers,
    teacher: (state) => state.teacher,
    errors: (state) => state.errors,
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
          //Set the Authorization header for all future requests
          // axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          // axios.defaults.headers.common["X-School"] = payload.school_id;
          // axios.defaults.headers.common["X-Sanctum-Guard"] = "teacher";
          router.push("/dashboard");
        })
        .catch((error) => {
          if (error.response.status === 422) {
            context.commit("setErrors", error.response.data.errors);
          }
          console.log(error.response.data.errors);
        });
    },

    //fetch all the schools
    fetchTeachers: async (context) => {
      // await context.dispatch("getToken");
      await axios
        .get("api/teachers")
        .then((response) => {
          context.commit("setTeachers", response.data);
          // console.log(response.data);
        })
        .catch((error) => console.log(error));
    },
    fetchOneTeacher: async (context, payload) => {
      await axios
        .get("api/teachers/" + payload.teacher)
        .then((response) => {
          console.log(response.data);
          context.commit("setOneTeacher", response.data);
        })
        .catch((error) => console.log(error));
    },

    //teacher register
    handleTeacherRegister: async (context, payload) => {
      await context.dispatch("getToken");
      await axios
        .post(
          "/teacher/register",
          {
            school_id: payload.school_id,
            first_name: payload.first_name,
            last_name: payload.last_name,
            about: payload.about,
            image_path: payload.image_path,
            address: payload.address,
            phone: payload.phone,
            email: payload.email,
            password: payload.password,
            password_confirmation: payload.password_confirmation,
          },
          {
            headers: {
              "content-type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          // context.commit("setAuthStatus", response.data.status);
          router.push("/");
        })
        .catch((error) => {
          if (error.response.status === 422) {
            context.commit("setErrors", error.response.data.errors);
          }
          console.log(error.response.data.errors);
        });
    },

    //show details school
    // showSchool: async (context, id) => {
    //   await context.dispatch("getToken");
    //   //   await
    // },
  },
});
