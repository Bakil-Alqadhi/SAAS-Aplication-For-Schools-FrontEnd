<script setup>
import { computed, onMounted, ref } from "vue";
import { mapActions } from "vuex";
import { storeDataSchools } from "../../../store/storeDataSchools";
import { storeDataStudents } from "../../../store/storeDataStudents";
const attendances = computed(()=> storeDataStudents.getters.attendances)
const gradesData= computed(() => storeDataSchools.getters.sections)
const errors = computed(()=> storeDataStudents.getters.errors)


const selectedSection = ref(-1)
const selectedStudent = ref(-1)
const sections = ref([])
const students = ref('')

const form = ref({
    section_id:'',
    student_id: '',
    from: '',
    to: ''
})

const sectionIsSelected = ()=> {
    if(selectedSection.value != -1){
        students.value = sections.value[selectedSection.value].students
        console.log(sections.value[selectedSection.value].students)
    }
}
onMounted( async()=>{
    mapActions['fetchTeacherSection']
    await  storeDataSchools.dispatch('fetchTeacherSection')
    gradesData.value.forEach(element => {
        sections.value.push(element.sectionsData[0])
        // console.log('========') 
        // console.log(element.value)
        // console.log('========') 
    });
    // sections.value = gradesData.value.sectionsData   
    console.log('========') 
    console.log(sections.value)
    console.log('========') 
})


const create= async()=> {
    if(selectedSection.value !== -1 && selectedSection.value !== ''){
        form.value.section_id = sections.value[selectedSection.value].section_id
    } else {
        form.value.section_id = selectedSection.value
    }
    form.value.student_id = selectedStudent.value
    await storeDataStudents.dispatch('handleAttendanceReport', form.value)
    console.log(form.value)
}
</script>

<template>
    <div class="container" v-if="sections"> 
        <div class="errors" v-if="errors">
            <p v-for="(error, index) in errors" :key="index">{{ error[0] }}</p>
        </div>
      <form @submit.prevent="create"  class="parent">
        <div class="from">
            <div class="data">
                <div class="fields">
                    <!-- <label for="section">Select Section:</label> -->
                    <select class="field" v-model="selectedSection" @change="sectionIsSelected"  id="section">
                        <option :value="-1">Select Section</option>
                        <option v-for="(section, index) in sections" :key="index" :value="index">{{ section.section_name }}</option>
                    </select>
                </div>
                <div class="fields">
                    <!-- <label for="section">Select Section:</label> -->
                    <select class="field" v-model="selectedStudent"  id="section">
                        <option :value="-1" selected>All Students</option>
                        <option v-for="student in students" :key="student.id" :value="student.id">{{ student.last_name + ' '+ student.first_name}}</option>
                    </select>
                </div>
                <div class="fields-date">
                    <label for="from" >From</label>
                    <input type="date" name="from" v-model="form.from" class="field" id="from">
                </div>
                <div class="fields-date">
                    <label for="to">To</label>
                    <input type="date" name="to" v-model="form.to" class="field" id="to">
                </div>
            </div>
        </div>
        <div class="button mt-10">
                <button type="submit" class="create field">Get Report</button>
            </div>
      </form>
      <div class="table" v-if="attendances.length">
        <table class="grade-table">
      <thead>
        <tr>
          <th class="bg-blue-600">ID</th>
          <th class="bg-green-400 text-white">Student Name</th>
          <th class="bg-green-400 text-white">Classroom</th>
          <th class="bg-green-400 text-white">Section </th>
          <th class="bg-green-400 text-white">Date</th>
          <th class="bg-orange-300">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(attendance, index) in attendances" :key="index" class="mb-2">
          <td>{{ index + 1 }}</td>
          <td >{{ attendance.student_last_name + ' '+ attendance.student_first_name }}</td>
          <td >{{ attendance.classroom_name }}</td>
          <td >{{ attendance.section_name }} </td>
          <td >{{ attendance.attendance_date }}</td>
          <td v-if="attendance.attendance_status" class="bg-green-600 text-white">{{ attendance.attendance_status }}</td>
          <td v-else class="bg-red-400 text-white">{{ attendance.attendance_status }}</td>
        </tr>
      </tbody>
    </table>
      </div>
    </div>
    </template>
    
    <style scoped>
    .container {
        min-width: 100%;
        height: 100vh;
        margin: 0 0 0 7rem;
        padding: 0;
    }
    .container .errors {
        margin: auto;
        width: 70%;
        background-color: #f75044;
        color: white;
        font-size: medium;
        text-align: start;
        padding: 1rem;
        border-radius: 5px;
    }
    .container .errors p{
        text-align: start;
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
        margin-left: 40%;
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
    margin: 1rem .5rem 0;
    height: auto;
    padding: 3px 7px;
    font-size: medium;
    border-radius: 5px;
}
/* ========================== */
.container .table {
    /* background-color: #4caf50; */
    min-width: 80%;
}
.grade-table {
    /* background-color: red; */
    margin:2rem 7rem;
    border-collapse: collapse;
    min-width: 100%;
    max-width: 100%;
    font-size: 1.5rem;
    text-align: left;
    /* overflow: hidden; */
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
    border-radius: 10px 10px 0 0;
  }

  .grade-table th {
    /* background-color: rgb(87, 87, 202); */
    /* background-color: #333; */
    color: #fff;
    margin-right: 1px;
    padding: 0.8rem;
    font-weight: bold;
    border: 1px solid;
    text-align: center;
    /* text-transform: uppercase; */
  }

  .grade-table td {
    padding: 0.8rem;
    text-align: center;
  }

  .grade-table tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  .btn-update,
  .btn-show,
  .btn-delete {
    padding: 0.6rem .9rem;
    border: none;
    border-radius: 4px;
    font-size: 1.4rem;
    margin-right: 0.2rem;
    cursor: pointer;
    transition: transform 0.3s ease-in-out;
  }

  .btn-update:hover,
  .btn-delete:hover,
  .btn-show:hover {
    transform: translateY(-3px);
  }


  .btn-update {
    /* background-color: #4caf50; */
    color: #4caf50;
    border: 1px solid #4caf50;
  }

  .btn-delete {
    /* background-color: #f44336; */
    color: #f44336;
    margin-top: 4px;
    border: 1px solid #f44336;
  }
/* //////////////////////////////////////////////// */
@media (max-width:768px){ 
        .container .table .grade-table {
            /* min-width: 20%;*/
            min-width: 90%;
            max-width: 90%; 
        }
        .container   .button {
            text-align: start;
        } 
            .container .parent .data {
            display:flex;
            flex-direction: column;
            justify-content: center;
            /* align-items: start; */
        }
        .container .parent .data .fields {
            display:flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
        }
        .container .parent .data .fields .field {
            min-width: 90%;
        }
    
    }
    </style>