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
const teacher = computed(()=> storeDataTeachers.getters.teacher)
const errors = computed(()=> storeDataTeachers.getters.errors);

const props = defineProps({
    id:String
})
onMounted( async() => {
    mapActions['fetchSchools']
    await storeDataTeachers.dispatch("fetchOneTeacher", props.id );
    await storeDataSchools.dispatch("fetchSchools");
    await storeDataSchools.dispatch("fetchSpecializations");
})

const image_url = ref('')
const url = ref('')
const grabFile = (e) => {
    image_url.value = e.target.files[0]
    url.value = URL.createObjectURL(image_url);
}

function submit() {
    try{
        const storageRef = Ref( storage,'Teachers/'+ image_url.value.name);
        uploadBytes(storageRef, image_url.value ).then(
            (snapshot ) => {
                // Get the download URL of the uploaded file
                getDownloadURL(snapshot.ref).then((url) => {
                    teacher.value.image = url;
                    console.log('File download URL:', url);
            // Use the URL to display the image or store it in your database
            });
        }).catch((error) => {
            console.log(error);
        });
        mapActions['handleTeacherRegister', teacher.value]
        storeDataTeachers.dispatch('updateTeacher', teacher.value)
        // console.log(teacher.value)
    } catch(err){
        console.log(err)
    }
}
</script>

<template>
<div v-if="teacher" class="container top-10 mx-auto">
    <form @submit.prevent="submit" class=" ">
        <h2 class="">Your Profile</h2>
        <div class="form-container">
            <div class="mb-4 element">
                <label class=" " for="first-name">
                    First Name
                </label>
                <input v-model="teacher.first_name" id="first-name" type="text" placeholder="Enter first name">
                <span v-if="errors.first_name" class="text-red-500 text-md">{{ errors.first_name[0] }}</span>
            </div>
            <div class="mb-4 element">
                <label  for="last-name">
                    Last Name
                </label>
                <input v-model="teacher.last_name"  id="last-name" type="text" placeholder="Enter last name">
                <span v-if="errors.last_name" class="text-red-500 text-md">{{ errors.last_name[0] }}</span>

            </div>
            <!-- <div class="mb-4 element">
                <label  for="school">
                    Choose School
                </label>
                <select v-model="form.school_id" name="" id="school" >
                    <option value="">All Schools</option>
                    <option v-for="school in schoolsData" :key="school.id" :value="school.id">{{ school.school_name }}</option>
                </select>
            </div>
            <div class="mb-4 element">
                <label  for="school">
                    Choose Specialization
                </label>
                <select v-model="form.specialization" name="" id="school" >
                    <option value="">All Specializations</option>
                    <option v-for="specialization in specializations" :key="specialization.id" :value="specialization.id">{{ specialization.name }}</option>
                </select>
            </div> -->
            <div class="mb-4 element">
                <label  for="image">
                    Image
                </label>
                <input @change="grabFile"  id="image" type="file">
                <!-- <div v-if="url" class="preview"> 
                    <img :src="url" alt="">
                </div> -->
            </div>
            <div class="mb-4 element">
                <label  for="email">
                    Email
                </label>
                <input v-model="teacher.email"  id="email" type="email" placeholder="Enter email address">
                <span v-if="errors.email" class="text-red-500 text-md">{{ errors.email[0] }}</span>
            </div>
            <div class="mb-4 element">
                <label  for="phone">
                    Phone
                </label>
                <input v-model="teacher.phone"  id="phone" type="tel" placeholder="Enter phone number">

                <span v-if="errors.phone" class="text-red-500 text-md">{{ errors.phone[0] }}</span>

            </div>
            <div class="mb-4 element-text">
                <label  for="about">
                    About
                </label>
                <textarea v-model="teacher.about"  id="about" type="text" placeholder="about you"></textarea>
                <span v-if="errors.about" class="text-red-500 text-md">{{ errors.about[0] }}</span>

            </div>
            <!-- <div class="mb-8">
                <label  for="password">
                    Password
                </label>
                <input v-model="form.password"  id="birthday" type="password">
                <span v-if="errors.password" class="text-sm ml-3 text-red-600"> {{ errors.password[errors.password.length -1] }}</span>
            </div>
            <div class="mb-8">
                    <label  for="password_confirmation">
                        Password Confirmation
                    </label>
                    <input v-model="form.password_confirmation"  id="password_confirmation" type="password">
                    <span v-if="errors.password" class="text-sm ml-3 text-red-600"> {{ errors.password[0] }}</span>
            </div> -->
        </div>
        <div class="text-center">
            <button type="submit" class="btn-update" >Update</button>
        </div>
    </form>
</div>
</template>
<style scoped>
.preview img {
    max-width: 100%;
    max-height: 120px;
}
.container form  {
    /* background-color: rgb(217, 220, 217)  ; */
    border: 1px solid blue;
    border-radius: 10px;
    padding: 10px;
    width: 70%;
    margin:30px auto;
}
.container .form-container {
    /* background-color: red; */
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    height: auto;
}

.container .form-container .element {
    /* background-color: rgb(0, 183, 255); */
    /* background-color: white; */
    /* border: 1px solid blue; */
    background-color: rgb(217, 220, 217)  ;
    color: black;
    min-width: 45%;
    padding: 5px;
    min-height: 50px;
    margin: 20px 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 5px;
}
.container .form-container .element-text {
    background-color: rgb(0, 183, 255);
    /* background-color: white; */
    /* border: 1px solid blue; */
    color: black;
    min-width: 80%;
    padding: 5px;
    min-height: 50px;
    margin: 20px 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 5px;
}
.container form h2 {
    width: 100%;
    /* background-color: blue ; */
    background-color: rgb(221, 221, 232);
    border: 1px solid blue;
    padding: 4px;
    color: blue ;
    border-radius: 5px;
    text-align: center;
    margin: 0 0 20px;
    font-size: 40px;
    font-weight: bold;
}
.container .form-container .element label,
.container .form-container .element-text label
 {
    background-color: rgb(221, 221, 232);
    color: blue ;
    border: 1px solid blue;
    /* width: 100%; */
    font-size: medium;
    padding-left: 4px;
    border-radius: 5px;
    display: block;
    margin-bottom: 10px;

}

select {
    color: gray;
    font-size: medium;
    border-radius: 5px;
}
textarea {
    color: gray;
    font-size: medium;
    padding-left: 5px;
    min-width: 100px;

    border-radius: 5px; 
}
.container .form-container .element input {
    border: 1px solid rgb(210, 210, 213);
    border-radius: 5px;
    font-size: medium;
    padding-left: 5px;
}

.container .btn-update {
    background-color: rgb(51, 169, 27)  ;
    padding: 5px;
    font-size: medium;
    border-radius: 5px;
    margin-left: 0;
}
.container .btn-update:hover {
    background-color: rgb(51, 149, 27)  ;
    padding: 6px;
}

@media (max-width:768px){
    .container .form-container .element {
        min-width: 100px;
    }

    textarea {
        min-width: 100px;

    }

}
</style>