<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { mapActions } from "vuex";
import { storeDataSchools } from "../../../store/storeDataSchools";

const graduates = computed( ()=> storeDataSchools.getters.graduates)

onMounted(()=>{
    storeDataSchools.dispatch('fetchGraduated');
})


const restore =async (id)=> {
  if(confirm("Are you sure?")){
    // mapActions(['handleRestoreGraduated', id])
    storeDataSchools.dispatch('handleRestoreGraduated', id)
  }
}

const deleteStudent = ( id)=> {
    if(confirm("Are you sure, You want to delete this student?")){
      storeDataSchools.dispatch('handleDeleteGraduated', id)       
    }
}

</script>
<template>
  
<div v-if="graduates" class="grade-table-container">   
     <!-- bg-green-500  -->
    <div class="flex ">

      <!-- bg-gray-800 -->
        <router-link to="/graduated/create"  class="relative create-grade inline-flex items-center justify-center px-10 py-4 mb-5 overflow-hidden font-bold tracking-tighter  text-white bg-green-600 rounded-lg group"> 
            <span class="absolute w-0 h-0 transition-all duration-500 ease-out bg-blue-500 rounded-full group-hover:w-60 group-hover:h-56"></span>
            <span class="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
            <span class="relative">New Graduate</span>
        </router-link>
    </div>
    <table class="grade-table">
      <thead>
        <tr>
          <th class="bg-blue-600">ID</th>
          <th class="bg-blue-400 text-white">Student Name</th>
          <th class="bg-green-400 text-white">Grade</th>
          <th class="bg-green-400 text-white">Classroom</th>
          <th class="bg-green-400 text-white">Section</th>
          <th class="bg-green-400 text-white">Academic Year</th>
          <th class="bg-blue-600">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(graduate, index) in graduates" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ graduate.student_last_name + ' '+ graduate.student_first_name}}</td>
          <td>{{ graduate.grad_name  }}</td>
          <td>{{ graduate.classroom_name }}</td>
          <td>{{ graduate.section_name }}</td>
          <td>{{ graduate.academic_year }}</td>
          <td>
            <button @click="restore(graduate.id)" class="btn-update hover:text-green-600">
              Return Back
            </button>
            <button @click="deleteStudent(graduate.id)"  class="btn-delete">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style>
.create-grade {
    font-size: 1.2rem;
}
.grade-table-container {
  max-width: 100%;
    margin: auto;
    padding: 2rem;
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

@media (max-width:768px){
     .btn-delete {
        /* display: block; */
        margin-top: 8px;
    }
    
    .grade-table-container {
    padding-left: 13rem;
  }
}
</style>