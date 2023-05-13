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
    message: null,
    deleteMessage: null,
    classrooms: {},
    classroom: {},
    sections: {},
    section: {},
    specializations: {},
    promotions: {},
    graduates: {},
    subjects: {},
    subject: {},
    exams: {},
    exam: {},
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
    message: (state) => state.message,
    deleteMessage: (state) => state.deleteMessage,
    classrooms: (state) => state.classrooms,
    classroom: (state) => state.classroom,
    sections: (state) => state.sections,
    section: (state) => state.section,
    specializations: (state) => state.specializations,
    promotions: (state) => state.promotions,
    graduates: (state) => state.graduates,
    subjects: (state) => state.subjects,
    subject: (state) => state.subject,
    exams: (state) => state.exams,
    exam: (state) => state.exam,
  },
  mutations: {
    //set all subjects
    setExams: (state, data) => {
      state.exams = data;
    },
    //set one subject
    setExam: (state, data) => {
      state.exam = data;
    },
    //set all subjects
    setSubjects: (state, data) => {
      state.subjects = data;
    },
    //set one subject
    setSubject: (state, data) => {
      state.subject = data;
    },
    //set all graduates
    setGraduates: (state, data) => {
      state.graduates = data;
    },
    //set all promotions
    setPromotions: (state, data) => {
      state.promotions = data;
    },
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
    setMessage: (state, data) => {
      state.message = data;
    },
    setDeleteMessage: (state, data) => {
      state.deleteMessage = data;
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
          // console.log(response.data);
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
          context.dispatch("setMessage", response.data.message);
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
          context.dispatch("setMessage", response.data.message);
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
          context.dispatch("setDeleteMessage", response.data.message);
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
          context.dispatch("setMessage", response.data.message);
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
          context.dispatch("fetchClassrooms");
          context.dispatch("setDeleteMessage", response.data.message);
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
          context.dispatch("setMessage", response.data.message);
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
          // console.log(response.data);
        })
        .catch((error) => {
          console.log(error.response.data.errors);
        });
    },
    //
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
    //add students to the section
    addStudentsToSection: async (context, payload) => {
      await context.dispatch("getToken");
      await axios
        .post("/api/sections/add/students/to/" + payload.section, {
          students: payload.students,
        })
        .then((response) => {
          router.go(-1);
          // console.log(response.data);
        })
        .catch((error) => {
          console.log(error.response.data.errors);
        });
    },
    //handel fetching sections of teacher
    fetchTeacherSection: async (context) => {
      await axios
        .get("/api/teacher/sections")
        .then((response) => {
          context.commit("setSections", response.data.data);
          console.log(response);
        })
        .catch((error) => {
          console.log(error.response.data.errors);
        });
    },

    //fetching all promotions
    fetchPromotions: async (context) => {
      await axios
        .get("/api/promotions")
        .then((response) => {
          context.commit("setPromotions", response.data.data);
          console.log(response.data.data);
        })
        .catch((error) => {
          console.log(error.response.data.errors);
        });
    },
    //create promotion
    handleCreatePromotion: async (context, payload) => {
      await context.dispatch("getToken");
      await axios
        .post("/api/promotions", {
          grade_id: payload.grade_id,
          classroom_id: payload.classroom_id,
          section_id: payload.section_id,
          academic_year: payload.academic_year,
          grade_id_new: payload.grade_id_new,
          classroom_id_new: payload.classroom_id_new,
          section_id_new: payload.section_id_new,
          academic_year_new: payload.academic_year_new,
        })
        .then((response) => {
          if (response.status === 204) {
            console.log(response.data.message);
          } else {
            // console.log(response.data);

            router.go(-1);
          }
        })
        .catch((error) => {
          if (error.response.status === 422) {
            context.commit("setErrors", error.response.data.errors);
          }
          console.log(error.response.data.errors);
        });
    },
    //delete all promotions
    handleDeletePromotions: async (context) => {
      // await context.dispatch("getToken");
      await axios
        .delete("/api/promotions", {
          headers: {
            Type: "all",
          },
        })
        .then((response) => {
          context.dispatch("setDeleteMessage", response.data.message);
          // console.log(response.data);
        })
        .catch((error) => {
          console.log(error.response.data.errors);
        });
    },
    //delete all promotions
    handleDeletePromotion: async (context, payload) => {
      await context.dispatch("getToken");
      await axios
        .delete("/api/promotions", {
          headers: {
            Type: payload.type,
            id: payload.id,
          },
        })
        .then((response) => {
          context.dispatch("setDeleteMessage", response.data.message);
          // console.log("===============");
          // console.log(response.data);
          // console.log("===============");
        })
        .catch((error) => {
          console.log(error.response.data.errors);
        });
    },
    //fetch all graduated students
    fetchGraduated: async (context) => {
      await axios
        .get("/api/graduate")
        .then((response) => {
          context.commit("setGraduates", response.data.data);
          console.log(response.data.data);
        })
        .catch((error) => {
          console.log(error.response.data.errors);
        });
    },
    //graduate section's students
    handleCreateGraduate: async (context, payload) => {
      await context.dispatch("getToken");
      await axios
        .post("/api/graduate", {
          grade_id: payload.grade_id,
          classroom_id: payload.classroom_id,
          section_id: payload.section_id,
        })
        .then((response) => {
          console.log(response.data);
          context.dispatch("setMessage", response.data.message);
          router.push("/graduated/index");
        })
        .catch((error) => {
          console.log(error.response.data.errors);
        });
    },
    //handle graduate one student by student id
    handleCreateGraduateOneStudent: async (context, id) => {
      await context.dispatch("getToken");
      await axios
        .post("/api/graduate/" + id)
        .then((response) => {
          console.log(response.data);
          context.dispatch("setMessage", response.data.message);
          router.push("/graduated/index");
        })
        .catch((error) => {
          console.log(error.response.data.errors);
        });
    },
    //restore graduated student
    handleRestoreGraduated: async (context, id) => {
      await context.dispatch("getToken");
      await axios
        .put("/api/graduate/" + id)
        .then((response) => {
          context.dispatch("setMessage", response.data.message);
          context.dispatch("fetchGraduated");
        })
        .catch((error) => {
          console.log(error.response.data.errors);
        });
    },
    //handle delete graduated student
    handleDeleteGraduated: async (context, id) => {
      await axios
        .delete("/api/graduate/" + id)
        .then((response) => {
          context.dispatch("setDeleteMessage", response.data.message);
          context.dispatch("fetchGraduated");
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
          context.dispatch("setMessage", response.data.message);
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
          context.dispatch("setDeleteMessage", response.data.message);
          context.dispatch("fetchSections");
        })
        .catch((error) => {
          console.log(error.response.data.errors);
        });
    },
    //End Sections

    //Start Subjects
    //fetching all subjects
    fetchSubjects: async (context) => {
      await axios
        .get("/api/subjects")
        .then((response) => {
          context.commit("setSubjects", response.data.data);
          // console.log(response.data.data);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    },
    //fetch one subject
    fetchOneSubject: async (context, id) => {
      await axios
        .get("/api/subjects/" + id)
        .then((response) => {
          context.commit("setSubject", response.data.data);
          // console.log(response.data.data);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    },
    //create Subject
    handleCreateSubject: async (context, payload) => {
      await context.dispatch("getToken");
      axios
        .post("/api/subjects", {
          name: payload.name,
          grade: payload.grade,
          classroom: payload.classroom,
          teacher: payload.teacher,
        })
        .then((response) => {
          context.dispatch("setMessage", response.data.message);
          router.push("/subjects/index");
        })
        .catch((error) => {
          if (error.response.status === 422) {
            context.commit("setErrors", error.response.data.errors);
          }
          console.log(error.response.data);
        });
    },
    //update subject
    handleUpdateSubject: async (context, payload) => {
      await context.dispatch("getToken");
      await axios
        .put("/api/subjects/" + payload.id, {
          name: payload.name,
          grade: payload.grade,
          classroom: payload.classroom,
          teacher: payload.teacher,
        })
        .then((response) => {
          context.dispatch("setMessage", response.data.message);
          router.push("/subjects/index");
          // console.log(response.data.message);
        })
        .catch((error) => {
          if (error.response.status === 422) {
            context.commit("setErrors", error.response.data.errors);
          }
          console.log(error.response.data.errors);
        });
    },
    //delete Subject
    handleDeleteSubject: async (context, id) => {
      // await context.dispatch("getToken");
      await axios
        .delete("/api/subjects/" + id)
        .then((response) => {
          context.dispatch("setDeleteMessage", response.data.message);
          context.dispatch("fetchSubjects");
        })
        .catch((error) => {
          console.log(error.response.data.errors);
        });
    },
    //End Subjects
    //Start Exam
    //fetching all exams
    fetchQuizzes: async (context) => {
      await axios
        .get("/api/quizzes")
        .then((response) => {
          context.commit("setExams", response.data.data);
          // console.log(response.data.data);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    },
    fetchTeacherQuizzes: async (context) => {
      await axios
        .get("/api/teacher/quizzes")
        .then((response) => {
          context.commit("setExams", response.data.data);
          // console.log(response.data.data);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    },
    //fetching one exams
    fetchOneQuiz: async (context, id) => {
      await axios
        .get("/api/quizzes/" + id)
        .then((response) => {
          context.commit("setExam", response.data.data);
          // console.log(response.data.data);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    },
    handleCreateQuiz: async (context, payload) => {
      await context.dispatch("getToken");
      axios
        .post("/api/quizzes", {
          name: payload.name,
          subject: payload.subject_id,
          teacher: payload.teacher_id,
          grade: payload.grade_id,
          classroom: payload.classroom_id,
          section: payload.section_id,
        })
        .then((response) => {
          context.dispatch("setMessage", response.data.message);
          router.push("/quizzes/index");
        })
        .catch((error) => {
          if (error.response.status === 422) {
            context.commit("setErrors", error.response.data.errors);
          }
          console.log(error.response.data);
        });
    },
    //update Exam
    handleUpdateQuiz: async (context, payload) => {
      await context.dispatch("getToken");
      await axios
        .put("/api/quizzes/" + payload.id, {
          name: payload.name,
          subject: payload.subject_id,
          teacher: payload.teacher_id,
          grade: payload.grade_id,
          classroom: payload.classroom_id,
          section: payload.section_id,
        })
        .then((response) => {
          context.dispatch("setMessage", response.data.message);
          router.push("/quizzes/index");
          // console.log(response.data.message);
        })
        .catch((error) => {
          if (error.response.status === 422) {
            context.commit("setErrors", error.response.data.errors);
          }
          console.log(error.response.data.errors);
        });
    },
    //delete Subject
    handleDeleteQuiz: async (context, id) => {
      // await context.dispatch("getToken");
      await axios
        .delete("/api/quizzes/" + id)
        .then((response) => {
          context.dispatch("setDeleteMessage", response.data.message);
          context.dispatch("fetchQuizzes");
        })
        .catch((error) => {
          console.log(error.response.data.errors);
        });
    },
    //End Exam

    //set message
    setMessage: (context, message) => {
      context.commit("setMessage", message);
      setTimeout(() => {
        context.commit("setMessage", null);
      }, 4000);
    },
    setDeleteMessage: (context, message) => {
      context.commit("setDeleteMessage", message);
      setTimeout(() => {
        context.commit("setDeleteMessage", null);
      }, 4000);
    },
  },
});
