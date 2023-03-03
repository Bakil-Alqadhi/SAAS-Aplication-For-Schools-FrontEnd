<script setup>
import {
    computed,
    onMounted,
    ref,
    watch,
} from "vue";
import {
    mapActions
} from "vuex";
import {
    storeDataSchools
} from "../../store/storeDataSchools";
const schoolsData = computed(() => storeDataSchools.getters.schools);
onMounted(() => {
    mapActions['fetchSchools']
    storeDataSchools.dispatch("fetchSchools");
})

const form = ref({
    first_name: '',
    last_name: '',
    school_id: '',
    phone: '',
    student_email: '',
    image: '',
    password: '',
    password_confirmation: ''
})
const grabFile = (e) => {
    form.value.image = e.target.files[0]
}

function submit() {

}
</script>

<template>
<div class="container top-10 mx-auto">
    <form @submit.prevent="submit" class="w-full shadow-md bg-white px-6 py-12 md:w-1/2 mx-auto">
        <h2 class="text-2xl font-bold mb-2">Teacher Information</h2>
        <div class="bg-white  grid lg:grid-cols-2 md:grid-cols-1 gap-x-10 rounded px-8 pt-6 pb-8 mb-4">
            <div class="mb-4">
                <label class="block text-gray-700 font-bold mb-2" for="first-name">
                    First Name
                </label>
                <input v-model="form.first_name" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="first-name" type="text" placeholder="Enter first name">
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 font-bold mb-2" for="last-name">
                    Last Name
                </label>
                <input v-model="form.last_name" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="last-name" type="text" placeholder="Enter last name">
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 font-bold mb-2" for="school">
                    Choose School
                </label>
                <select v-model="form.school_id" name="" id="school" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    <option value="">All Schools</option>
                    <option v-for="school in schoolsData" :key="school.id" :value="school.id">{{ school.school_name }}</option>
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
                <input v-model="form.email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Enter email address">
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 font-bold mb-2" for="phone">
                    Phone
                </label>
                <input v-model="form.phone" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="phone" type="tel" placeholder="Enter phone number">
            </div>
            <div class="mb-8">
                <label class="block text-gray-700 font-bold mb-2" for="password">
                    Password
                </label>
                <input v-model="form.password" class="shadow appearance-none border rounded w-full py-2 px-3" id="birthday" type="password">
                <!-- <span v-if="errors.password" class="text-sm ml-3 text-red-600"> {{ errors.password[errors.password.length -1] }}</span> -->
            </div>
            <div class="mb-8">
                    <label class="block text-gray-700 font-bold mb-2" for="password_confirmation">
                        Password Confirmation
                    </label>
                    <input v-model="form.password_confirmation" class="shadow appearance-none border rounded w-full py-2 px-3" id="password_confirmation" type="password">
                    <!-- <span v-if="errors.password" class="text-sm ml-3 text-red-600"> {{ errors.password[0] }}</span> -->
            </div>
        </div>
        <div class="text-center">
            <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline">Register</button>
        </div>
    </form>
</div>
</template>
