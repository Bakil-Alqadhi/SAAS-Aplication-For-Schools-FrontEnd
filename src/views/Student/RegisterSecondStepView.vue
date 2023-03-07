<script setup>
import { onMounted, ref } from "vue";
import { storeDataStudents } from "../../store/storeDataStudents";

const form= ref({
  parent_first_name: '',
  parent_last_name: '',
  parent_phone: '',
  parent_email:''
})
const data = ref(null)
onMounted(()=> {
    data.value = JSON.parse(sessionStorage.getItem('student_data'));
})
const handleStudentRegister = ()=>{
    console.log({...data.value, ...form.value});

    storeDataStudents.dispatch('handleStudentRegister',{...data.value, ...form.value} )
    //remove session
    sessionStorage.removeItem('student_data')
}

</script>

<template>
  <div class="container mx-auto">
    <form action="" @submit.prevent="handleStudentRegister">
      <div class="w-full px-6 py-12 md:w-1/2 mx-auto">
      <div class="mb-6">
        <h2 class="text-2xl font-bold mb-2">Step 2: Parent's Information</h2>
        <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2" for="parent-first-name">
              Parent's First Name
            </label>
            <input v-model="form.parent_first_name" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="parent-first-name" type="text" placeholder="Enter parent's first name">
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2" for="parent-last-name">
              Parent's Lase Name
            </label>
            <input v-model="form.parent_last_name" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="parent-last-name" type="text" placeholder="Enter parent's last name">
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2" for="parent-email">
              Parent's Email
            </label>
            <input v-model="form.parent_email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="parent-email" type="email" placeholder="Enter parent's email address">
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2" for="parent-phone">
              Parent's Phone
            </label>
            <input v-model="form.parent_phone" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="parent-phone" type="tel" placeholder="Enter parent's phone number">
          </div>
        </div>
      </div>

      <div class="flex justify-between">
        <router-link to="/register-first-step" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" @click="previousStep">Previous</router-link>
        <button type="submit"  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Register</button>
      </div>
    </div>
    </form>
  </div>
</template>

