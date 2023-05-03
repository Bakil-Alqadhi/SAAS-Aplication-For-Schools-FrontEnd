<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { mapActions } from "vuex";
import { storeDataSchools } from "../../store/storeDataSchools";
import { storeDataStudents } from "../../store/storeDataStudents";

const students = computed( ()=> storeDataStudents.getters.students)
const todayDate = ref('')
const attendance = ref([])
const props = defineProps({
    id: String
})
onMounted(()=>{
    storeDataStudents.dispatch('fetchStudentsOfSection', props.id);
    todayDate.value =new Date().toJSON().slice(0, 10)

})


const restore =async (id)=> {
  if(confirm("Are you sure?")){
    // mapActions(['handleRestoreGraduated', id])
    storeDataSchools.dispatch('handleRestoreGraduated', id)
  }
}

const check = ()=>{
    
}

const save = ()=>{
    console.log(attendance.value)
}
</script>
<template>
  
<div v-if="students" class="grade-table-container">   
     <!-- bg-green-500  -->
    <div class="flex ">

      <!-- bg-gray-800 -->
        <div  class="create-grade items-center justify-center px-10 py-4 mb-5 overflow-hidden font-bold  text-black border-2 border-solid border-green-400 rounded-lg group"> 
            Date of Today : <span>{{ todayDate }}</span>
        </div>
        <!-- <button @click="deletePromotion('all', null)"  class="relative ml-10 create-grade inline-flex items-center justify-center px-10 py-4 mb-5 overflow-hidden font-bold tracking-tighter  text-white bg-red-600 rounded-lg group"> 
            <span class="absolute w-0 h-0 transition-all duration-500 ease-out bg-red-500 rounded-full group-hover:w-60 group-hover:h-56"></span>
            <span class="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
            <span class="relative">Rollback All</span>
        </button> -->
    </div>
    <table class="grade-table">
      <thead>
        <tr>
          <th class="bg-blue-600">ID</th>
          <th class="bg-blue-400 text-white">Student Name</th>
          <th class="bg-blue-400 text-white">Gender</th>
          <th class="bg-green-400 text-white">Grade</th>
          <th class="bg-green-400 text-white">Classroom</th>
          <th class="bg-green-400 text-white">Section</th>
          <th class="bg-blue-600">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(student, index) in students" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ student.student_last_name + ' '+ student.student_first_name}}</td>
          <td>Male</td>
          <td>{{ student.grad_name  }}</td>
          <td>{{ student.classroom_name }}</td>
          <td>{{ student.section_name }}</td>
          <td>
                <!-- <router-link class="btn-show" :to="{name: 'ShowClassroom', params:{id: promotion.id}}">
                    <i class="far fa-eye hover:text-blue-500 hover:cursor-pointer"></i>
                </router-link> -->
            <div  class="presence hover:text-green-600">
                <label for="presence">Presence</label>
                <input type="radio" v-model="attendance[student.id]" :value="1" id="presence">
            </div>
            <div  class="absence">
                <label for="absence">Absence</label>
                <input type="radio" @click="check" v-model="attendance[student.id]" :value="0" id="absence">
            </div>
          </td>
        </tr>
        <!-- Add more rows here -->
      </tbody>
    </table>
    <div class="save  text-start p-5">
        <button @click="save" class="bg-green-500 py-3 px-8 hover:bg-green-600  font-bold rounded-lg text-white">Save</button>
    </div>
  </div>
</template>

<style>
.save button {
    font-size: medium;
    letter-spacing: 0.1cqmax;
}
.create-grade {
    /* color: #4caf50; */
    font-size: 1.5rem;
    letter-spacing: normal;
}
.create-grade span{
    color: #4caf50;
}
.grade-table-container {
    min-width: 100%;
    margin: 0 100px 0;
    padding: 3rem 2rem 2rem;
  }

  .grade-table {
    border-collapse: collapse;
    width: 90%;
    font-size: 1.5rem;
    text-align: left;
    overflow: hidden;
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

  .presence,
  .absence {
    padding: 0.6rem .9rem;
    border-radius: 4px;
    font-size: 1.4rem;
    /* margin-right: 0.02rem; */
    max-width: 10rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .presence input,
  .absence input {
    cursor: pointer;
  }

.presence {
    /* background-color: #4caf50; */
    color: #4caf50;
    border: 1px solid #4caf50;
}

  .absence {
    /* background-color: #f44336; */
    color: #f44336;
    margin-top: 4px;
    border: 1px solid #f44336;
  }

@media (max-width:768px){
     .btn-delete {
        /* display: block; */
        margin-top: 8px;
    }
    
    .grade-table-container {
    max-width: 600px;
    margin: 0 auto;
  }
}
</style>