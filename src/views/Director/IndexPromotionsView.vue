<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { mapActions } from "vuex";
import { storeDataSchools } from "../../store/storeDataSchools";

const promotions = computed( ()=> storeDataSchools.getters.promotions)

onMounted(()=>{
    // mapActions['fetchPromotions']
    storeDataSchools.dispatch('fetchPromotions');
})


const deleteClassroom =async (id)=> {
  if(confirm("Are you sure?")){
    mapActions(['deleteClassroom', id])
    if(storeDataSchools.dispatch('deleteClassroom', id)){
      launch_toast()
    }
  }
}

const deletePromotion = (type, id)=> {
    if(confirm("Are you sure?")){
        // if(id){
        //     storeDataSchools.dispatch('handleDeletePromotion', { type: 'one', id: id})
        // } else {
            mapActions(['handleDeletePromotion', { type: type, id: id}])
            storeDataSchools.dispatch('handleDeletePromotion', { type: type, id: id})
        // }
       
    }
}

</script>
<template>
  
<div v-if="promotions" class="grade-table-container">   
     <!-- bg-green-500  -->
    <div class="flex ">

      <!-- bg-gray-800 -->
        <router-link to="/promotions/create"  class="relative create-grade inline-flex items-center justify-center px-10 py-4 mb-5 overflow-hidden font-bold tracking-tighter  text-white bg-green-600 rounded-lg group"> 
            <span class="absolute w-0 h-0 transition-all duration-500 ease-out bg-blue-500 rounded-full group-hover:w-60 group-hover:h-56"></span>
            <span class="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
            <span class="relative">New Promotion</span>
        </router-link>
        <button @click="deletePromotion('all', null)"  class="relative ml-10 create-grade inline-flex items-center justify-center px-10 py-4 mb-5 overflow-hidden font-bold tracking-tighter  text-white bg-red-600 rounded-lg group"> 
            <span class="absolute w-0 h-0 transition-all duration-500 ease-out bg-red-500 rounded-full group-hover:w-60 group-hover:h-56"></span>
            <span class="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
            <span class="relative">Rollback All</span>
        </button>
    </div>
    <table class="grade-table">
      <thead>
        <tr>
          <th class="bg-blue-600">ID</th>
          <th class="bg-blue-400 text-white">Student Name</th>
          <th class="bg-red-400 text-white">Old Grade</th>
          <th class="bg-red-400 text-white">Old Academic Year</th>
          <th class="bg-red-400 text-white">Old Classroom </th>
          <th class="bg-red-400 text-white">Old Section</th>
          <th class="bg-green-400 text-white">New Grade</th>
          <th class="bg-green-400 text-white">New Academic Year</th>
          <th class="bg-green-400 text-white">New Classroom </th>
          <th class="bg-green-400 text-white">New Section</th>
          <th class="bg-blue-600">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(promotion, index) in promotions" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ promotion.student_name }}</td>
          <td>{{ promotion.from_grade }}</td>
          <td>{{ promotion.from_academic_year }}</td>
          <td>{{ promotion.from_classroom }}</td>
          <td>{{ promotion.from_section }}</td>
          <td>{{ promotion.to_grade }}</td>
          <td>{{ promotion.to_academic_year }}</td>
          <td>{{ promotion.to_classroom }}</td>
          <td>{{ promotion.to_section }}</td>
          <td>
                <!-- <router-link class="btn-show" :to="{name: 'ShowClassroom', params:{id: promotion.id}}">
                    <i class="far fa-eye hover:text-blue-500 hover:cursor-pointer"></i>
                </router-link> -->
            <button @click="deletePromotion('one', promotion.id)" class="btn-update hover:text-green-600">
              Rollback
            </button>
            <button   class="btn-delete">
              Graduate
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
    max-width: 600px;
    margin: 0 auto;
  }
}
</style>