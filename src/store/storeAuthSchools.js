import { createStore } from "vuex";
import axios from "axios";
import router from "../router/index";

export const storeAuthSchools = new createStore({
  router,
  state: {
    authUser: null,
    errors: {},
    authStatus: null,
  },
  getters: {
    user: (state) => state.authUser,
    errors: (state) => state.errors,
    authStatus: (state) => state.authStatus,
  },
  mutations: {
    //getting auth user
    getUser: async (state) => {
      await axios
        .get("/api/user")
        .then((response) => (state.authUser = response.data))
        .catch((error) => console.log(error.response));
    },

    //setting errors
    setErrors: (state, errors) => {
      state.errors = errors;
    },

    //reset authUser state
    resetAuthUser: (state) => {
      state.authUser = null;
    },
    //setAuthStatus Message
    setAuthStatus: (state, status) => {
      state.authStatus = status;
    },
  },
  actions: {
    //get Token
    getToken: async () => {
      await axios.get("/sanctum/csrf-cookie");
    },

    resetAuthStatus: (context) => {
      setTimeout(() => {
        context.commit("setAuthStatus", null);
      }, 10000);
    },

    //getting user's data
    getUser: async (context) => {
      await context.dispatch("getToken");
      await context.commit("getUser");
    },

    //login
    handleLogin: async (context, payload) => {
      await context.dispatch("getToken");
      await axios
        .post("/login", {
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

    //register
    handleRegister: async (context, payload) => {
      await context.dispatch("getToken");
      await axios
        .post(
          "/register",
          {
            name: payload.name,
            school_name: payload.school_name,
            about_school: payload.about_school,
            about_director: payload.about_director,
            school_image: payload.school_image,
            director_image: payload.director_image,
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
          context.commit("setAuthStatus", response.data.status);
          router.push("/login");
        })
        .catch((error) => {
          if (error.response.status === 422) {
            context.commit("setErrors", error.response.data.errors);
          }
          console.log(error.response.data.errors);
        });
    },

    //logout
    async handleLogout(context, commit) {
      await axios
        .post("/logout")
        .then(() => {
          context.commit("resetAuthUser");
          router.push("/");
        })
        .catch((error) => console.log(error.response));
    },

    //forgot password
    async handleForgotPassword(context, payload) {
      await context.dispatch("getToken");
      await axios
        .post("/forgot-password", { email: payload.email })
        .then((response) => {
          context.commit("setAuthStatus", response.data.status);
          // context.dispatch("resetAuthStatus");
          // console.log(response);
        })
        .catch((error) => {
          if (error.response.status === 422) {
            context.commit("setErrors", error.response.data.errors);
          }
          console.log(error.response.data.errors);
        });
    },

    //reset password
    async handleResetPassword(context, payload) {
      await axios
        .post("/reset-password", {
          email: payload.email,
          token: payload.token,
          password: payload.password,
          password_confirmation: payload.password_confirmation,
        })
        .then((response) => {
          context.commit("setAuthStatus", response.data.status);
          // context.dispatch("resetAuthStatus");
          router.push({ name: "Login" });
        })
        .catch((error) => {
          if (error.response.status === 422) {
            context.commit("setErrors", error.response.data.errors);
          } else {
            console.log(error.response.data.errors);
          }
        });
    },
  },
});
