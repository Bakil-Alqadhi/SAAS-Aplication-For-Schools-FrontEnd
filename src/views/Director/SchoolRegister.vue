<script setup>
import {
    computed,
    ref
} from 'vue'
import {
    storeAuthSchools
} from '../../store/storeAuthSchools';

const errors = computed(() => storeAuthSchools.getters.errors)
const form = ref({
    name: '',
    school_name: '',
    about_school: '',
    about_director: '',
    school_image: '',
    director_image:'',
    address: '',
    phone: '',
    email: '',
    password: '',
    password_confirmation: ''
})


const grabFile1 = (e)=>{
    form.value.school_image = e.target.files[0]
    console.log(e.target.files[0] );
}

const grabFile2 = (e)=>{
    form.value.director_image = e.target.files[0]
    console.log(e.target.files[0] );
}

function register() {
    storeAuthSchools.dispatch('handleRegister', form.value)

}
</script>

<template>
<!-- component -->

<div class="m-auto p-10 space-y-8">
    <h1 class="font-bold text-lg text-center rounded-lg bg-blue-700 shadow-md text-white p-3">Registration New School</h1>
    <form @submit.prevent="register" class=" rounded-lg w-full bg-blue-700  p-5 grid gap-x-10 mb-6 md:grid-cols-2">

        <div class="">
            <div class="mb-6">
                <label for="first_name" class="block mb-2 text-m font-medium text-white">School Name</label>
                <input type="text" v-model="form.school_name" id="first_name" class="block bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-blue-700  w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="School" >
                <span v-if="errors.school_name" class="flex items-center font-medium tracking-wide text-red-600 text-xs mt-1 ml-1">
                    {{ errors.school_name[0] }}
                </span>
            </div>
            <div class="mb-6">
                <label for="image" class="block text-m font-medium text-white"><span>Logo For Your School</span></label>
                <div class="mt-1">
                    <input type="file"  id="image" class="bg-white w-full p-3 rounded-md" @change="grabFile1" />
                </div>
                <span v-if="errors.school_image" class="flex items-center font-medium tracking-wide text-red-600 text-xs mt-1 ml-1">
                    {{ errors.school_image[0] }}
                </span>
            </div>
            <div class="mb-6">
                <label for="phone" class="block mb-2 text-m font-medium text-white">Phone number</label>
                <input type="text" v-model="form.phone" id="phone" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-blue-700 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="123-45-678">
                <span v-if="errors.phone" class="flex items-center font-medium tracking-wide text-red-600 text-xs mt-1 ml-1">
                    {{ errors.phone[0] }}
                </span>
            </div>

            <div class="mb-6">
                <label for="email" class="block mb-2 text-m font-medium text-white">Email address</label>
                <input type="email" v-model="form.email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-blue-700 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="school.name@school.com" >
                <span v-if="errors.email" class="flex items-center font-medium tracking-wide text-red-600 text-xs mt-1 ml-1">
                    {{ errors.email[0] }}
                </span>
            </div>
            <div class="mb-6">
                <label for="first_name" class="block mb-2 text-m font-medium text-white">School's Address</label>
                <input type="text" v-model="form.address" id="first_name" class="block bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-blue-700  w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Address" >
                <span v-if="errors.address" class="flex items-center font-medium tracking-wide text-red-600 text-xs mt-1 ml-1">
                    {{ errors.address[0] }}
                </span>
            </div>
            <div class="mb-6">
                <label for="about" class="block text-m font-medium text-white">Describe Your School </label>
                <div class="mt-1">
                    <textarea id="about" v-model="form.about_school" name="about" rows="3" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:outline-blue-700  focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5" placeholder="about the school..." />
                </div>
                <span v-if="errors.about_school" class="flex items-center font-medium tracking-wide text-red-600 text-xs mt-1 ml-1">
                    {{ errors.about_school[0] }}
                </span>
            </div>

        </div>
        <!-- grid gap-6 mb-6 md:grid-cols-3 -->
        <div class="">
            <div class="mb-6">
                <label for="director_name" class="block mb-2 text-m font-medium text-white">Director's Full Name</label>
                <input type="text" v-model="form.name" id="director_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:outline-blue-700 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John John" >
                <span v-if="errors.name" class="flex items-center font-medium tracking-wide text-red-600 text-xs mt-1 ml-1">
                    {{ errors.name[0] }}
                </span>
            </div>
            <div class="mb-6">
                <label for="image" class="block text-m font-medium text-white"><span>Director's Photo</span></label>
                <div class="mt-1">
                    <input type="file" id="image" class="bg-white w-full p-3 rounded-md" @change="grabFile2" />
                </div>
                <span v-if="errors.director_image" class="flex items-center font-medium tracking-wide text-red-600 text-xs mt-1 ml-1">
                    {{ errors.director_image[0] }}
                </span>
            </div>
            <div class="mb-6">
                <label for="about" class="block text-m font-medium text-white">About Director</label>
                <div class="mt-1">
                    <textarea id="about" v-model="form.about_director" name="about" rows="3" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:outline-blue-700  focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5" placeholder="about the director..." />
                </div>
                <span v-if="errors.about_director" class="flex items-center font-medium tracking-wide text-red-600 text-xs mt-1 ml-1">
                    {{ errors.about_director[0] }}
                </span>
            </div>

            <div class="mb-6">
                <label for="password" class="block mb-2 text-m font-medium text-white ">Password</label>
                <input type="password" v-model="form.password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-blue-700 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" >
                <span v-if="errors.password" class="flex items-center font-medium tracking-wide text-red-600 text-xs mt-1 ml-1">
                    {{ errors.password[errors.password.length - 1] }}
                </span>
            </div>
            <div class="mb-6">
                <label for="confirm_password" class="block mb-2 text-m font-medium text-white">Confirm password</label>
                <input type="password" v-model="form.password_confirmation" id="confirm_password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-blue-700 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" >
            </div>
            <span v-if="errors.password" class="flex items-center font-medium tracking-wide text-red-600 text-xs mt-1 ml-1">
                    {{ errors.password[0] }}
                </span>
        </div>

    <button type="submit" class="text-blue-700 ml-auto bg-white hover:bg-gray-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
</form>
</div>
</template>
