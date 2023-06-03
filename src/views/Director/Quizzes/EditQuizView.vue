<script setup>
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { storeDataSchools } from "../../../store/storeDataSchools";
import { storeDataTeachers } from "../../../store/storeDataTeachers";
const props = defineProps({
    id: String
})
const quiz = computed(()=> storeDataSchools.getters.exam)
const grades = computed(()=> storeDataSchools.getters.grades)
const subjects = computed(()=> storeDataSchools.getters.subjects)
const teachers = computed(()=> storeDataTeachers.getters.teachers)
const errors = computed(()=> storeDataSchools.getters.errors)

const classrooms = ref('')
const sections = ref('')
const selectedGrade = ref('')
const selectedClassroom = ref('')
const selectedSection = ref('')
// const form = ref ([{
//         name: '',
//         term: '',
//         academic_year: '',
//     }])

const router = useRouter()

onMounted(async()=>{
    await storeDataSchools.dispatch('fetchGradesData')
    await storeDataSchools.dispatch('fetchSubjects')
    await storeDataTeachers.dispatch('fetchTeachers')
    await storeDataSchools.dispatch('fetchOneQuiz', props.id)
    grades.value.forEach(function(element, index){
        if(element.id == quiz.value.grade_id){
            selectedGrade.value = index;
            classrooms.value = grades.value[index].classrooms
            // selectedClassroom.value = quiz.value.classroom_id
            classrooms.value.forEach(function(el2, ind2){
                if(el2.id == quiz.value.classroom_id){
                    selectedClassroom.value = ind2
                    sections.value = grades.value[selectedGrade.value].sectionsClassroom[selectedClassroom.value].sections;
                    selectedSection.value = quiz.value.section_id
                }
            })


            
        }
    });
   
})

const selected = ()=> {
    classrooms.value = grades.value[selectedGrade.value].classrooms;
}

const selected2 = ()=> {
    sections.value = grades.value[selectedGrade.value].sectionsClassroom[selectedClassroom.value].sections;
    // console.log(grades.value[form.value.grade].classrooms)
}

const back = ()=>{
  router.go(-1);
}

const update = ()=>{
    if(!selectedGrade.value){
        errors.value.grade=  ['The grade field is required'];
        // console.log(errors.value.grade)
    }
    quiz.value.grade_id = grades.value[selectedGrade.value].id;
    quiz.value.classroom_id = grades.value[selectedGrade.value].sectionsClassroom[selectedClassroom.value].id;
    quiz.value.section_id = selectedSection.value
    // console.log('=============')
    //     // console.log(exam.value)
    //     console.log('=============') 
    storeDataSchools.dispatch('handleUpdateQuiz', quiz.value)
}
</script>

<template>
<div class="container" v-if="quiz"> 
    <form class="main-form" @submit.prevent="update">
        <p  @click="back">X</p>
        <h1>Update Quiz Data</h1>
        <div class="parent" >
            <label for="name">Quiz's Name:</label>
            <input class="field" v-model="quiz.name" type="text" id="name"  placeholder="Quiz Name" />
            <span v-if="errors.name">{{ errors.name[0] }}</span>
        </div>
        <div class="parent">
            <label for="subject">Select Subject:</label>
            <select class="field" v-model="quiz.subject_id" id="subject" >
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
            <select class="field" v-model="selectedSection"  id="section">
                <option value="">Select Section</option>
                <option v-for="section in sections" :key="section.id" :value="section.id">{{ section.section_name }}</option>
            </select>
            <span v-if="errors.section">{{ errors.section[0] }}</span>
        </div>
        <div class="parent" >
            <label for="section">Select Teacher:</label>
            <select class="field" v-model="quiz.teacher_id"  id="section">
                <option value="">Select Teacher</option>
                <option v-for="teacher in teachers" :key="teacher.id" :value="teacher.id">{{ teacher.last_name +' '+ teacher.first_name }}</option>
            </select>
            <span v-if="errors.teacher">{{ errors.teacher[0] }}</span>
        </div>
        <div class="buttons mt-10">
            <button type="submit" class="create field">Update</button>
        </div>

    </form>
</div>
</template>

<style scoped>
.container form span {
    color: red;
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
    text-align: start;
    padding: 4px 7px;
    font-size: medium;
    border-radius: 5px;
}
.container form .field {
    background-color: white;
    border: 2px solid rgb(76, 76, 217);
    width: 100%;
    text-align: start;
    padding: 4px 7px;
    font-size: medium;
    border-radius: 5px;
    margin-top: 10px;
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
    width: 450px;
    height: auto;
    border-radius: 10px;
    position: relative;
}
@media (max-width:768px){ 
    .container form {
        width: 300px;
    }
}
</style>