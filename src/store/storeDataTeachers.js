import { createStore } from "vuex";
import axios from "axios";
import router from "../router/index";
import { data } from "autoprefixer";

export const storeDataTeachers = new createStore({
  router,
  state: {
    teachers: [],
    teacher: {},
    errors: {},
    message: null,
    deleteMessage: null,
    questions: {},
    question: {},
    degrees: {},
  },
  getters: {
    teachers: (state) => state.teachers,
    teacher: (state) => state.teacher,
    errors: (state) => state.errors,
    message: (state) => state.message,
    deleteMessage: (state) => state.deleteMessage,
    questions: (state) => state.questions,
    question: (state) => state.question,
    degrees: (state) => state.degrees,
  },
  mutations: {
    //set all degrees
    setDegrees: (state, data) => {
      state.degrees = data;
    },
    //set  all questions
    setQuestions: (state, data) => {
      state.questions = data;
    },
    //set  one question
    setQuestion: (state, data) => {
      state.question = data;
    },

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
    //Start Questions
    //fetching all exams
    fetchQuestions: async (context, id) => {
      await axios
        .get("/teacher/quizzes/" + id + "/questions")
        .then((response) => {
          context.commit("setQuestions", response.data.data);
          // console.log(response.data.data);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    },
    //getting one question's data
    fetchOneQuestion: async (context, payload) => {
      await axios
        .get(
          "/teacher/quizzes/" + payload.quiz + "/questions/" + payload.question
        )
        .then((response) => {
          context.commit("setQuestion", response.data.data);
          // console.log(response.data.data);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    },
    //handle Create Questions
    handleCreateQuestion: async (context, payload) => {
      await context.dispatch("getToken");
      axios
        .post("/teacher/quizzes/" + payload.quiz + "/questions", payload)
        .then((response) => {
          console.log(response.data);
          context.dispatch("setMessage", response.data.message);
          router.push({
            name: "IndexQuestionsTeacher",
            params: { id: payload.quiz },
          });
        })
        .catch((error) => {
          if (error.response.status === 422) {
            context.commit("setErrors", error.response.data.errors);
          }
          console.log(error.response.data);
        });
    },
    //handle update Question
    handleUpdateQuestion: async (context, payload) => {
      await context.dispatch("getToken");
      axios
        .put(
          "/teacher/quizzes/" + payload.quiz_id + "/questions/" + payload.id,
          payload
        )
        .then((response) => {
          // console.log(response.data);
          context.dispatch("setMessage", response.data.message);
          router.push({
            name: "IndexQuestionsTeacher",
            params: { id: payload.quiz_id },
          });
        })
        .catch((error) => {
          if (error.response.status === 422) {
            context.commit("setErrors", error.response.data.errors);
          }
          console.log(error.response.data);
        });
    },

    //delete Question
    handleDeleteQuestion: async (context, payload) => {
      // await context.dispatch("getToken");
      await axios
        .delete("/teacher/quizzes/" + payload.quiz + "/questions/" + payload.id)
        .then((response) => {
          context.dispatch("setDeleteMessage", response.data.message);
          context.dispatch("fetchQuestions", payload.quiz);
        })
        .catch((error) => {
          console.log(error.response.data.errors);
        });
    },
    //End Questions
    //getting degrees of students one section
    fetchQuizDegrees: async (context, id) => {
      await axios
        .get("/teacher/quizzes/" + id + "/degrees")
        .then((response) => {
          context.commit("setDegrees", response.data.data);
          // console.log(response.data.data);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    },
  },
});
