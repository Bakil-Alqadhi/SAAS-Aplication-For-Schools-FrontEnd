import { createStore } from "vuex";
import axios from "axios";
import router from "../router/index";

export const storeAuthUser = new createStore({
  router,
  state: {
    authUser: null,
    errors: {},
    authStatus: null,
    school_id: null,
    guard: null,
  },
  getters: {
    user: (state) => state.authUser,
    errors: (state) => state.errors,
    authStatus: (state) => state.authStatus,
    school_id: (state) => state.school_id,
    guard: (state) => state.guard,
  },
  mutations: {
    //getting auth user
    getUser: async (state, guard = "web", school_id = null) => {
      // const axiosInstance = axios.create({
      //   withCredentials: true,
      //   // ...
      // });
      // await axiosInstance
      //   .get("/api/user", {
      //     headers: {
      //       Authorization: guard,
      //       "X-School-Id": school_id,
      //     },
      //   })
      //   .then((response) => {
      //     state.authUser = response.data;
      //     state.school_id = school_id;
      //     state.guard = guard;
      //   })
      //   .catch((error) => console.log(error));
      // try {
      //   const response = null;
      //   if (!school_id || !guard) {
      //     response = await axios.get("/api/user");
      //   } else {
      //     response = await axios.get("/" + guard + "/user/" + school_id);
      //   }
      //   if (response) {
      //     console.log("Response getting use after login=>" + response);
      //     state.authUser = response.data;
      //     state.school_id = school_id;
      //     state.guard = guard;
      //   }
      // } catch (error) {
      //   console.log(error);
      // }
      /////////
      // if (school_id && guard) {
      //   await axios
      //     .get("/" + guard + "/user/" + school_id)
      //     .then((response) => {
      //       // state.authUser = response.data;
      //       // state.school_id = school_id;
      //       state.authUser = response.data;
      //     })
      //     .catch((error) => console.log(error));
      // } else {
      await axios
        .get("/api/user")
        .then((response) => {
          // state.authUser = response.data;
          // state.school_id = school_id;
          state.authUser = response.data;
          state.school_id = school_id;
          state.guard = guard;
        })
        .catch((error) => console.log(error));
      // }
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

    //set school id for auth student or teacher
    setSchoolId: (state, school_id) => {
      state.school_id = school_id;
    },
  },
  actions: {
    //get Token
    getToken: async () => {
      await axios.get("/sanctum/csrf-cookie");
    },

    //handle School Id
    handleSchoolId: (context, school_id) => {
      context.commit("setSchoolId", school_id);
    },

    resetAuthStatus: (context) => {
      setTimeout(() => {
        context.commit("setAuthStatus", null);
      }, 10000);
    },

    //getting user's data
    getUser: async (context, guard = "api", school_id = null) => {
      await context.dispatch("getToken");
      await context.commit("getUser", guard, school_id);
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
        .post("/register", {
          name: payload.name,
          email: payload.email,
          password: payload.password,
          password_confirmation: payload.password_confirmation,
        })
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
    handleLogout: async (context, userTyp = null, school_id = null) => {
      // try {
      //   const response = "";
      //   if (userType == "director") {
      //     response = await axios.post("/logout");
      //   } else if (userType == "teacher") {
      //     response = await axios.post("teacher/logout", {
      //       school_id: school_id,
      //     });
      //   } else if (userType == "student") {
      //     response = await axios.post("student/logout", {
      //       school_id: school_id,
      //     });
      //   }
      //   if (response) {
      //     context.commit("resetAuthUser");
      //     console.log("loggedOUT");
      //     router.push("/");
      //   }
      // } catch (error) {
      //   console.log(error);
      // }
      await axios
        .post("/logout")
        .then(() => {
          context.commit("resetAuthUser");
          router.push("/login");
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
