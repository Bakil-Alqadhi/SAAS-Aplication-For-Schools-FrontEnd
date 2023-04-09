<script setup>
import { computed, onMounted, ref } from 'vue';
import { mapActions } from 'vuex';
import { storeDataTeachers } from '../../store/storeDataTeachers';
import SpinnerLoading from '../../components/SpinnerLoading.vue';
const teachers =  computed(()=> storeDataTeachers.getters.teachers);
onMounted(()=>{
  mapActions['fetchTeachers']
  storeDataTeachers.dispatch('fetchTeachers');
})
</script>
<template>
<div v-if="!teachers" class="flex justify-center items-center">
    <SpinnerLoading />
</div>
<div v-else class="">
    <div class="grade-table-container">   
     <!-- bg-green-500  -->
    <div class="flex justify-between">
        <router-link to="/grade/create"  class="relative create-grade inline-flex items-center justify-center px-10 py-4 mb-5 overflow-hidden font-bold tracking-tighter  text-white bg-green-600 rounded-lg group">
            <span class="absolute w-0 h-0 transition-all duration-500 ease-out bg-blue-500 rounded-full group-hover:w-60 group-hover:h-56"></span>
            <span class="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
            <span class="relative">New Grade</span>
        </router-link>
    <div class="">
        <p>Created successfully</p>
    </div>
    </div>
    <table class="grade-table">
      <thead>
        <tr>
          <th>Id</th>
          <th>Image</th>
          <th>Full Name </th>
          <th>Email</th>
          <th>Phone</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(teacher, index) in teachers" :key="index" >
                        <td >
                            {{ index+1 }}
                        </td>
                        <td>
                            <img class="h-12 w-12 rounded-full object-cover" :src="teacher.image" alt="Teacher Image">
                        </td>
                        <td class="p">
                            {{ teacher.first_name +' '+ teacher.last_name }}
                        </td>
                        <td >
                            {{ teacher.email }}
                        </td>
                        <td>
                            {{ teacher.phone }}
                        </td>
                        <td>
                            <router-link :to="{name: 'TeacherDetailView', params:{id: teacher.id}}" href="#" class="inline-block px-3 py-2  bg-white border-solid border-2 border-blue-300  font-bold rounded-full hover:bg-blue-500 hover:text-white">
                                <svg class="h-6 w-6 eye text-blue-400  hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"></path>
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                </svg>
                            </router-link>
                        </td>

        </tr>
        <!-- Add more rows here -->
      </tbody>
    </table>
  </div>
</div>
</template>
<style>

.create-grade {
    font-size: 1.2rem;
}
.grade-table-container {

    /* background-color: red; */
    max-width: 800px;
    margin: 0 auto;
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
  .btn-delete {
    padding: 0.6rem 1rem;
    border: none;
    border-radius: 4px;
    font-size: 0.9rem;
    margin-right: 0.6rem;
    cursor: pointer;
    transition: transform 0.3s ease-in-out;
  }

  .btn-update:hover,
  .btn-delete:hover {
    transform: translateY(-3px);
  }

  .btn-update {
    background-color: #4caf50;
    color: #fff;
  }

  .btn-delete {
    background-color: #f44336;
    color: #fff;
  }

  #toast {
    visibility: hidden;
    max-width: 50px;
    height: 50px;
    /*margin-left: -125px;*/
    margin: auto;
    background-color: rgb(38, 195, 38);
    color: #fff;
    text-align: center;
    border-radius: 2px;

    position: fixed;
    z-index: 1;
    left: 0;right:0;
    bottom: 30px;
    font-size: 17px;
    white-space: nowrap;
}
#toast #img{
	width: 50px;
	height: 50px;
    
    float: left;
    
    padding-top: 16px;
    padding-bottom: 16px;
    
    box-sizing: border-box;

    
    background-color: rgb(158, 231, 32);
    color: #fff;
}
#toast #desc{

    
    color: #fff;
   
    padding: 16px;
    
    overflow: hidden;
	white-space: nowrap;
}

#toast.show {
    visibility: visible;
    -webkit-animation: fadein 0.5s, expand 0.5s 0.5s,stay 3s 1s, shrink 0.5s 2s, fadeout 0.5s 2.5s;
    animation: fadein 0.5s, expand 0.5s 0.5s,stay 3s 1s, shrink 0.5s 4s, fadeout 0.5s 4.5s;
}

@-webkit-keyframes fadein {
    from {bottom: 0; opacity: 0;} 
    to {bottom: 30px; opacity: 1;}
}

@keyframes fadein {
    from {bottom: 0; opacity: 0;}
    to {bottom: 30px; opacity: 1;}
}

@-webkit-keyframes expand {
    from {min-width: 50px} 
    to {min-width: 350px}
}

@keyframes expand {
    from {min-width: 50px}
    to {min-width: 350px}
}
@-webkit-keyframes stay {
    from {min-width: 350px} 
    to {min-width: 350px}
}

@keyframes stay {
    from {min-width: 350px}
    to {min-width: 350px}
}
@-webkit-keyframes shrink {
    from {min-width: 350px;} 
    to {min-width: 50px;}
}

@keyframes shrink {
    from {min-width: 350px;} 
    to {min-width: 50px;}
}

@-webkit-keyframes fadeout {
    from {bottom: 30px; opacity: 1;} 
    to {bottom: 60px; opacity: 0;}
}

@keyframes fadeout {
    from {bottom: 30px; opacity: 1;}
    to {bottom: 60px; opacity: 0;}
}

@media (max-width:768px){
     .btn-update {
        /* display: block; */
        margin-bottom: 3px;
    }
}
</style>