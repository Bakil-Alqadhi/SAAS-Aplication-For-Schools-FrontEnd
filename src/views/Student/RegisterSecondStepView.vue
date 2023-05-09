<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const form= ref({
  parent_first_name: '',
  parent_last_name: '',
  parent_phone: '',
  parent_email:''
})

onMounted(()=>{
   const data = sessionStorage.getItem('parent_data')
    if(data){
      form.value = JSON.parse(data)
    }
})
const router = useRouter()
const data = ref(null)

const next = ()=>{
  console.log(data.value)
  sessionStorage.setItem('parent_data', JSON.stringify(form.value))
  //sessionStorage.setItem('student_data', JSON.stringify(form.value))
  router.push('/register-third-step')


}
</script>

<template>
  <div class="container mt-10 mx-auto">
    <form action="">
      <div class="w-full form px-6 py-12 md:w-1/2 mx-auto">
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
        <router-link to="/register-third-step" @click="next" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">next</router-link>
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