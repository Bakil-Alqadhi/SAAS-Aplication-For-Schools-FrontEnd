<script setup>
import { computed, ref } from 'vue'
import { store } from '../store/store';
import { useRoute } from 'vue-router';

const route = useRoute()
const form = ref({
    email: route.query.email,
    token: route.params.token,
    password: '',
    password_confirmation: ''
}
)
const errors = computed(()=>store.getters.errors)
 function resetPassword(){
     store.dispatch('handleResetPassword',form.value)
}
</script>

<template>
<!-- component -->
<div class="flex w-full m-auto lg:w-1/2 justify-center items-center p-4 space-y-8">
    <div class="w-full px-8 md:px-32 lg:px-24">
        <form @submit.prevent="resetPassword" class="bg-white rounded-md shadow-2xl p-5">
            <h1 class="text-gray-800 font-bold text-2xl mb-1">Reset Password!</h1>
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
            <button type="submit" class="block w-full bg-indigo-600 mt-5 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2">Reset password</button>
            <div class="flex justify-between mt-4">
                <RouterLink to="/forgot-password" class="text-sm ml-2 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all">Forgot Password ?</RouterLink>

                <RouterLink :to="{ name: 'Register'}" class="text-sm ml-2 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all">Don't have an account yet?</RouterLink>
            </div>
        </form>
    </div>
</div>
</template>
