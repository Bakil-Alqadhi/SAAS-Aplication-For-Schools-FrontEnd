<script setup>
import {
  computed,
    onMounted,
    ref,
    watch,
} from "vue";
import { mapActions } from "vuex";
import { storeDataSchools } from "../../store/storeDataSchools"; 
import { useRouter } from "vue-router";
const schoolsData = computed(() => storeDataSchools.getters.schools);
// const selectedSchool = ref('')
// watch(selectedSchool, (currentValue)=>{
//   console.log(currentValue)
// })
const router= useRouter()
onMounted(() => {
    mapActions['fetchSchools']
    storeDataSchools.dispatch("fetchSchools");
   const data = sessionStorage.getItem('student_data')
    if(data){
      form.value = JSON.parse(data)
    }
})

const form = ref({
  student_first_name: '',
  student_middle_name: '',
  student_last_name: '',
  student_phone: '',
  student_email:'',
  student_address:'',
  sex: '',
  birthday: ''
})
// const student_image = ref('')
// const grabFile = (e)=>{
//     student_image.value = e.target.files[0]
//     console.log(e.target.files[0] );

// }

function submitted(){
   // form.value.image_path = student_image.value
    sessionStorage.setItem('student_data', JSON.stringify(form.value))
    router.push('/register-second-step')
}
</script>

<template>
  <div class="container top-10 mx-auto">
    <div class="w-ful form px-6 py-12 md:w-1/2 mx-auto">
      <div class="mb-6">
        <h2 class="text-2xl font-bold mb-2">Step 1: Student Information</h2>
        <div class="bg-white shadow-md grid lg:grid-cols-2 md:grid-cols-1 gap-x-10 rounded px-8 pt-6 pb-0 mb-4">
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2" for="first-name">
              First Name
            </label>
            <input v-model="form.student_first_name" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="first-name" type="text" placeholder="Enter first name">
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2" for="middle-name">
              Middle Name
            </label>
            <input v-model="form.student_middle_name" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="middle-name" type="text" placeholder="Enter middle name">
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2" for="last-name">
              Last Name
            </label>
            <input v-model="form.student_last_name" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="last-name" type="text" placeholder="Enter last name">
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2" for="email">
              Email
            </label>
            <input v-model="form.student_email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Enter email address">
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2" for="phone">
              Phone
            </label>
            <input v-model="form.student_phone" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="phone" type="tel" placeholder="Enter phone number">
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2" for="birthday">
              Birthday
            </label>
            <input v-model="form.birthday" class="shadow appearance-none border rounded w-full py-2 px-3" id="birthday" type="date">
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2" for="sex">
              Sex
            </label>
            <select v-model="form.sex" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="sex">
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2" for="last-name">
              Student Address
            </label>
            <input v-model="form.student_address" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="student_address" type="text" placeholder="Enter your address">
          </div>
          </div>
      </div>
      <div class="flex justify-end ">
        <button @click="submitted"  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Next</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.form {
  border: 1px solid blue;
  border-radius: 10px;
  font-size: medium;
}

h2 {
  width: 100%;
    /* background-color: blue ; */
    border: 1px solid blue;
    padding: 4px;
    color: blue ;
    border-radius: 5px;
    text-align: center;
    margin: 0 0 20px;
    font-size: large;
    font-weight: bold;
}
label {
    background-color: rgb(221, 221, 232);
    color: blue ;
    border: 1px solid blue;
    width: 100%;
    font-size: medium;
    padding-left: 4px;
    border-radius: 5px;
}

form input {
    border: 1px solid rgb(210, 210, 213);
}
</style>