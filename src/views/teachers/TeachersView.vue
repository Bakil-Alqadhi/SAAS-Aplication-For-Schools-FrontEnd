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
<div v-else class="flex justify-start mt-5 ml-10 items-start h-screen">
    <div class="w-full max-w-6xl mx-4">
        <h2 class="text-2xl font-bold mb-6  left-2text-center">All The Teachers</h2>
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
                            <router-link :to="{name: 'TeacherDetailView', params:{id: teacher.id}}" href="#" class="inline-block px-3 py-2 bg-white  font-bold rounded-full hover:bg-blue-500 hover:text-white">
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
</template>
