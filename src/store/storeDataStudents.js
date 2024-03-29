import { createStore } from "vuex";
import axios from "axios";
import router from "../router/index";
import { ref } from "vue";

export const storeDataStudents = new createStore({
  router,
  state: {
    students: [],
    message: "",
    student: [],
    errors: null,
    attendances: {},
    exams: {},
    examQuestions: [],
  },
  getters: {
    students: (state) => state.students,
    student: (state) => state.student,
    errors: (state) => state.errors,
    message: (state) => state.message,
    attendances: (state) => state.attendances,
    exams: (state) => state.exams,
    examQuestions: (state) => state.examQuestions,
  },
  mutations: {
    //set exams
    setExams: (state, data) => {
      state.exams = data;
    },
    //set one exam
    setExamQuestions: (state, data) => {
      state.examQuestions = data;
    },
    setAttendanceReport: (state, data) => {
      state.attendances = data;
    },
    //set message
    setMessage: (state, data) => {
      state.message = data;
    },
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
        .post(
          "/login",
          {
            email: payload.email,
            password: payload.password,
          },
          {
            headers: {
              "X-Sanctum-Guard": "student",
              "X-School": payload.school_id,
            },
          }
        )
        .then((response) => {
          const token = response.data.token;

          // Store the token in local storage
          localStorage.setItem("guard", "student");
          localStorage.setItem("school", payload.school_id);
          localStorage.setItem("token", token);

          // Set the Authorization header for all future requests
          // axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          // axios.defaults.headers.common["X-School"] = payload.school_id;
          // axios.defaults.headers.common["X-Sanctum-Guard"] = "student";
          router.push("/student/dashboard");
        })
        .catch((error) => {
          // if (error.response.status === 422) {
          // context.commit("setErrors", error.response.data.errors);
          // }
          console.log(error.response);
        });
    },

    //student register
    handleStudentRegister: async (context, payload) => {
      await context.dispatch("getToken");
      await axios
        .post(
          "/api/register",
          {
            school_id: payload.school_id,
            grade: payload.grade,
            classroom: payload.classroom,
            student_first_name: payload.student_first_name,
            student_middle_name: payload.student_middle_name,
            student_last_name: payload.student_last_name,
            birthday: payload.birthday,
            sex: payload.sex,
            image: payload.image,
            student_address: payload.student_address,
            student_phone: payload.student_phone,
            student_email: payload.student_email,

            parent_first_name: payload.parent_first_name,
            parent_last_name: payload.parent_last_name,
            parent_phone: payload.parent_phone,
            parent_email: payload.parent_email,
            password: payload.password,
            password_confirmation: payload.password_confirmation,
          },
          {
            headers: {
              "X-Sanctum-Guard": "student",
              "X-School": payload.school_id,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          // const token = response.data.data.token;
          localStorage.setItem("guard", "student");
          localStorage.setItem("school", payload.school_id);
          localStorage.setItem("token", token);
          console.log(response.data);
          // context.commit("setAuthStatus", response.data.status);
          // window.location.reload();
          // setTimeout(() => {
          //   location.reload();
          // }, 1000);
          // //remove session
          sessionStorage.removeItem("student_data");
          sessionStorage.removeItem("parent_data");
          router.push("/");
        })
        .catch((error) => {
          console.log("student is not registrated");
          if (error.response.status === 422) {
            context.commit("setErrors", error.response.data.errors);
          }
          console.log(error.response);
        });
    },

    //fetch all the schools
    fetchStudents: async (context) => {
      await axios
        .get("api/students")
        .then((response) => {
          context.commit("setStudents", response.data.data);
          // console.log(response);
        })
        .catch((error) => console.log(error));
    },
    // fetch students a specific classroom using section_id to add them to this section
    fetchOneSectionStudents: async (context, id) => {
      await axios
        .get("/api/classrooms/" + id + "/students/")
        .then((response) => {
          context.commit("setStudents", response.data.data);
          console.log(response.data.data);
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
    //fetch students of one section
    fetchStudentsOfSection: async (context, id) => {
      await axios
        .get("api/sections/" + id + "/students")
        .then((response) => {
          context.commit("setStudents", response.data.data);
          console.log(response.data);
        })
        .catch((error) => console.log(error));
    },
    //fetch one student
    fetchOneStudent: async (context, payload) => {
      await axios
        .get("api/students/" + payload.student)
        .then((response) => {
          // console.log(response.data);
          context.commit("setOneStudent", response.data.data);
        })
        .catch((error) => console.log(error));
    },
    //update student
    handleUpdateStudent: async (context, payload) => {
      await context.dispatch("getToken");
      await axios
        .put("/api/students/" + payload.id, {
          school_id: payload.school,
          student_first_name: payload.student_first_name,
          student_middle_name: payload.student_middle_name,
          student_last_name: payload.student_last_name,
          parent_first_name: payload.parent_first_name,
          parent_last_name: payload.parent_last_name,
          birthday: payload.birthday,
          sex: payload.sex,
          image: payload.image,
          address: payload.address,
          student_address: payload.student_address,
          student_phone: payload.student_phone,
          parent_phone: payload.parent_phone,
          student_email: payload.student_email,
          parent_email: payload.parent_email,
        })
        .then((response) => {
          context.commit("setMessage", response.data.message);
          router.push("/student/dashboard");
        })
        .catch((error) => {
          if (error.response.status === 422) {
            context.commit("setErrors", error.response.data.errors);
          }
          console.log(error.response.data.errors);
        });
    },
    handleDeleteStudent: async (context, id) => {
      // await context.dispatch("getToken");
      await axios
        .delete("/api/students/" + id)
        .then((response) => {
          localStorage.removeItem("school_name"),
            localStorage.removeItem("school"),
            localStorage.removeItem("guard"),
            localStorage.removeItem("token"),
            router.push("/");
          location.reload();
        })
        .catch((error) => {
          console.log(error.response.data.errors);
        });
    },
    //Start work with attendances
    handleStoreAttendance: async (context, payload) => {
      await context.dispatch("getToken");
      await axios
        .post("/api/sections/" + payload.section_id + "/students/attendance", {
          attendance: payload.attendance,
          section_id: payload.section_id,
        })
        .then((response) => {
          context.dispatch("setMessage", response.data.message);
          router.push("/");
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error.response.data.errors);
        });
    },
    //Getting AttendanceReport
    handleAttendanceReport: async (context, payload) => {
      await context.dispatch("getToken");
      await axios
        .post("/api/attendance/report", payload)
        .then((response) => {
          context.commit("setAttendanceReport", response.data.data);
          context.commit("setErrors", null);
          // router.push("/");
          console.log(response.data);
        })
        .catch((error) => {
          if (error.response.status === 422) {
            context.commit("setErrors", error.response.data.errors);
          }
          console.log(error.response.data);
        });
    },
    //fetch student's exams
    fetchExams: async (context) => {
      await axios
        .get("api/exams")
        .then((response) => {
          context.commit("setExams", response.data.data);
          // console.log(response.data.data);
        })
        .catch((error) => console.log(error));
    },
    //fetch questions exam
    fetchOneExam: async (context, id) => {
      await axios
        .get("api/exams/" + id)
        .then((response) => {
          context.commit("setExamQuestions", response.data.data);
          // console.log(response.data.data);
        })
        .catch((error) => {
          router.push("/exams");
          console.log(error);
        });
    },
    //handle Store Answers
    handleStoreAnswers: async (context, payload) => {
      await context.dispatch("getToken");
      axios
        .post("api/exams", payload)
        .then((response) => {
          console.log(response.data);
          context.dispatch("setMessage", response.data.message);
          router.push("/exams");
        })
        .catch((error) => {
          if (error.response.status === 422) {
            context.commit("setErrors", error.response.data.errors);
          }
          console.log(error.response.data);
        });
    },

    //get group's students
    fetchGroupStudents: async (context) => {
      await axios
        .get("api/students/group")
        .then((response) => {
          console.log(response.data.data);
          context.commit("setStudents", response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //End work with attendances
    setMessage: (context, message) => {
      context.commit("setMessage", message);
      setTimeout(() => {
        context.commit("setMessage", null);
      }, 4000);
    },
  },
});
