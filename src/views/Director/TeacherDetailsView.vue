<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { mapActions } from 'vuex';
import { storeAuthUser } from '../../store/storeAuthUser';
import { storeDataSchools } from '../../store/storeDataSchools';
import { storeDataTeachers } from '../../store/storeDataTeachers';
const teacher = computed(()=> storeDataTeachers.getters.teacher);
const authUser = computed(()=> storeAuthUser.getters.user);
const props= defineProps({
    id: String
})
const school_id = ref(null)
// watch(authUser, newValue=>{
//   mapActions['fetchOneTeacher', {  teacher: props.id }]
//   storeDataTeachers.dispatch('fetchOneTeacher', {  teacher: props.id });
//   school_id.value = newValue.school_id

// })
onMounted(()=>{
  mapActions['fetchOneTeacher',  props.id]
  storeDataTeachers.dispatch('fetchOneTeacher',  props.id );

})
const handleAccept = async()=>{
    await storeDataSchools.dispatch('acceptNewMember', {  
      'member_id' : props.id,
    'userType': 'teacher' 
  })
}
</script>
<template>
<div v-if="teacher && authUser" class="flex items-center m-10 justify-between">
  <div class="max-w-screen-lg mx-auto rounded-lg overflow-hidden  bg-white flex">
    <div class="w-1/3 border-r border-gray-200">
      <img :src="teacher.image
      " alt="Teacher Image" class="w-full h-full object-cover border border-gray-300">
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
<div class="text-center ">
  <button @click="handleAccept" v-if="teacher" class="bg-blue-600 p-2 hover:p-3 hover:bg-blue-700 font-bold rounded-lg  text-white">Accept</button>
  <button  v-else class="bg-blue-600 p-2 hover:p-3 hover:bg-blue-400  cursor-not-allowed font-bold rounded-lg  text-white">Accept</button>
</div>
</template>
