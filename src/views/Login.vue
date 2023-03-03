<script setup>
import {
  computed,
  onMounted,
    ref,
    watch
} from 'vue'
import { store } from '../store/store';

const isDirector= ref(null)
const isTeacher= ref(null)
const isStudent= ref(null)

watch(isDirector, (newValue)=>{

    console.log(newValue)
})
const form = ref({
    email: '',
    password: ''
}
)
const errors = computed(()=>store.getters.errors)
const authStatus = computed(()=>store.getters.authStatus)

 function handelSubmit(){
     store.dispatch('handleLogin',form.value)
}
onMounted(()=>{
    store.dispatch('resetAuthStatus')
    // console.log(store)
})
</script>
<template>
<!-- component -->
<div class="flex w-full m-auto lg:w-1/2 justify-center items-center p-4 space-y-8">
    <div class="w-full px-8 md:px-32 lg:px-24">
        <form @submit.prevent="handelSubmit" class="bg-white rounded-lg shadow-2xl p-5">
            <h1 class="text-gray-800 font-bold text-2xl mb-1">Hello Again!</h1>
            <div v-if="authStatus" class="bg-green-100 rounded-lg py-5 px-6 mb-3 text-base text-green-700 inline-flex items-center w-full" role="alert">
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check-circle" class="w-4 h-4 mr-2 fill-current" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path fill="currentColor" d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path>
                </svg>
                {{ authStatus }}
            </div>
            <p class="text-sm font-normal text-gray-600 mb-8">Welcome Back</p>
             <div class="mb-8 flex justify-between flex-wrap">

                <div class="block border-2 p-2 mb-2 rounded-lg">
                    <input type="checkbox" v-model="isDirector" class="mr-2 top-1" name="director" id="director">
                    <label for="director" class="text-sm">Director</label>
                </div>
                <div class="block border-2 p-2 mb-2 rounded-lg">
                    <input type="checkbox" v-model="isTeacher" class="mr-2 top-1" name="Teacher" id="teacher">
                    <label for="teacher" class="text-sm">Teacher</label>
                </div>

                <div class="block border-2 p-2 mb-2 rounded-lg">
                    <input type="checkbox" v-model="isStudent" class="mr-2 top-1" name="Student" id="student">
                    <label for="student" class="text-sm">Student</label>
                </div>

            </div>
            <div class="mb-8">
                <div class="flex items-center border-2  py-2 px-3 rounded-2xl">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
                <input id="email" v-model="form.email" class=" pl-2 w-full outline-none border-none" type="email"  placeholder="Email Address" />
            </div>
                <span v-if="errors.email" class="text-sm ml-3 text-red-600"> {{ errors.email[0] }}</span>
            </div>
            <div class="mb-8">
                <div class="flex items-center border-2 py-2 px-3 rounded-2xl ">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <input v-model="form.password" class="pl-2 w-full outline-none border-none" type="password" name="password" id="password" placeholder="Password" />
            </div>
            <span v-if="errors.password" class="text-sm ml-3 text-red-600"> {{ errors.password[0] }}</span>
            </div>
            <button type="submit" class="block w-full bg-indigo-600 mt-5 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2">Login</button>
            <div class="flex justify-between mt-4">
                <RouterLink to="/forgot-password" class="text-sm ml-2 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all">Forgot Password ?</RouterLink>

                <RouterLink :to="{ name: 'Register'}" class="text-sm ml-2 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all">Don't have an account yet?</RouterLink>
            </div>
        </form>
    </div>
</div>
</template>
