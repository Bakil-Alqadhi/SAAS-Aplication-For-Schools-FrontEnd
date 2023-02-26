import { createStore } from "vuex";
import axios from "axios";
import router from "../router/index";
import { ref } from "vue";

export const storeDataSchools = new createStore({
  router,
  state: {
    schools: [],
    school: {},
  },
  getters: {
    schools: (state) => state.schools,
    school: (state) => state.school,
  },
  mutations: {
    //set schools data
    setSchools: (state, data) => {
      state.schools = data;
    },

    //set one school
    setOneSchool: (state, data) => {
      state.school = data;
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
          console.log(response.data);
          context.commit("setOneSchool", response.data);
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
