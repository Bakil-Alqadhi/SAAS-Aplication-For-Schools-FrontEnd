<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { mapActions } from "vuex";
import { storeDataSchools } from "../../../store/storeDataSchools";
import { storeDataTeachers } from "../../../store/storeDataTeachers";
import { useRouter } from "vue-router";
const form = ref ([{
        name: '',
        grade: '',
        classroom: '',
        teacher: ''
    }])
// const grade_id = ref('')
const grades = computed(()=> storeDataSchools.getters.grades)
const teachers = computed(()=> storeDataTeachers.getters.teachers)
const errors = computed(()=> storeDataSchools.getters.errors)
// const classroom = computed(()=> storeDataSchools.getters.classroom)
const classrooms = ref('')
const selectedGrade = ref('')
const selectedClassroom = ref('')
const selectedTeacher = ref('')
const router = useRouter()

onMounted(async()=>{
    // mapActions['fetchGradesData']
    await  storeDataSchools.dispatch('fetchGradesData')
    await  storeDataTeachers.dispatch('fetchTeachers')

})


const back = ()=>{
  router.go(-1);
}
const selected = ()=> {
    classrooms.value = grades.value[selectedGrade.value].classrooms;
    // console.log(grades.value[form.value.grade].classrooms)
}

const store = ()=>{

    if(!selectedGrade.value){
        errors.value.grade=  ['The grade field is required'];
        console.log(errors.value.grade)
    }
    form.value.grade = grades.value[selectedGrade.value].id;
    form.value.classroom = selectedClassroom.value;
    form.value.teacher = selectedTeacher.value
    console.log('=============')
        console.log(form.value)
        console.log('=============') 
    storeDataSchools.dispatch('handleCreateSubject', {
        'name': form.value.name,
        'grade' : form.value.grade,
        'classroom': form.value.classroom,
        'teacher': selectedTeacher.value
    })
}
</script>

<template>
<div class="container"> 
    <form class="main-form" @submit.prevent="store">
        <p  @click="back">X</p>
        <h1>Add New Subject</h1>
        <div class="parent" >
            <label for="section_name">Subject's Name:</label>
            <input class="field" v-model="form.name" type="text" id="section_name"  placeholder="Section Name" />
            <span v-if="errors.name">{{ errors.name[0] }}</span>
        </div>
        <div class="parent">
            <label for="grade">Select Grade:</label>
            <select class="field" v-model="selectedGrade" id="grade" @change="selected">
                <option value="" selected>Select Grade</option>
                <option v-for="(grade, index) in grades" :key="index" :value="index">{{ grade.name }}</option>
                <!-- <option v-for="grade in grades" :key="grade.id"  :value="grade.id">{{ grade.name }}</option> -->
            </select>
            <span v-if="errors.grade">{{ errors.grade[0] }}</span>
        </div>
        <div class="parent">
            <label for="classroom">Select Classroom:</label>
            <select class="field" v-model="selectedClassroom" id="classroom">
                <option value="">Select Classroom</option>
                <option v-for="classroom in classrooms" :key="classroom.id" :value="classroom.id">{{ classroom.name }}</option>
            </select>
            <span v-if="errors.classroom">{{ errors.classroom[0] }}</span>
        </div>

        <div class="parent">
            <label for="countries_multiple">Select Teachers</label>
            <select id="countries_multiple" v-model="selectedTeacher"  class="field">
                <option value="">Add Teacher</option>
                <option v-for="teacher in teachers" :key="teacher.id" :value="teacher.id">{{ teacher.last_name + ' ' + teacher.first_name  }}</option>
            </select>
            <span v-if="errors.teachers">{{ errors.teachers[0] }}</span>
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
    margin-bottom: 20px;
    text-align: start;
}
.container {
    background-color: rgba(230, 213, 213, 0.575);
    min-width: 100%;
    height: 100vh;
    position: fixed;
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
    border-radius: 10px;
    position: relative;
    /* visibility: hidden; */
}
@media (max-width:768px){ 
    .container form {
        width: 300px;
    }
}
</style>