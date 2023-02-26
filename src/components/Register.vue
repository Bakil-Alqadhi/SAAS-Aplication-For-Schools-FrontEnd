<script setup>
import { computed, ref } from 'vue'
import { store } from '../store/store';

const errors = computed(()=>store.getters.errors)   
const form = ref({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
})
function register(){
    store.dispatch('handleRegister', form.value)

}
</script>

<template>
<!-- component -->
<div class="flex w-full m-auto lg:w-1/2 justify-center items-center p-4 space-y-8">
    <div class="w-full px-8 md:px-32  lg:px-24">
        <form @submit.prevent="register" class="bg-white rounded-md shadow-2xl p-5">
            <h1 class="text-gray-800 font-bold text-2xl mb-1">Hello !</h1>
            <p class="text-sm font-normal text-gray-600 mb-8">Welcome To Your First Step With Us :)</p>
            <div class="mb-8">
                <div class="flex items-center border-2  py-2 px-3 rounded-2xl">
                <svg fill="none" stroke="currentColor"  class="h-5 w-5 text-gray-400" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"></path>
                </svg>
                <input id="name" v-model="form.name" class="pl-2 w-full outline-none border-none" type="text"  placeholder="Name" />
            </div>
            <span v-if="errors.name" class="text-sm ml-3 text-red-600"> {{ errors.name[0] }}</span>
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
            <span v-if="errors.password" class="text-sm ml-3 text-red-600"> {{ errors.password[errors.password.length -1] }}</span>
            </div>
            <div class="mb-12">
                <div class="flex items-center border-2  py-2 px-3 rounded-2xl ">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <input v-model="form.password_confirmation" class="pl-2 w-full outline-none border-none" type="password" name="password_confirmation" id="password_confirmation" placeholder="Password Confirmation" />
            </div>
            <span v-if="errors.password" class="text-sm ml-3 text-red-600"> {{ errors.password[0] }}</span>
            </div>
            <button type="submit" class="block w-full bg-indigo-600 mt-5 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2">Login</button>
                <RouterLink to="/login" class="text-sm ml-2 mt-4 flex justify-start hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all">
                    <span>Sign in</span>
                    <svg fill="none" stroke="currentColor" class="h-5 w-5 mt-0.5 ml-2" stroke-width="1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"></path>
                    </svg>
                </RouterLink>
        </form>
    </div>
</div>
</template>
