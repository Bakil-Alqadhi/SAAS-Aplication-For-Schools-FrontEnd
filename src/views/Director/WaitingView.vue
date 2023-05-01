<script setup>
import { computed, onMounted, ref } from 'vue';
import { mapActions } from 'vuex';
import { storeDataTeachers } from '../../store/storeDataTeachers';
import { storeDataSchools } from '../../store/storeDataSchools';
import SpinnerLoading from '../../components/SpinnerLoading.vue'
const teachers = computed(()=> storeDataSchools.getters.waitingTeachers);
const accountTeachers = computed(()=> storeDataSchools.getters.waitingTeachers)
const accountStudents = computed(()=> storeDataSchools.getters.waitingStudents)
const showCards = ref(true);
const showTeachers = ref(false);
const showStudents = ref(false);
onMounted(()=>{
  mapActions['getWaitingRequests']
  storeDataSchools.dispatch('getWaitingRequests');
})
const hideCards = (title)=>{
    showCards.value = false;
    if(title === 'teachers'){
        showTeachers.value = true
    } else {
        showStudents.value = true
    }
}
</script>
<template>
    <!-- Cards the waiting students and teachers -->
<div v-if="showCards" class="flex flex-wrap justify-center p-8 items-center mt-8">
    <div @click="hideCards('teachers')"  class="bg-lime-600 cursor-pointer text-center rounded-lg shadow-md p-6 m-4 w-72 animate-pulse">
        <h2 class="text-xl text-white font-medium mb-4">Number of Teachers</h2>
        <p class="text-5xl font-bold text-white">{{ accountTeachers.length }}</p>
    </div>

    <div @click="hideCards('students')" class="bg-sky-400 cursor-pointer text-center rounded-lg shadow-md p-6 m-4 w-72 animate-pulse">
        <h2 class="text-xl text-white font-medium mb-4">Number of Students</h2>
        <p class="text-5xl font-bold text-white">{{ accountStudents.length }}</p>
    </div>
</div>
    <!-- Cards the waiting  teachers -->
<div v-else-if="showTeachers" class="flex justify-start mt-5 ml-10 text-4xl items-start h-screen">
    <div class="w-full max-w-6xl mx-4">
        <h2 class="text-4xl font-bold mb-6  left-2text-center">All Are Waiting For You To Accept Them</h2>
        <div class="bg-white shadow-md rounded my-6 overflow-x-auto">
            <table class="min-w-max w-full table-auto">
                <thead>
                    <tr class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <th class="py-3 px-6 text-left">ID</th>
                        <th class="py-3 px-6 text-left">Image</th>
                        <th class="py-3 px-6 text-left">Full Name</th>
                        <th class="py-3 px-6 text-left">Email</th>
                        <th class="py-3 px-6 text-left">Phone</th>
                        <th class="py-3 px-6 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody class="text-gray-600 text-sm font-light">
                    <tr v-for="(teacher, index) in teachers" :key="index" class="border-b border-gray-200 hover:bg-gray-100">
                        <td class="py-3 px-6 text-left text-black whitespace-nowrap">
                            {{ index+1 }}
                        </td>
                        <td class="py-3 px-6 text-left">
                            <img class="h-12 w-12 rounded-full object-cover" :src="teacher.image" alt="Teacher Image">
                        </td>
                        <td class="py-3 px-6 text-left whitespace-nowrap">
                            {{ teacher.first_name +' '+ teacher.last_name }}
                        </td>
                        <td class="py-3 px-6 text-left hidden sm:table-cell">
                            {{ teacher.email }}
                        </td>
                        <td class="py-3 px-6 text-left hidden sm:table-cell">
                            {{ teacher.phone }}
                        </td>
                        <td class="py-3 px-6 text-center">
                            <router-link :to="{name: 'WaitingTeacherDetailView', params:{id: teacher.id}}" href="#" class="inline-block px-3 py-2 bg-white  font-bold rounded-full hover:bg-blue-500 hover:text-white">
                                <svg class="h-6 w-6 eye text-blue-400 hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"></path>
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                </svg>
                            </router-link>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

</div>
    <!-- Cards the waiting students -->
<div v-if="showStudents" class="flex flex-col text-4xl m-10 rounded-lg">
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-blue-400">
              <tr>
                <th scope="col" class="px-6 py-3 text-left  font-medium text-white uppercase tracking-wider">
                  ID
                </th>
                <th scope="col" class="px-6 py-3 text-left  font-medium text-white uppercase tracking-wider">
                  Image
                </th>
                <th scope="col" class="px-6 py-3 text-left  font-medium text-white uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" class="px-6 py-3 text-left  font-medium text-white uppercase tracking-wider">
                  Email
                </th>
                <th scope="col" class="px-6 py-3 text-left  font-medium text-white uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="(student, index) in accountStudents" :key="student.id">
                <td class="px-6 py-4 whitespace-nowrap text-2xl font-medium text-gray-900">
                  {{ index + 1 }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-2xl font-medium text-gray-900">
                  <img :src="student.image" alt="Student Image" class="h-8 w-8 rounded-full">
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-2xl font-medium text-gray-900">
                  {{ student.student_first_name }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-2xl font-medium text-gray-900">
                  {{ student.student_email }}
                </td>
                <td class="px-2 py-4 whitespace-nowrap text-center text-3xl font-medium text-gray-900">
                    <router-link :to="{name: 'WaitingStudentDetailView', params:{id: student.id}}">
                        <i class="far fa-eye hover:text-blue-500 hover:cursor-pointer"></i>
                    </router-link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

</template>
