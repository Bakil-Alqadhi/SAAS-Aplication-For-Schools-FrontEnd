<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { mapActions } from "vuex";
import { storeDataSchools } from "../../store/storeDataSchools";
import { storeDataTeachers } from "../../store/storeDataTeachers";
import { useRouter } from "vue-router";
const form = ref ([{
        name: '',
        grade: '',
        classroom: ''
      }])

// const grade_id = ref('')
const grades = computed(()=> storeDataSchools.getters.grades)
const teachers = computed(()=> storeDataTeachers.getters.teachers)
const errors = computed(()=> storeDataSchools.getters.errors)
// const classroom = computed(()=> storeDataSchools.getters.classroom)
const classrooms = ref('')
const selectedGrade = ref('')
const selectedClassroom = ref('')
const selectedTeachers = ref('')
const router = useRouter()
const checkboxes = ref([])
const boxesForm = ref('')
const mainForm = ref('')
const teachersArray = ref([])
const props = defineProps({
    id: String
})
onMounted(async()=>{
    // mapActions['fetchGradesData']
    await  storeDataSchools.dispatch('fetchGradesData')
    await  storeDataTeachers.dispatch('fetchTeachers')
    checkboxes.value = document.getElementsByName("teachers[]")
    boxesForm.value = document.querySelector(".teachers")
    mainForm.value = document.querySelector(".main-form")


})


const back = ()=>{
  router.go(-1);
}
const selected = ()=> {
    classrooms.value = grades.value[selectedGrade.value].classrooms;
    // console.log(grades.value[form.value.grade].classrooms)
}

const store = ()=>{
        // console.log('=============')
        // console.log(selectedTeachers.value)
        // console.log('=============') 
    if(!selectedGrade.value){
        errors.value.grade=  ['The grade field is required'];
        console.log(errors.value.grade)
    }
    if(!teachersArray.value){
        errors.value.teachers=  ['You have to add teachers to the section'];
    }

    form.value.grade = grades.value[selectedGrade.value].id;
    form.value.classroom = selectedClassroom.value;
    storeDataSchools.dispatch('createSection', {
        'name': form.value.name,
        'grade' : form.value.grade,
        'classroom': form.value.classroom,
        'teachers': teachersArray.value

    })
}

const addTeacher = ()=>{
    boxesForm.value.style.visibility = 'visible';
    mainForm.value.style.visibility = 'hidden';
}

const saveSelectedTeachers = ()=> {
    for(let i=0; i< checkboxes.value.length; i++){
        if(checkboxes.value[i].checked){
            teachersArray.value.push(checkboxes.value[i].value)
        }
    }
    mainForm.value.style.visibility = 'visible';
    boxesForm.value.style.visibility = 'hidden';
    console.log(teachersArray.value)
}
</script>

<template>
<div class="container"> 
            <!--  -->


    <div v-if="teachers" class="teachers">
        <div class="table">
            <!-- <p class="btn-close" @click="back">X</p> -->
            <table>
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Full name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="teacher in teachers" :key="teacher.id">
                        <td>
                            <img class="h-12 w-12 rounded-full object-cover" :src="teacher.image" alt="Student Image">
                        </td>
                        <td>{{ teacher.first_name + ' ' + teacher.last_name }}</td>
                        <td>
                            <router-link :to="{name: 'WaitingTeacherDetailView', params:{id: teacher.id}}">
                                <i class="far fa-eye hover:text-blue-500  hover:cursor-pointer"></i>
                            </router-link>
                                <input type="checkbox" name="teachers[]" :value="teacher.id" class="add">
                            <!-- <button  @click="deleteClassroom(student.id)" class="btn-delete">Delete</button> -->
                        </td>
                    </tr>
                    <!-- Add more rows here -->
                </tbody>
            </table>
            <div @click="saveSelectedTeachers" class="save">Save</div>
        </div>
    </div>

        <!--  -->
    <form class="main-form" @submit.prevent="store">
        <p  @click="back">X</p>
        <h1>Create New Section</h1>
        <div class="parent" >
            <label for="section_name">Section's Name:</label>
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

        <!-- <div class="parent">
            <label for="countries_multiple" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Teachers</label>
            <select multiple id="countries_multiple" v-model="selectedTeachers" class="bg-gray-50 border border-gray-300 text-gray-900 text-2xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option v-for="teacher in teachers" :key="teacher.id" :value="teacher.id">{{ teacher.last_name + ' ' + teacher.first_name  }}</option>
            </select>
            <span v-if="errors.teachers">{{ errors.teachers[0] }}</span>
        </div> -->
        <div class="buttons">
            <button @click="addTeacher" class="create field">Add Teachers</button>
            <span v-if="errors.teachers">{{ errors.teachers[0] }}</span>

        </div>

        <div class="buttons mt-10">
            <button type="submit" class="create field">Create</button>
        </div>

    </form>
</div>
</template>

<style scoped>
.teachers {
    position: fixed;
    margin-top: 0;
    min-width: 100vw;
    height: 100%;
    /* background-color: rgba(129, 129, 137, 0.411); */
    visibility: hidden;
    transition: 1sm linear;
    /* z-index: 1000; */
}
.teachers .table {
    /* background-color: rgb(93, 83, 83); */
    /* border: 1px solid rgb(86, 83, 83); */
    border-radius: 5px;
    min-width: 50%;
    height: auto;
    margin: auto;
    margin-top: 150px;
    padding: 20px;
}
.teachers .table .save {
    width: 70px;
    height: auto;
    text-align: center;
    padding: 10px;
    margin-top: 10px;
    font-size: medium;
    color: white;
    border-radius: 5px;
    background-color: rgb(60, 186, 60);
    cursor: pointer;
}
.teachers .table .save:hover {
    background-color: rgb(45, 200, 45);
}
table {
    border-radius: 5px;
    width: 100%;
    /* height: auto; */
    font-size: 1.2rem;
    text-align: left;
    /* overflow: visible; */
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
    border-radius: 10px 10px 0 0;
  }
table th {
    background-color: rgb(87, 87, 202);
    /* background-color: #333; */
    color: #fff;
    padding: 0.8rem;
    font-weight: bold;
    text-transform: uppercase;
  }

table td {
    padding: 0.8rem;
  }

table tr:nth-child(odd) {
    background-color: white;
  }
table tr:nth-child(even) {
    background-color: #d5dce0;
  }

  .add {
    /* padding: 0.6rem 1rem; */
    margin-top: 5px;
    border-radius: 4px;
    margin-left: 2rem;
    cursor: pointer;
  }
  /* .container .btn-close {
    background-color: rgb(210, 53, 18);
    color: white;
    font-size: large;
    font-weight: bold;
    width: 30px;
    margin-bottom: 10px;
    text-align: center;
    border-radius: 3px;
    cursor: pointer;

} */
.parent {
    margin-bottom: 20px;
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
.container form span {
    color: red;
    /* top: ; */
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
    background-color: #ccc;
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

.container form .field {
    background-color: white;
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
</style>