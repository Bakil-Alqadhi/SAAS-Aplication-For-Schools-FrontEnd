<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { mapActions } from "vuex";
import { storeDataSchools } from "../../../store/storeDataSchools";

const grades = computed( ()=> storeDataSchools.getters.grades)
const message = computed( ()=> storeDataSchools.getters.gradeMessage)

const updateGrade = (index) => {

}
function launch_toast() {
    var x = document.getElementById("toast")


    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 4000);
}
onMounted( async()=>{
  if(message.value){
    launch_toast()
  }
    mapActions['fetchGrades']
    await storeDataSchools.dispatch('fetchGrades');
})


const deleteGrade =async (id)=> {
  if(confirm("Are you sure, the classrooms which connect to this grade will be deleted?")){
    mapActions(['deleteGrade', id])
    // await storeDataSchools.dispatch('deleteGrade', id)
    if(storeDataSchools.dispatch('deleteGrade', id)){
      launch_toast()
    }
  }
}

</script>
<template>
<div v-if="grades" class="grade-table-container">   
     <!-- bg-green-500  -->
    <div class="flex justify-between">
        <router-link to="/grade/create"  class="relative create-grade inline-flex items-center justify-center px-10 py-4 mb-5 overflow-hidden font-bold tracking-tighter  text-white bg-green-600 rounded-lg group">
            <span class="absolute w-0 h-0 transition-all duration-500 ease-out bg-blue-500 rounded-full group-hover:w-60 group-hover:h-56"></span>
            <span class="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
            <span class="relative">New Grade</span>
        </router-link>
    </div>
    <table class="grade-table">
      <thead>
        <tr>
          <th>Id</th>
          <th>Grade Name</th>
          <th>Grade Number</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(grade, index) in grades" :key="index">
          <td>{{ index+1 }}</td>
          <td>{{ grade.name }}</td>
          <td>{{ grade.number }}</td>
          <td >
            <router-link :to="{name: 'EditGrade', params:{id: grade.id}}"  class="btn-update ">Update</router-link>
            <button  @click="deleteGrade(grade.id)" class="btn-delete">Delete</button>
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
   
  max-width: 90%;
    /* margin: auto; */
    padding: 2rem;
  }

  .grade-table {
    border-collapse: collapse;
    width: 100%;
    font-size: 1.2rem;
    text-align: left;
    overflow: hidden;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
    border-radius: 10px 10px 0 0;
  }

  .grade-table th {
    background-color: rgb(87, 87, 202);
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

  .btn-update {
    padding: 0.6rem 1rem;
    border: none;
    border-radius: 4px;
    font-size: 0.9rem;
    margin-right: 0.6rem;
    cursor: pointer;
    transition: transform 0.3s ease-in-out;
  }

  .btn-update:hover {
    transform: translateY(-3px);
  }

  .btn-update {
    background-color: #4caf50;
    color: #fff;
  }
@media (max-width:768px){

  .grade-table-container {
    margin-left:  11rem;
  }
}
</style>