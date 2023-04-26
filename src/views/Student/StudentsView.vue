<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { storeDataStudents } from '../../store/storeDataStudents';
import { storeAuthUser } from '../../store/storeAuthUser';

const allTheStudents = computed(() => storeDataStudents.getters.students);
// const authUser = computed(()=> storeAuthUser.getters.user)
// watch( authUser, newValue => {
//     storeDataStudents.dispatch('fetchStudents', newValue.school_id)
//     console.log(allTheStudents);  

// })

onMounted(()=>{
    storeDataStudents.dispatch('fetchStudents')
})
</script>
<template>
    <div  v-if="allTheStudents" class="grade-table-container">   
     <!-- bg-green-500  -->
    <div class="flex justify-between">

      <!-- bg-gray-800 -->
        <router-link to="/classrooms/create"  class="relative create-grade inline-flex items-center justify-center px-10 py-4 mb-5 overflow-hidden font-bold tracking-tighter  text-white bg-green-600 rounded-lg group"> 
            <span class="absolute w-0 h-0 transition-all duration-500 ease-out bg-blue-500 rounded-full group-hover:w-60 group-hover:h-56"></span>
            <span class="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
            <span class="relative">New Classroom</span>
        </router-link>
        <div id="toast"><div id="img">&#128522;</div><div id="desc">{{ message }}</div></div>
    </div>
    <table class="grade-table">
      <thead>
        <tr>
            <th>Id</th>
            <th>Image</th>
            <th>Full name</th>
            <th>Birthday</th>
            <th>Grade</th>
            <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(student, index) in allTheStudents" :key="index">
            <td>{{ index + 1 }}</td>
            <td>
                <img class="h-12 w-12 rounded-full object-cover" :src="student.image" alt="Teacher Image">
            </td>
            <td>{{ student.student_first_name + ' ' + student.student_last_name }}</td>
            <td>{{ student.birthday }}</td>
            <td>1</td>
            <td>
                <router-link :to="{name: 'WaitingStudentDetailView', params:{id: student.id}}" >
                    <i class="far fa-eye hover:text-blue-500 hover:cursor-pointer"></i>
                </router-link>
                
                <!-- <button  @click="deleteClassroom(student.id)" class="btn-delete">Delete</button> -->
            </td>
        </tr>
        <!-- Add more rows here -->
      </tbody>
    </table>
  </div>
<!-- component -->
<!-- <section v-if="allTheStudents" class="antialiased  mt-10 text-gray-600  px-1">
    <div class="flex flex-col justify-center  h-full">
        <div class="w-full max-w-6xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
            <header class="px-5 py-4 border-b border-gray-100">
                <h2 class="font-semibold text-gray-800">All The Students</h2>
            </header>
            <div class="p-3">
                <div class="overflow-x-auto">
                    <table class="table-auto w-full">
                        <thead class="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                            <tr>
                                <th class="p-2 whitespace-nowrap">
                                    <div class="font-semibold text-left">Id</div>
                                </th>
                                <th class="p-2 whitespace-nowrap">
                                    <div class="font-semibold text-left">Name</div>
                                </th>
                                <th class="p-2 whitespace-nowrap">
                                    <div class="font-semibold text-left">Birthday</div>
                                </th>
                                <th class="p-2 whitespace-nowrap">
                                    <div class="font-semibold text-left">Grid</div>
                                </th>
                                <th class="p-2 whitespace-nowrap">
                                    <div class="font-semibold text-center"></div>
                                </th>
                            </tr>
                        </thead>
                        <tbody class="text-sm divide-y divide-gray-100">
                            <tr v-for="(student, index) in allTheStudents" :key="index">
                                <td class="p-2 whitespace-nowrap">
                                    <div class="text-left">{{ index+1 }}</div>
                                </td>
                                <td class="p-2 whitespace-nowrap">
                                    <div class="flex items-center">
                                        <div class="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3"><img class="rounded-full" :src="student.image" width="40" height="40" alt="Alex Shatov"></div>
                                        <div class="font-medium text-gray-800">{{ student.student_first_name + ' ' + student.student_last_name }}</div>
                                    </div>
                                </td>
                                <td class="p-2 whitespace-nowrap">
                                    <div class="text-left">{{ student.birthday }}</div>
                                </td>
                                <td class="p-2 whitespace-nowrap">
                                    <div class="text-left font-medium text-green-500">1 </div>
                                </td>
                                <td class="p-2 whitespace-nowrap">
                                    <router-link :to="{name: 'StudentDetailView', params:{id: student.id}}" class="text-lg text-center text-blue-300 hover:text-blue-700 cursor-pointer">
                                      <i class="fa-solid fa-eye"></i>
                                    </router-link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</section> -->
</template>
<style scoped>

.create-grade {
    font-size: 1.2rem;
}
.grade-table-container {
    /* max-width: 600px;
    margin: 0 auto; */
    max-width: 100%;
    margin: 0 100px;
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
    /* left: 0; */
    right:1rem;
    top: 40px;
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

    .btn-delete {
        margin-top: 8px;
    }
    .grade-table-container {
        margin: 0 auto;
    }

}
</style>