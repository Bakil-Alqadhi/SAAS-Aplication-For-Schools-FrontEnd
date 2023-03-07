import { createStore } from "vuex";
import axios from "axios";
import router from "../router/index";
import { ref } from "vue";

export const storeDataSchools = new createStore({
  router,
  state: {
    schools: [],
    school: {},
    errors: {},
    waitingStudents: [],
    waitingTeachers: [],
    countNotifications: 0,
  },
  getters: {
    schools: (state) => state.schools,
    school: (state) => state.school,
    errors: (state) => state.errors,
    waitingStudents: (state) => state.waitingStudents,
    waitingTeachers: (state) => state.waitingTeachers,
    countNotifications: (state) => state.countNotifications,
  },
  mutations: {
    //set waiting data
    setWaitingData: (state, data) => {
      state.waitingStudents = data.students;
      state.waitingTeachers = data.teachers;
      state.countNotifications = data.students.length + data.teachers.length;
    },
    //set schools data
    setSchools: (state, data) => {
      state.schools = data;
    },

    //set one school
    setOneSchool: (state, data) => {
      state.school = data;
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

    //fetch all the schools
    fetchSchools: async (context) => {
      await axios
        .get("api/schools")
        .then((response) => {
          context.commit("setSchools", response.data);
          // console.log(response.data);
        })
        .catch((error) => console.log(error));
    },
    fetchOneSchool: async (context, id) => {
      await axios
        .get("api/schools/" + id)
        .then((response) => {
          // console.log(response.data.school);
          context.commit("setOneSchool", response.data);
        })
        .catch((error) => console.log(error));
    },

    //login
    handleSchoolLogin: async (context, payload) => {
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
          // context.commit("setAuthStatus", response.data.status);
          router.push("/login");
        })
        .catch((error) => {
          if (error.response.status === 422) {
            context.commit("setErrors", error.response.data.errors);
          }
          console.log(error.response.data.errors);
        });
    },

    //get waiting data
    getWaitingRequests: async (context, school_id) => {
      await context.dispatch("getToken");
      await axios
        .get("/api/waiting/" + school_id)
        .then((response) => {
          context.commit("setWaitingData", response.data);
          // console.log("students => " + response);
          // console.log(response.data.students);
          // console.log(response.data.teachers);
        })
        .catch((error) => console.log(error));
    },

    //accept new member
    acceptNewMember: async (context, payload) => {
      await context.dispatch("getToken");
      await axios
        .post("/api/acceptNewMember", {
          school_id: payload.school_id,
          typeMember: payload.typeMember,
          member_id: payload.member_id,
        })
        .then((response) => {
          // console.log(response);
          context.dispatch("getWaitingRequests", payload.school_id);
          router.push("/dashboard");
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
