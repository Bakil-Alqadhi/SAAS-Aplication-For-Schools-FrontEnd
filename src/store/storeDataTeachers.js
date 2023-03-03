import { createStore } from "vuex";
import axios from "axios";
import router from "../router/index";
import { ref } from "vue";

export const storeDataTeachers = new createStore({
  router,
  state: {
    teachers: [],
    teacher: {},
  },
  getters: {
    teachers: (state) => state.teachers,
    teacher: (state) => state.teacher,
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
  },
  actions: {
    //get Token
    getToken: async () => {
      await axios.get("/sanctum/csrf-cookie");
    },

    //fetch all the schools
    fetchTeachers: async (context, db) => {
      await axios
        .get("api/schools/" + db + "/teachers")
        .then((response) => {
          context.commit("setTeachers", response.data.data);
          console.log(response);
        })
        .catch((error) => console.log(error));
    },
    fetchOneTeacher: async (context, payload) => {
      await axios
        .get("api/schools/" + payload.school + "/teachers/" + payload.teacher)
        .then((response) => {
          console.log(response.data);
          context.commit("setOneTeacher", response.data);
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
