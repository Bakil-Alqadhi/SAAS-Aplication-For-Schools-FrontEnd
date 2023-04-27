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
    grades: {},
    grade: {},
    gradeMessage: null,
    classrooms: {},
    classroom: {},
    sections: {},
    section: {},
    specializations: {},
  },
  getters: {
    schools: (state) => state.schools,
    school: (state) => state.school,
    errors: (state) => state.errors,
    waitingStudents: (state) => state.waitingStudents,
    waitingTeachers: (state) => state.waitingTeachers,
    countNotifications: (state) => state.countNotifications,
    grades: (state) => state.grades,
    grade: (state) => state.grade,
    gradeMessage: (state) => state.gradeMessage,
    classrooms: (state) => state.classrooms,
    classroom: (state) => state.classroom,
    sections: (state) => state.sections,
    section: (state) => state.section,
    specializations: (state) => state.specializations,
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

    //startGrades
    setGrades: (state, data) => {
      state.grades = data;
    },
    setGrade: (state, data) => {
      state.grade = data;
    },
    setGradeMessage: (state, data) => {
      state.gradeMessage = data;
    },
    //endGrades
    //start classrooms
    setClassrooms: (state, data) => {
      state.classrooms = data;
    },
    setClassroom: (state, data) => {
      state.classroom = data;
    },
    //end classrooms
    //Start Sections
    setSections: (state, data) => {
      state.sections = data;
    },
    setSection: (state, data) => {
      state.section = data;
    },
    //End Sections
    //Start specializations
    setSpecializations: (state, data) => {
      state.specializations = data;
    },
    //End specializations
  },
  actions: {
    //get Token
    getToken: async () => {
      await axios.get("/sanctum/csrf-cookie");
    },

    // Start specializations
    fetchSpecializations: async (context) => {
      await axios
        .get("/api/specializations")
        .then((response) => {
          // console.log(response.data);
          context.commit("setSpecializations", response.data);
        })
        .catch((error) => console.log(error));
    },
    //End specializations

    //fetch all the schools
    fetchSchools: async (context) => {
      await axios
        .get("/api/schools")
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
        .post(
          "/login",
          {
            email: payload.email,
            password: payload.password,
            // userType: "director",
          },
          {
            headers: {
              "X-Sanctum-Guard": "director",
            },
          }
        )
        .then((response) => {
          const token = response.data.token;

          localStorage.setItem("guard", "director");
          localStorage.setItem("school", response.data.user.id);
          localStorage.setItem("token", token);
          // Set the Authorization header for all future requests
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          axios.defaults.headers.common["X-Sanctum-Guard"] = "director";
          router.push("/dashboard");
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
    getWaitingRequests: async (context) => {
      // await context.dispatch("getToken");
      await axios
        .get("/api/waiting")
        .then((response) => {
          context.commit("setWaitingData", response.data.data);
          console.log(response.data.data);
        })
        .catch((error) => console.log(error));
    },

    //accept new member
    acceptNewMember: async (context, payload) => {
      await context.dispatch("getToken");
      await axios
        .post("/api/acceptNewMember/" + payload.member_id, {
          userType: payload.userType,
        })
        .then((response) => {
          // context.dispatch("getWaitingRequests", payload.school_id);
          router.push("/dashboard");
        })
        .catch((error) => console.log(error));
    },
    //show details school
    // showSchool: async (context, id) => {
    //   await context.dispatch("getToken");
    //   //   await
    // },
    //Start grades
    fetchGrades: async (context) => {
      await axios
        .get("/api/grades/index")
        .then((response) => {
          context.commit("setGrades", response.data);
        })
        .catch((error) => {
          console.log(error.response.data.errors);
        });
    },

    //fetch grade's data
    fetchGradesData: async (context) => {
      await axios
        .get("/api/grades/data")
        .then((response) => {
          context.commit("setGrades", response.data);
          console.log(response.data.data);
        })
        .catch((error) => {
          console.log(error.response.data.errors);
        });
    },
    //fetching one grade
    fetchOneGrade: async (context, id) => {
      await axios
        .get("/api/grades/" + id)
        .then((response) => {
          context.commit("setGrade", response.data);
        })
        .catch((error) => {
          console.log(error.response.data.errors);
        });
    },
    createGrade: async (context, payload) => {
      await context.dispatch("getToken");
      await axios
        .post("/api/grades", {
          name: payload.name,
          number: payload.number,
        })
        .then((response) => {
          context.commit("setGradeMessage", response.data.message);
          setTimeout(() => {
            context.commit("setGradeMessage", null);
          }, 4000);
          router.push("/grades");
          // console.log(response.data.message);
        })
        .catch((error) => {
          if (error.response.status === 422) {
            context.commit("setErrors", error.response.data.errors);
          }
          console.log(error.response.data.errors);
        });
    },
    updateGrade: async (context, payload) => {
      await context.dispatch("getToken");
      await axios
        .put("/api/grades/" + payload.id, {
          name: payload.name,
          number: payload.number,
        })
        .then((response) => {
          context.commit("setGradeMessage", response.data.message);
          setTimeout(() => {
            context.commit("setGradeMessage", null);
          }, 4000);
          router.push("/grades");
          // console.log(response.data.message);
        })
        .catch((error) => {
          if (error.response.status === 422) {
            context.commit("setErrors", error.response.data.errors);
          }
          console.log(error.response.data.errors);
        });
    },
    deleteGrade: async (context, id) => {
      // await context.dispatch("getToken");
      await axios
        .delete("/api/grades/" + id)
        .then((response) => {
          context.commit("setGradeMessage", response.data.message);
          setTimeout(() => {
            context.commit("setGradeMessage", null);
          }, 4000);
          context.dispatch("fetchGrades");
        })
        .catch((error) => {
          console.log(error.response.data.errors);
        });
    },
    //end grades
    //Start Classrooms
    createClassroom: async (context, payload) => {
      await context.dispatch("getToken");
      await axios
        .post("/api/classrooms", payload)
        .then((response) => {
          // context.commit("setGradeMessage", response.data.message);
          localStorage.removeItem("classrooms");
          context.commit("setGradeMessage", response.data.message);
          setTimeout(() => {
            context.commit("setGradeMessage", null);
          }, 4000);
          router.push("/classrooms/index");
          console.log(response.data);
        })
        .catch((error) => {
          if (error.response.status === 422) {
            context.commit("setErrors", error.response.data.errors);
          }
          console.log(error.response.data.errors);
        });
    },

    fetchClassrooms: async (context) => {
      await axios
        .get("/api/classrooms")
        .then((response) => {
          context.commit("setClassrooms", response.data.data);
        })
        .catch((error) => {
          console.log(error.response.data.errors);
        });
    },
    //fetching one grade
    fetchOneClassroom: async (context, id) => {
      await axios
        .get("/api/classrooms/" + id)
        .then((response) => {
          context.commit("setClassroom", response.data.data);
          // router.push("/classrooms/index");
        })
        .catch((error) => {
          console.log(error.response.data.errors);
        });
    },
    //update classroom
    updateClassroom: async (context, payload) => {
      await context.dispatch("getToken");
      await axios
        .put("/api/classrooms/" + payload.id, {
          name: payload.name,
          grade: payload.grade,
        })
        .then((response) => {
          context.commit("setGradeMessage", response.data.message);
          setTimeout(() => {
            context.commit("setGradeMessage", null);
          }, 4000);
          router.push("/classrooms/index");
          // console.log(response.data);
        })
        .catch((error) => {
          if (error.response.status === 422) {
            context.commit("setErrors", error.response.data.errors);
          }
          console.log(error.response.data.errors);
        });
    },
    deleteClassroom: async (context, id) => {
      // await context.dispatch("getToken");
      await axios
        .delete("/api/classrooms/" + id)
        .then((response) => {
          context.commit("setGradeMessage", response.data.data.message);
          setTimeout(() => {
            context.commit("setGradeMessage", null);
          }, 4000);
          context.dispatch("fetchClassrooms");
        })
        .catch((error) => {
          console.log(error.response.data.data.errors);
        });
    },
    //End Classrooms
    //Start Sections
    //create Section
    createSection: async (context, payload) => {
      await context.dispatch("getToken");
      axios
        .post("/api/sections/create", {
          name: payload.name,
          grade: payload.grade,
          classroom: payload.classroom,
          teachers: payload.teachers,
        })
        .then((response) => {
          context.commit("setGradeMessage", response.data.message);
          setTimeout(() => {
            context.commit("setGradeMessage", null);
          }, 4000);
          router.push("/classrooms/index");
        })
        .catch((error) => {
          if (error.response.status === 422) {
            context.commit("setErrors", error.response.data.errors);
          }
          console.log(error.response.data.errors);
        });
    },
    //fetching all sections
    fetchSections: async (context) => {
      await axios
        .get("/api/sections")
        .then((response) => {
          context.commit("setSections", response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error.response.data.errors);
        });
    },
    fetchOneSection: async (context, id) => {
      await axios
        .get("/api/sections/" + id)
        .then((response) => {
          context.commit("setSection", response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error.response.data.errors);
        });
    },
    //update Section
    updateSection: async (context, payload) => {
      await context.dispatch("getToken");
      await axios
        .put("/api/sections/" + payload.id, {
          name: payload.name,
          grade: payload.grade,
          classroom: payload.classroom,
          teachers: payload.teachers,
        })
        .then((response) => {
          context.commit("setGradeMessage", response.data.message);
          setTimeout(() => {
            context.commit("setGradeMessage", null);
          }, 4000);
          router.push("/sections/index");
          // console.log(response.data);
        })
        .catch((error) => {
          if (error.response.status === 422) {
            context.commit("setErrors", error.response.data.errors);
          }
          console.log(error.response.data.errors);
        });
    },
    deleteSection: async (context, id) => {
      // await context.dispatch("getToken");
      await axios
        .delete("/api/sections/" + id)
        .then((response) => {
          context.commit("setGradeMessage", response.data.message);
          setTimeout(() => {
            context.commit("setGradeMessage", null);
          }, 4000);
          context.dispatch("fetchSections");
        })
        .catch((error) => {
          console.log(error.response.data.errors);
        });
    },
    //End Sections
  },
});
