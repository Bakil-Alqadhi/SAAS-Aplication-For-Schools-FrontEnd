<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { mapActions } from "vuex";
import { storeDataSchools } from "../../../store/storeDataSchools";

const classrooms = computed( ()=> storeDataSchools.getters.classrooms)

onMounted( async()=>{
    mapActions['fetchClassrooms']
    await storeDataSchools.dispatch('fetchClassrooms');
})


const deleteClassroom =async (id)=> {
  if(confirm("Are you sure?")){
    mapActions(['deleteClassroom', id])
    if(storeDataSchools.dispatch('deleteClassroom', id)){
      launch_toast()
    }
  }
}

</script>
<template>
  
<div v-if="classrooms" class="grade-table-container">   
     <!-- bg-green-500  -->
    <div class="flex justify-between">

      <!-- bg-gray-800 -->
        <router-link to="/classrooms/create"  class="relative create-grade inline-flex items-center justify-center px-10 py-4 mb-5 overflow-hidden font-bold tracking-tighter  text-white bg-green-600 rounded-lg group"> 
            <span class="absolute w-0 h-0 transition-all duration-500 ease-out bg-blue-500 rounded-full group-hover:w-60 group-hover:h-56"></span>
            <span class="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
            <span class="relative">New Classroom</span>
        </router-link>
    </div>
    <table class="grade-table">
      <thead>
        <tr>
          <th>Id</th>
          <th>Classroom Name</th>
          <th>Grade</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(classroom, index) in classrooms" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ classroom.name }}</td>
          <td>{{ classroom.grade }}</td>
          <td>
            <router-link class="btn-show" :to="{name: 'ShowClassroom', params:{id: classroom.id}}">
                <i class="far fa-eye hover:text-blue-500 hover:cursor-pointer"></i>
            </router-link>
            <router-link :to="{name: 'EditClassroom', params:{id: classroom.id}}"  class="btn-update hover:text-green-600">
              <i class="fas fa-edit"></i>
            </router-link>
            <button  @click="deleteClassroom(classroom.id)" class="btn-delete">
              <i class="fa fa-trash" aria-hidden="true"></i>
            </button>
          </td>
        </tr>
        <!-- Add more rows here -->
      </tbody>
    </table>
  </div>
</template>

<style>
.create-grade {
    font-size: 1.2rem;
}
.grade-table-container {
    /* min-width: 100%;
    margin: 20px 117px;
    padding: 2rem;
    text-align: center; */

    max-width: 90%;
    /* margin: 0 auto; */
    margin: 0 120px;
    padding: 2rem;
  }

  .grade-table {
    border-collapse: collapse;
    min-width: 100%;
    font-size: 1.5rem;
    text-align: center;
    overflow: hidden;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
    border-radius: 10px 10px 0 0;
  }

  .grade-table th {
    background-color: rgb(87, 87, 202);
    /* background-color: #333; */
    color: #fff;
    padding: 0.8rem;
    font-weight: bold;
    text-transform: uppercase;
  }

  .grade-table td {
    padding: 0.8rem;
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
  }

  .btn-delete {
    /* background-color: #f44336; */
    color: #f44336;
  }


@media (max-width:768px){
  .btn-update,
  .btn-show{
        display: block;
        margin-top: 8px;
    }
    
    .grade-table-container {
    max-width: 600px;
    margin: 0 auto;
  }

  .grade-table {

    min-width: 70%;
  }
}
@media (max-width:1200px){

  .grade-table {

    min-width: 80%;
  }
}
</style>