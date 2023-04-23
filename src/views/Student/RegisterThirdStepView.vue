<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { mapActions } from "vuex";
import { storeDataSchools } from "../../store/storeDataSchools";
import {  uploadBytes,  ref as Ref, getDownloadURL} from "firebase/storage";
import axios from "axios";

// const schoolsData = computed(() => storeDataSchools.getters.schools);
const schoolsData = computed(()=> storeDataSchools.getters.schools);
const gradesData = computed(()=> storeDataSchools.getters.grades);
const grades= ref({})
const form = ref({
    school_id: '',
    grade: '',
    image: '',
    password: '',
    password_confirmation: ''
})
const data_st = ref(null)
const data_pa = ref(null)
const image_url = ref('')
const school_id = ref('')
watch(gradesData, newValue => {
    grades.value = newValue
})
watch(school_id, newValue => {
    grades.value = ''
    // localStorage.setItem('school', newValue)
    axios.defaults.headers.common["X-School"] = newValue
    mapActions['fetchGrades']
    storeDataSchools.dispatch('fetchGrades');
})
onMounted(()=> {
    mapActions['fetchSchools']
    storeDataSchools.dispatch("fetchSchools");
    data_st.value = JSON.parse(sessionStorage.getItem('student_data'));
    data_pa.value = JSON.parse(sessionStorage.getItem('parent_data'));
})

const grabFile = (e) => {
    image_url.value = e.target.files[0]
    console.log(image_url.value)
}


function handleStudentRegister(){
    console.log({...data_st.value, ...data_pa.value, ...form.value});

    console.log(form.value.school_id)
    // try{
    //     const storageRef = Ref( storage,'Students/'+ image_url.value.name);
    //     uploadBytes(storageRef, image_url.value ).then(
    //         (snapshot ) => {
    //             // Get the download URL of the uploaded file
    //             getDownloadURL(snapshot.ref).then((url) => {
    //                 form.value.image = url;
    //                 console.log('File download URL:', url);
    //         });
    //     }).catch((error) => {
    //         console.log(error);
    //     });

    // } catch(err){
    //     console.log(err)
    // }
    // // storeDataStudents.dispatch('handleStudentRegister',{...data.value, ...form.value} )
    // //remove session
    // sessionStorage.removeItem('student_data')
    // sessionStorage.removeItem('parent_data')
}

</script>

<template>
  <div class="container mx-auto">
    <form action="" @submit.prevent="handleStudentRegister">
      <div class="w-full form px-6 py-12 md:w-1/2 mx-auto">
        <div class="mb-6">
        <h2 class="text-2xl font-bold mb-2">Step 3: Other Information</h2>
        <div class="bg-white shadow-md grid lg:grid-cols-2 md:grid-cols-1 gap-x-10 rounded px-8 pt-6 pb-0 mb-4">
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2" for="school">
              Choose School
            </label>
            <select  v-model="school_id" name="" id="school"  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" >
              <option value="">All Schools</option>  
              <option  v-for="school in schoolsData" :key="school.id" :value="school.id">{{ school.school_name }}</option>
            </select>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2" for="grade">
              Choose Grade
            </label>
            <select  v-model="form.grade" name="" id="grade"  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" >
              <option value="">All Grades</option>  
              <option  v-for="grade in grades" :key="grade.id" :value="grade.id">{{ grade.name }}</option>
            </select>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2" for="image">
              Image
            </label>
            <input @change="grabFile" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="image" type="file">
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
        <router-link to="/register-second-step" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" @click="previousStep">Previous</router-link>
        <button type="submit"  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Register</button>
      </div>
    </div>
    </form>
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