<script setup>
import {
  computed,
    ref
} from 'vue'
import {store} from '../store/store'
const errors = computed(()=>store.getters.errors)
const authStatus = computed(()=>store.getters.authStatus)
const form = ref({
    email: '',
})

function sendEmail(){
    store.dispatch('handleForgotPassword', form.value)
}
</script>

<template>
<!-- component -->
<div class="flex w-full m-auto lg:w-1/2 justify-center items-center p-4 space-y-8">
    <div class="w-full px-8 md:px-32 lg:px-24">
        <form @submit.prevent="sendEmail" class="bg-white rounded-md shadow-2xl p-5">
            <h1 class="text-gray-800 font-bold text-2xl mb-1">Forgot Password !</h1>
            <div v-if="authStatus" class="bg-green-100 rounded-lg py-5 px-6 mb-3 text-base text-green-700 inline-flex items-center w-full" role="alert">
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check-circle" class="w-4 h-4 mr-2 fill-current" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path fill="currentColor" d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path>
                </svg>
                {{ authStatus }}!
            </div>
            <div v-else>
                <p class="text-sm font-normal text-gray-600 mb-8">Enter Your Account's Email</p>
            <div class="mb-8">
                <div class="flex items-center border-2  py-2 px-3 rounded-2xl">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                    <input id="email" v-model="form.email" class=" pl-2 w-full outline-none border-none" type="email" placeholder="Email Address" />
                </div>
                <span v-if="errors.email" class="text-sm ml-3 text-red-600"> {{ errors.email[0] }}</span>
            </div>
            <button type="submit" class="block w-full bg-indigo-600 mt-5 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2">Send Password Reset Link</button>

            </div>
        </form>
    </div>
</div>
</template>
