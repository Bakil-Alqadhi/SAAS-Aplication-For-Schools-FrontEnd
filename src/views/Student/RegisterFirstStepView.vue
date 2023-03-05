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
})

const form = ref({
  student_first_name: '',
  student_middle_name: '',
  student_last_name: '',
  school_id: '',
  student_phone: '',
  student_email:'',
  student_address:'',
  sex: '',
  birthday: '',
  image_path: '',
  password: '',
  password_confirmation: ''

  
})
const student_image = ref('')
const grabFile = (e)=>{
    student_image.value = e.target.files[0]
    console.log(e.target.files[0] );
    reader.readAsDataURL( e.target.files[0])

}

 const reader = new FileReader();
  reader.addEventListener('load', ()=>{
  console.log(reader.result)
  form.value.image_path = reader.result;
})
function submitted(){
    sessionStorage.setItem('student_data', JSON.stringify(form.value))
    router.push('/register-second-step')
}
</script>

<template>
  <div class="container top-10 mx-auto">
    <div class="w-full bg-blue-400 px-6 py-12 md:w-1/2 mx-auto">
      <div class="mb-6">
        <h2 class="text-2xl font-bold mb-2">Step 1: Student Information</h2>
        <div class="bg-white shadow-md grid lg:grid-cols-2 md:grid-cols-1 gap-x-10 rounded px-8 pt-6 pb-8 mb-4">
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
            <label class="block text-gray-700 font-bold mb-2" for="school">
              Choose School
            </label>
            <select  v-model="form.school_id" name="" id="school"  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" >
              <option value="">All Schools</option>  
              <option  v-for="school in schoolsData" :key="school.id" :value="school.id">{{ school.school_name }}</option>
            </select>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2" for="image">
              Image
            </label>
            <input @change="grabFile" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="image" type="file">
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
        
        <div class="mb-8">
          <label class="block text-gray-700 font-bold mb-2" for="password">
              Password
            </label>
                <div class="flex items-center border-2 py-2 px-3 rounded-2xl ">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <input v-model="form.password" class="pl-2 w-full outline-none border-none" type="password" name="password" id="password" placeholder="Password" />
            </div>
            <!-- <span v-if="errors.password" class="text-sm ml-3 text-red-600"> {{ errors.password[errors.password.length -1] }}</span> -->
            </div>
            <div class="mb-12">
              <label class="block text-gray-700 font-bold mb-2" for="password_confirmation">
              Password Confirmation
            </label>
                <div class="flex items-center border-2  py-2 px-3 rounded-2xl ">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <input v-model="form.password_confirmation" class="pl-2 w-full outline-none border-none" type="password" name="password_confirmation" id="password_confirmation" placeholder="Password Confirmation" />
            </div>
            <!-- <span v-if="errors.password" class="text-sm ml-3 text-red-600"> {{ errors.password[0] }}</span> -->
            </div>
          </div>
      </div>
      <div class="flex justify-between">
        <button @click="submitted"  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Next</button>
      </div>
    </div>
  </div>
</template>

