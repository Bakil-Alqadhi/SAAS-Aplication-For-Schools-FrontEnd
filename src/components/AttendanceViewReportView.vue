<script setup>
import { computed, onMounted, ref } from "vue";
import { mapActions } from "vuex";
import { storeDataSchools } from "../store/storeDataSchools";
const grades = computed(()=> storeDataSchools.getters.grades)
const errors = computed(()=> storeDataSchools.getters.errors)

const classrooms = ref('')
const sections = ref('')
const selectedGrade = ref('')
const selectedClassroom = ref('')
const selectedSection = ref('')
const selectedStudent = ref('')
const students = ref('')

const form = ref({
    grade_id: '',
    classroom_id: '',
    section_id:'',
    from: '',
    to: ''
})
onMounted(()=>{
    mapActions['fetchGradesData']
    storeDataSchools.dispatch('fetchGradesData');
})

const selected = ()=> {
    selectedClassroom.value = ''
    classrooms.value = grades.value[selectedGrade.value].classrooms;
}

const selected2 = ()=> {
    selectedSection.value = ''
    sections.value = grades.value[selectedGrade.value].sectionsClassroom[selectedClassroom.value].sections;
    // console.log(grades.value[selectedGrade.value].sectionsClassroom[selectedClassroom.value].sections)
}
const selected3 = ()=> {
    selectedStudent.value = ''
    students.value = grades.value[selectedGrade.value].sectionsClassroom[selectedClassroom.value].sections[selectedSection.value].students;
    // console.log(grades.value[selectedGrade.value].sectionsClassroom[selectedClassroom.value].sections)
}
const create= async()=> {

    form.value.grade_id = grades.value[selectedGrade.value].id;
    form.value.classroom_id = grades.value[selectedGrade.value].sectionsClassroom[selectedClassroom.value].id;
    form.value.section_id = grades.value[selectedGrade.value].sectionsClassroom[selectedClassroom.value].sections[selectedSection.value].id
    await mapActions['handleCreateGraduate', form.value]
    await storeDataSchools.dispatch('handleCreateGraduate', form.value)
}
</script>

<template>
    <div class="container " v-if="grades"> 
      <form @submit.prevent="create"  class="parent">
        <div class="from">
            <div class="data">
                <div class="fields">
                    <!-- <label for="grade">Select Grade:</label> -->
                    <select class="field" v-model="selectedGrade" id="grade" @change="selected">
                        <option value="" selected>Select Grade</option>
                        <option v-for="(grade, index) in grades" :key="index" :value="index">{{ grade.name }}</option>
                    </select>
                    <span v-if="errors.grade_id">{{ errors.grade_id[0] }}</span>
                </div>
                <div class="fields">
                    <!-- <label for="classroom">Select Classroom:</label> -->
                    <select class="field" v-model="selectedClassroom" @change="selected2" id="classroom">
                        <option value="">Select Classroom</option>
                        <option v-for="(classroom,index) in classrooms" :key="index" :value="index">{{ classroom.name }}</option>
                    </select>
                    <span v-if="errors.classroom_id">{{ errors.classroom_id[0] }}</span>
                </div>
                <div class="fields">
                    <!-- <label for="section">Select Section:</label> -->
                    <select class="field" v-model="selectedSection" @change="selected3"  id="section">
                        <option value="">Select Section</option>
                        <option v-for="(section, index) in sections" :key="section.id" :value="index">{{ section.section_name }}</option>
                    </select>
                    <span v-if="errors.section_id">{{ errors.section_id[0] }}</span>
                </div>
                <div class="fields">
                    <!-- <label for="section">Select Section:</label> -->
                    <select class="field" v-model="selectedStudent"  id="section">
                        <option value="">Select Student</option>
                        <option v-for="student in students" :key="student.id" :value="student.id">{{ student.last_name + ' '+ student.first_name}}</option>
                    </select>
                    <span v-if="errors.student_id">{{ errors.student_id[0] }}</span>
                </div>
                <div class="fields-date">
                    <label for="from" >From</label>
                    <input type="date" name="from" v-model="form.from" class="field" id="from">
                    <span v-if="errors.from">{{ errors.from[0] }}</span>
                </div>
                <div class="fields-date">
                    <label for="to">To</label>
                    <input type="date" name="to" v-model="form.to" class="field" id="to">
                    <span v-if="errors.to">{{ errors.to[0] }}</span>
                </div>
            </div>
        </div>
        <div class="button mt-10">
                <button type="submit" class="create field">Get Report</button>
            </div>
      </form>
    </div>
    </template>
    
    <style scoped>
    .container {
        min-width: 100%;
        height: 100vh;
        margin: 0 0 0 7rem;
        padding: 0;
    }
    
    .container .parent {
        height: auto;
        width: auto;
    }

    .container form span {
        color: red;
        /* top: ; */
        margin-bottom: 10px;
        font-size: 13px;
    }
    
    .container  .field {
        background-color: white;
        border: 2px solid rgb(76, 76, 217);
        /* color: white; */
        min-width: 70%;
        text-align: start;
        padding: 4px 7px;
        font-size: medium;
        border-radius: 5px;
        margin-top: 10px;
        /* margin-bottom: 10px; */
    }
    
    
    .container   .button {
        text-align: start;
        min-width: 100%;
        margin: 0 0 0 7rem;
        /* background-color: rgb(221, 221, 232); */

    }
    
    .container  .create {
        background-color: rgb(76, 76, 217);
        text-align: center;
        min-width: 10%;
        color: white;
        margin-right: 1px;
    }
    .container  .create:hover {
        background-color: blue;
    }
    .container .parent .data {
        padding: 20px;
        height: auto;
        width: 90%;
        display:flex;
        justify-content: space-evenly;
        padding-top: 20px;
        margin-left:  2%;
    }
    
    .container .parent .data .fields {
        margin-left: 1px;
    }

    .fields-date {
        display: flex;
        justify-content: space-evenly;
        /* min-width: 70%; */
        /* margin: auto; */
        /* background-color: red; */
        margin-bottom: 1rem;
    }
    
.fields-date label {
    background-color: rgb(221, 221, 232);
    color: blue ;
    text-align: center;
    border: 1px solid blue;
    min-width: 15%;
    max-width: 25%;
    margin: 1rem .5rem;
    height: auto;
    padding: 7px 7px;
    font-size: medium;
    border-radius: 5px;
}
    @media (max-width:1200px){ 
        
            .container .parent .data {
            display:flex;
            flex-direction: column;
            justify-content: center;
        }
        .container .data .fields  { 
            display: flex;
            justify-content: space-around;
            margin-bottom: 5px;
        }
        .container  .data .fields  label {
        /* max-width: 25%;
        margin-right: 5px; */
    }
    .container   .button {
            text-align: center;
            min-width: 90%;
            margin: 0 auto;
        } 

    .fields-date {
        min-width: 70%;
        margin: auto;
    }
    }
    
    @media (max-width:768px){ 
        .container   .button {
            text-align: center;
        } 
            .container .parent .data {
            display:flex;
            flex-direction: column;
            justify-content: center;
        }
        .container .parent .data .fields {
            display:flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
        }
    
    }
    </style>