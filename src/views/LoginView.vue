<script setup>
import {
  computed,
  onMounted,
    ref,
    watch
} from 'vue'
import { mapActions } from 'vuex';
import { storeDataSchools } from '../store/storeDataSchools'; 
import { storeDataTeachers } from '../store/storeDataTeachers';
import { storeDataStudents } from '../store/storeDataStudents';
import { storeAuthUser } from '../store/storeAuthUser';


const form = ref({
    email: '',
    password: '',
    school_id: ''
}
)
const errors1 =computed(()=>storeDataSchools.getters.errors)
const errors2 =computed(()=>storeDataTeachers.getters.errors)
const errors3 =computed(()=>storeDataStudents.getters.errors)
const moreOne =ref(null)
const showLogin=ref(null)
const isDirector= ref(false)
const isTeacher= ref(false)
const isStudent= ref(false)
const schoolRequired = ref(false)

const schoolsData = computed(() => storeDataSchools.getters.schools);
watch(isDirector, (newValue)=>{
    if(newValue && !isTeacher.value &&  !isStudent.value){
        console.log(newValue)
        moreOne.value = false
        showLogin.value = true
    } else if ( !newValue && ((isTeacher.value && !isStudent.value) || (!isTeacher.value && isStudent.value))){
        moreOne.value = false
        showLogin.value = true
    } else {
        moreOne.value = true
        showLogin.value=  false
    }

})
//watch isTeacher
watch(isTeacher, (newValue)=>{
    if(newValue && (!isDirector.value && !isStudent.value)){
        moreOne.value = false
        showLogin.value = true
    } else if ( !newValue && ((isDirector.value && !isStudent.value) || (!isDirector.value && isStudent.value))){
        moreOne.value = false
        showLogin.value = true
    } else {
        moreOne.value = true
        showLogin.value=  false
    }
})
//watch is Student
watch(isStudent, (newValue)=>{
    if(newValue && (!isDirector.value && !isStudent.value)){
        moreOne.value = false
        showLogin.value = true
    } else if ( !newValue && ((isTeacher.value && !isDirector.value) || (!isTeacher.value && isDirector.value))){
        moreOne.value = false
        showLogin.value = true
    } else {
        moreOne.value = true
        showLogin.value=  false
    }
})


const handelSubmit = () =>{
        if(isDirector.value){
        // mapActions['handleSchoolLogin', form.value]
            if(storeDataSchools.dispatch('handleSchoolLogin',form.value)){
                //storeAuthUser.dispatch('getUser')
            }
        // errors =computed(()=>storeDataSchools.getters.errors)
        } else if( isTeacher.value){
            // mapActions['handleTeacherLogin', form.value]
            if(form.value.school_id){
                if(storeDataTeachers.dispatch('handleTeacherLogin', form.value)){
                  //  storeAuthUser.dispatch('getUser', 'teacher', form.value.school_id)
                }
            }else {
                schoolRequired.value = true;
            }

        } else if(isStudent.value){
            if(form.value.school_id){
                if(storeDataStudents.dispatch('handleStudentLogin', form.value)){
                    //storeAuthUser.dispatch('getUser', 'student', form.value.school_id)
                }
            }else {
                schoolRequired.value = true;
            }
        }  
}
onMounted(()=>{
    mapActions['fetchSchools']
    storeDataSchools.dispatch("fetchSchools");
    // storeDataSchools.dispatch('resetAuthStatus')
    // console.log(store)
})
</script>
<template>
<!-- component -->
<div  class="flex w-full m-auto lg:w-1/2 justify-center text-5xl items-center py-10 p-4 space-y-8">
    <div class="w-full px-8 md:px-32 lg:px-24">
        <div v-if="moreOne" class="bg-red-100 border error border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong class="font-bold">Wrong!</strong>
            <span class="block sm:inline"> Check Only One Field.</span>
        </div>
        <form @submit.prevent="handelSubmit" class="bg-white text-5xl rounded-lg shadow-2xl p-5">
            <h1 class="text-gray-800 font-bold text-center  mb-1">Hello Again!</h1>
            <!-- <div v-if="authStatus" class="bg-green-100 rounded-lg py-5 px-6 mb-3 text-base text-green-700 inline-flex items-center w-full" role="alert">
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check-circle" class="w-4 h-4 mr-2 fill-current" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path fill="currentColor" d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path>
                </svg>
                {{ authStatus }}
            </div> -->
            <!-- <p class="text-2xl font-normal text-gray-600 mb-8">Welcome Back</p> -->
             <div class="mb-8 flex justify-between flex-wrap">

                <div class="block border-2 parent p-2 mb-2 rounded-lg">
                    <input type="checkbox" v-model="isDirector" class="mr-2 top-1" name="director" id="director">
                    <label for="director" class="text-sm">Director</label>
                </div>
                <div class="block border-2 parent p-2 mb-2 rounded-lg">
                    <input type="checkbox" v-model="isTeacher" class="mr-2 top-1" name="Teacher" id="teacher">
                    <label for="teacher" class="text-sm">Teacher</label>
                </div>

                <div class="block border-2 parent p-2 mb-2 rounded-lg">
                    <input type="checkbox" v-model="isStudent" class="mr-2 top-1" name="Student" id="student">
                    <label for="student" class="text-sm">Student</label>
                </div>
            </div>
           <div v-if="showLogin">
            <div v-if="isStudent || isTeacher" class="mb-4">
                <label class="block shool text-gray-700 font-bold mb-2" for="school">
                Choose School
                </label>
                <select  v-model="form.school_id" name="" id="school"  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" >
                <option value="">All Schools</option>  
                <option  v-for="school in schoolsData" :key="school.id" :value="school.id">{{ school.school_name }}</option>
                </select>
                <div v-if="schoolRequired"> <span class="text-sm ml-3 text-red-600">Choose Your School</span></div>
            </div>
            <div  class="mb-8 input rounded-2xl">
                <div class="flex items-center border-2  py-2 px-3 rounded-2xl">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
                <input id="email" v-model="form.email" class=" pl-2 w-full outline-none border-none" type="email"  placeholder="Email Address" />
            </div>
            <!-- <div v-if="errors1 || errors2 || errors3">
                <span v-if="errors1.email" class="text-sm ml-3 text-red-600"> {{ errors1.email[0] }}</span>
                <span v-else-if="errors2.email" class="text-sm ml-3 text-red-600"> {{ errors2.email[0] }}</span>
                <span v-else-if="errors3.email" class="text-sm ml-3 text-red-600"> {{ errors3.email[0] }}</span>
            </div> -->
            </div>
                <div class="mb-8 input rounded-2xl">
                    <div class="flex items-center border-2 py-2 px-3 rounded-2xl ">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    <input v-model="form.password" class="pl-2 w-full outline-none border-none" type="password" name="password" id="password" placeholder="Password" />
                </div>
            <!-- <div v-if="errors1 || errors2 || errors3">
                    <span v-if="errors1.password" class="text-sm ml-3 text-red-600"> {{ errors1.password[0] }}</span>
                    <span v-else-if="errors2.password" class="text-sm ml-3 text-red-600"> {{ errors2.password[0] }}</span>
                    <span v-else-if="errors3.password" class="text-sm ml-3 text-red-600"> {{ errors3.password[0] }}</span>
            </div> -->
                </div>
                <button type="submit" class="block w-full bg-indigo-600 mt-5 py-5 pb-5 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2">Login</button>
                <!-- <div class="flex justify-between pb-6 mt-4">
                    <RouterLink to="/forgot-password" class="text-sm ml-2 link hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all">Forgot Password ?</RouterLink>

                    <RouterLink :to="{ name: 'Register'}" class="text-sm ml-2 link hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all">Don't have an account yet?</RouterLink>
                </div> -->
           </div>
        </form>
    </div>
</div>
</template>
<style scoped>
form {
  /* border: 1px solid blue; */
  font-size: medium;
  /* border-top: none; */
  padding-bottom: 10px;

}

.error, .link {
    font-size: medium;
}

h1 {
    text-align: center;
    margin: 0 0 20px;
}
h1, .shool {
  width: 100%;
    /* background-color: blue ; */
    background-color: rgb(221, 221, 232);

    border: 1px solid blue;
    padding: 5px;
    color: blue ;
    border-radius: 5px;
    font-weight: bold;
}
.parent, .link {
    background-color: rgb(221, 221, 232);
    color: blue ;
    border: 1px solid blue;
    padding: 10px;
    border-radius: 5px;
}
.input {
    border: 1px solid blue;
}

.parent label {
    font-size: large;
}
</style>