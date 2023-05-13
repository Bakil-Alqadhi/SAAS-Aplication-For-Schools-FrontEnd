<script setup>
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { storeDataSchools } from "../../../store/storeDataSchools";
import { storeDataTeachers } from "../../../store/storeDataTeachers";

const grades = computed(()=> storeDataSchools.getters.grades)
// const teachers = computed(()=>storeDataTeachers.getters.teachers)
const teachers = ref('')
const subjects = computed(()=> storeDataSchools.getters.subjects)
const errors = computed(()=> storeDataSchools.getters.errors)
const router = useRouter()

const classrooms = ref('')
const sections = ref('')
const selectedGrade = ref('')
const selectedClassroom = ref('')
const selectedSection = ref('')

const form = ref({
    name: '',
    subject_id: '',
    grade_id: '',
    classroom_id: '',
    section_id:'',
    teacher_id: ''
})
onMounted(()=>{
    // mapActions['fetchGradesData']
    storeDataSchools.dispatch('fetchGradesData');
    storeDataSchools.dispatch('fetchSubjects');
    storeDataTeachers.dispatch('fetchTeachers')
})

const selected = ()=> {
    classrooms.value = grades.value[selectedGrade.value].classrooms;
    selectedSection.value = ''
    teachers.value= ''
}

const selected2 = ()=> {
    selectedSection.value = ''
    teachers.value= ''
    sections.value = grades.value[selectedGrade.value].sectionsClassroom[selectedClassroom.value].sections;
}
const selected3 = ()=> {
        teachers.value = sections.value[selectedSection.value].teachers;
}

const back = ()=>{
  router.go(-1);
}

const store = ()=>{
    if(!selectedGrade.value){
        errors.value.grade=  ['The grade field is required'];
        // console.log(errors.value.grade)
    }
    form.value.grade_id = grades.value[selectedGrade.value].id;
    form.value.classroom_id = grades.value[selectedGrade.value].sectionsClassroom[selectedClassroom.value].id;
    form.value.section_id = sections.value[selectedSection.value].id
    // console.log('=============')
    //     console.log(form.value)
    //     console.log('=============') 
    storeDataSchools.dispatch('handleCreateQuiz', form.value)
}
</script>

<template>
<div v-if="grades" class="container"> 
    <form class="main-form" @submit.prevent="store">
        <p  @click="back">X</p>
        <h1>Create New Quiz</h1>
        <div class="parent" >
            <label for="name">Quiz's Name:</label>
            <input class="field" v-model="form.name" type="text" id="name"  placeholder="Quiz Name" />
            <span v-if="errors.name">{{ errors.name[0] }}</span>
        </div>
        <div class="parent">
            <label for="subject">Select Subject:</label>
            <select class="field" v-model="form.subject_id" id="subject" >
                <option value="" selected>Select Subject</option>
                <option v-for="subject in subjects" :key="subject.id" :value="subject.id">{{ subject.name }}</option>
            </select>
            <span v-if="errors.subject">{{ errors.subject[0] }}</span>
        </div>
        <div class="parent">
            <label for="grade">Select Grade:</label>
            <select class="field" v-model="selectedGrade" id="grade" @change="selected">
                <option value="" selected>Select Grade</option>
                <option v-for="(grade, index) in grades" :key="index" :value="index">{{ grade.name }}</option>
            </select>
            <span v-if="errors.grade">{{ errors.grade[0] }}</span>
        </div>
        <div class="parent" >
            <label for="classroom">Classroom:</label>
            <select class="field" v-model="selectedClassroom" @change="selected2" id="classroom">
                <option value="">Select Classroom</option>
                <option v-for="(classroom,index) in classrooms" :key="index" :value="index">{{ classroom.name }}</option>
            </select>
            <span v-if="errors.classroom">{{ errors.classroom[0] }}</span>
        </div>
        <div class="parent" >
            <label for="section">Select Section:</label>
            <select class="field" v-model="selectedSection"  @change="selected3" id="section">
                <option value="">Select Section</option>
                <option v-for="(section, index) in sections" :key="section.id" :value="index">{{ section.section_name }}</option>
            </select>
            <span v-if="errors.section">{{ errors.section[0] }}</span>
        </div>
        <div class="parent" >
            <label for="section">Select Teacher:</label>
            <select class="field" v-model="form.teacher_id"  id="section">
                <option value="">Select Teacher</option>
                <option v-for="teacher in teachers" :key="teacher.id" :value="teacher.id">{{ teacher.last_name +' '+ teacher.first_name }}</option>
            </select>
            <span v-if="errors.teacher">{{ errors.teacher[0] }}</span>
        </div>
        <div class="buttons mt-10">
            <button type="submit" class="create field">Create</button>
        </div>

    </form>
</div>
</template>

<style scoped>
.container form span {
    color: red;
    /* top: ; */
    text-align: start;
    margin-bottom: 10px;
    font-size: 13px;
}
.container form p {
    position: absolute;
    background-color: rgb(210, 53, 18);
    color: white;
    font-size: large;
    font-weight: bold;
    width: 30px;
    top: 5px;
    /* left: 5px; */
    margin-bottom: 3px;
    text-align: center;
    border-radius: 3px;
    cursor: pointer;
}

.container form p:hover {
  background-color: red;
}
.container form h1 {
    width: 100%;
    /* background-color: blue ; */
    border: 1px solid blue;
    padding: 4px;
    color: blue ;
    border-radius: 5px;
    text-align: center;
    margin: 30px 0 20px;
    font-size: large;
    font-weight: bold;
}
.container form label {
    background-color: rgb(221, 221, 232);
    color: blue ;
    border: 1px solid blue;
    width: 100%;
    /* color: white; */
    text-align: start;
    padding: 4px 7px;
    font-size: medium;
    border-radius: 5px;
    /* margin-top: 20px; */
    /* margin-bottom: 20px; */
}
.container form .field {
    background-color: white;
    border: 2px solid rgb(76, 76, 217);
    /* color: white; */
    width: 100%;
    text-align: start;
    padding: 4px 7px;
    font-size: medium;
    border-radius: 5px;
    margin-top: 10px;
    /* margin-bottom: 10px; */
}


.container form  .create {
    background-color: rgb(76, 76, 217);
    text-align: center;
    color: white;
    margin: 5px 0;
}
.container form  .create:hover {
    background-color: blue;
}
.parent {
    margin-bottom: 10px;
    text-align: start;
}
.container {
    background-color: rgba(230, 213, 213, 0.575);
    min-width: 100%;
    height: 100vh;
    position: fixed;
    padding: 80px 0 30px;
    z-index: 1400;
    left: 0; top: 0; right: 0; bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;

}
.container form{
    background-color:white ;
    padding: 10px;
    /* padding-top: 40px; */
    width: 450px;
    height: auto;
    border-radius: 10px;
    position: relative;
    /* overflow: visible; */
    /* visibility: hidden; */
}
@media (max-width:768px){ 
    .container form {
        width: 300px;
    }
}
</style>