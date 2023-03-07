<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { storeDataStudents } from '../../store/storeDataStudents';
import { storeAuthUser } from '../../store/storeAuthUser';

const allTheStudents = computed(() => storeDataStudents.getters.students);
const authUser = computed(()=> storeAuthUser.getters.user)
watch( authUser, newValue => {
    storeDataStudents.dispatch('fetchStudents', newValue.school_id)
    console.log(allTheStudents);  

})

</script>
<template>
<!-- component -->
<section v-if="allTheStudents" class="antialiased  mt-10 text-gray-600  px-1">
    <div class="flex flex-col justify-center  h-full">
        <!-- Table -->
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
                                        <div class="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3"><img class="rounded-full" :src="student.image_path" width="40" height="40" alt="Alex Shatov"></div>
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
</section>
</template>
