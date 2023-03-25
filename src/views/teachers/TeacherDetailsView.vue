<script setup>
import { computed, onMounted, watch } from 'vue';
import { storeDataTeachers } from '../../store/storeDataTeachers';
import { storeAuthUser } from '../../store/storeAuthUser';
const teacher = computed(()=> storeDataTeachers.getters.teacher);
const props= defineProps({
    id: String
})
onMounted(()=>{
  storeDataTeachers.dispatch('fetchOneTeacher', { teacher: props.id })
})
// const authUser = computed(() => storeAuthUser.getters.user);

// watch(authUser, newValue =>{
//   storeDataTeachers.dispatch('fetchOneTeacher', { teacher: props.id })
// })
</script>
<template>
<div v-if="teacher" class="flex items-center m-10 justify-between">
  <div class="max-w-screen-lg mx-auto rounded-lg overflow-hidden  bg-white flex">
    <div class="w-1/3 border-r border-gray-200">
      <img :src="teacher.image" alt="Teacher Image" class="w-full h-full object-cover border border-gray-300">
    </div>
    <div class="w-2/3 p-6">
      <h1 class="text-3xl font-bold mb-2">{{ teacher.first_name +' '+ teacher.last_name }}</h1>
      <div class="flex items-center mb-2">
        <div class="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
        <p class="text-gray-700">Available</p>
      </div>
      <h2 class="text-lg font-bold mb-2">{{ teacher.about }}</h2>
      <p class="text-gray-700 text-base">
        {{ teacher.about }}      
      </p>
      <h2 class="text-lg font-bold mt-4 mb-2">Contact</h2>
      <p class="text-gray-700 text-base">
        Email: <a href="mailto:teacher-email@example.com" class="text-blue-600 hover:underline">{{ teacher.email }}</a><br>
        Phone: <span class="text-gray-600">{{ teacher.phone }}</span>
      </p>
      <h2 class="text-lg font-bold mt-4 mb-2">Subject and Classes</h2>
      <p class="text-gray-700 text-base">
        Subject: <span class="text-blue-600">Mathematics</span><br>
        Classes: <span class="text-blue-600">Grade 9, Grade 10</span>
      </p>
    </div>
  </div>
</div>

</template>
