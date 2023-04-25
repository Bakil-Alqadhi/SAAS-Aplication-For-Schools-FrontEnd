<script setup>
import { onMounted, computed, watch } from 'vue';
import {storeDataStudents} from '../../store/storeDataStudents';
import { storeDataTeachers } from '../../store/storeDataTeachers';

import { storeAuthUser } from '../../store/storeAuthUser';

const allTheStudents = computed(() => storeDataStudents.getters.students);
const allTheTeachers = computed(() => storeDataTeachers.getters.teachers);
const authUser = computed(() => storeAuthUser.getters.user);

watch(authUser, newValue =>{
    storeDataStudents.dispatch('fetchStudents', newValue.school_id)
    storeDataTeachers.dispatch('fetchTeachers', newValue.school_id)
})
onMounted( async()=>{
  storeAuthUser.dispatch('getUser')
})

</script>
<template>
     <!-- Statistics Cards -->
     <!-- {{ AllTheStudents }} -->
     <div v-if="authUser" class="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-4 p-4 gap-4">
          <!-- <div v-if="allTheStudents" class="bg-blue-500 dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
            <div class="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
              <svg width="30" height="30" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="stroke-current text-blue-800 dark:text-gray-800 transform transition-transform duration-500 ease-in-out"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
            </div>
            <div class="text-right">
              <p class="text-2xl">{{ allTheStudents.length }}</p>
              <p>Students</p>
            </div>
          </div> -->
          <div>
            <router-link  to="/students" v-if="allTheStudents" class="block bg-red-500  text-white rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1 hover:scale-105">
              <div class="px-6 py-4">
                <div class="font-bold text-xl  mb-2">{{ allTheStudents.length }}  Student(s)</div>
                <p class=" text-base">Click here to check all students who already jointed to your school</p>
              </div>
              <div class="px-6 py-4">
                <router-link to="/waiting" class="inline-block bg-white rounded-full mr-3 px-3 py-1 text-sm font-semibold text-blue-700 hover:text-blue-900">#waiting</router-link>
                <router-link to="/register-first-step" class="inline-block bg-white rounded-full mr-3 px-3 py-1 text-sm font-semibold text-blue-700 hover:text-blue-900">#new student</router-link>
              </div>
            </router-link>
          </div>
          <div>
            <router-link  to="/teachers" v-if="allTheTeachers" class="block bg-blue-700  text-white rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1 hover:scale-105">
              <div class="px-6 py-4">
                <div class="font-bold text-xl  mb-2">{{ allTheTeachers.length }}  Teacher(s)</div>
                <p class=" text-base">Click here to check all teachers who already jointed to your school</p>
              </div>
              <div class="px-6 py-4">
                <router-link to="/waiting" class="inline-block bg-white rounded-full mr-3 px-3 py-1 text-sm font-semibold text-blue-700 hover:text-blue-900">#waiting</router-link>
                <router-link to="/teacher-register" class="inline-block bg-white rounded-full mr-3 px-3 py-1 text-sm font-semibold text-blue-700 hover:text-blue-900">#new teacher</router-link>
              </div>
            </router-link>
          </div>
          <!-- <router-link to="/teachers" v-if="allTheTeachers" class="bg-green-400 dark:bg-gray-800 shadow-lg cursor-pointer rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
            <div class="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
              <span class="stroke-current text-blue-800 text-lg dark:text-gray-800 transform transition-transform duration-500 ease-in-out"> 
                <i class="fa-solid fa-person-chalkboard"></i>
              </span>
            </div>
            <div class="text-right">
              <p class="text-2xl">{{ allTheTeachers.length }}</p>
              <p>Teachers</p>
            </div>
          </router-link> -->
          <div>
            <router-link  to="/grades" class="block bg-red-400  text-white rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1 hover:scale-105">
              <div class="px-6 py-4">
                <div class="font-bold text-xl  mb-2">Create a New Grade</div>
                <p class=" text-base">Click here to create a new grade for Vue.js components.</p>
              </div>
              <div class="px-6 py-4">
                <span class="inline-block bg-white rounded-full px-3 py-1 text-sm font-semibold text-blue-700">#Grades</span>
              </div>
            </router-link>
          </div>

          <div>
            <router-link  to="/sections/create" class="block bg-orange-400  text-white rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1 hover:scale-105">
              <div class="px-6 py-4">
                <div class="font-bold text-xl  mb-2">Create New Section</div>
                <p class=" text-base">Click here to open create section's form.</p>
              </div>
              <div class="px-6 py-4">
                <span class="inline-block bg-white rounded-full px-3 py-1 text-sm font-semibold text-blue-700">#Grades</span>
              </div>
            </router-link>
          </div>
          
          <div>
            <router-link  to="/classrooms/create" class="block bg-green-400  text-white rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1 hover:scale-105">
              <div class="px-6 py-4">
                <div class="font-bold text-xl  mb-2">Create a New ClassRoom</div>
                <p class=" text-base">Click here to create a new classroom.</p>
              </div>
              <div class="px-6 py-4">
                <span class="inline-block bg-white rounded-full px-3 py-1 text-sm font-semibold text-blue-700">#Grades</span>
              </div>
            </router-link>
          </div>
          <div>
            <router-link  to="/classrooms/index" class="block bg-orange-400  text-white rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1 hover:scale-105">
              <div class="px-6 py-4">
                <div class="font-bold text-xl  mb-2">Show All ClassRooms</div>
                <p class=" text-base">Click here to check classrooms.</p>
              </div>
              <div class="px-6 py-4">
                <span class="inline-block bg-white rounded-full px-3 py-1 text-sm font-semibold text-blue-700">#Grades</span>
              </div>
            </router-link>
          </div>
        </div>
</template>