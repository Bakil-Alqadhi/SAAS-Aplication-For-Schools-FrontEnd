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
import { storeDataTeachers } from "../../store/storeDataTeachers";
import { storage } from '../../firebase'
import {  uploadBytes,  ref as Ref, getDownloadURL} from "firebase/storage"
const schoolsData = computed(() => storeDataSchools.getters.schools);
const specializations = computed(() => storeDataSchools.getters.specializations)
onMounted(() => {
    mapActions['fetchSchools']
    storeDataSchools.dispatch("fetchSchools");
    //storeDataSchools.dispatch("fetchSpecializations");
})

const form = ref({
    first_name: '',
    last_name: '',
    school_id: '',
    // specialization: '',
    phone: '',
    email: '',
    image: '',
    about: '',
    password: '',
    password_confirmation: ''
})
const image_url = ref('')
const grabFile = (e) => {
    image_url.value = e.target.files[0]
}

function submit() {
    try{
        const storageRef = Ref( storage,'Teachers/'+ image_url.value.name);
        uploadBytes(storageRef, image_url.value ).then(
            (snapshot ) => {
                // Get the download URL of the uploaded file
                getDownloadURL(snapshot.ref).then((url) => {
                    form.value.image = url;
                    console.log('File download URL:', url);
            // Use the URL to display the image or store it in your database
            });
        }).catch((error) => {
            console.log(error);
        });
        mapActions['handleTeacherRegister', form.value]
        storeDataTeachers.dispatch('handleTeacherRegister', form.value)
        console.log(form.value)
    } catch(err){
        console.log(err)
    }
}
</script>

<template>
<div class="container mt-10 top-10 mx-auto">
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
            <!-- <div class="mb-4">
                <label class="block text-gray-700 font-bold mb-2" for="school">
                    Choose Specialization
                </label>
                <select v-model="form.specialization" name="" id="school" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    <option value="">All Specializations</option>
                    <option v-for="specialization in specializations" :key="specialization.id" :value="specialization.id">{{ specialization.name }}</option>
                </select>
            </div> -->
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
            <div class="mb-4">
                <label class="block text-gray-700 font-bold mb-2" for="about">
                    About
                </label>
                <textarea v-model="form.about" class="shadow appearance-none border rounded w-full py-2 px-3 text-2xl text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="about" type="text" placeholder="about you"></textarea>
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
            <button type="submit" class="bg-blue-500  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline">Register</button>
        </div>
    </form>
</div>
</template>
<style >
.container form  {
    border: 1px solid blue;
    border-radius: 10px;
}
.container form h2 {
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
.container label {
    background-color: rgb(221, 221, 232);
    color: blue ;
    border: 1px solid blue;
    width: 100%;
    font-size: medium;
    padding-left: 4px;
    border-radius: 5px;

}

.container form input {
    border: 1px solid rgb(210, 210, 213);
    font-size: medium;

}
</style>