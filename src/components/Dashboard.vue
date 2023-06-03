<script setup>
import DirectorSidebarLinks from './director/DirectorSidebarLinks.vue'
import TeacherSidebarLinks from './teacher/TeacherSidebarLinks.vue'
import StudentSidebarLinks from './student/StudentSidebarLinks.vue'
import {storeDataSchools} from '../store/storeDataSchools'
import SpinnerLoading from './SpinnerLoading.vue'
import AlerMessage from './AlerMessage.vue'

import {
    storeAuthUser
} from '../store/storeAuthUser';
import {
    computed,
    onMounted,
    onUnmounted,
    ref,
    watch
} from 'vue';
import { mapActions } from 'vuex';
import { useRouter } from "vue-router";

const router = useRouter()
const sideBar = ref('')
const user = ref('')
const authUser = computed(() => storeAuthUser.getters.user);
const goBack = ref('')
const url =  ref('')

onMounted( () => {
    sideBar.value = window.document.querySelector('.sidebar');
    user.value = window.document.querySelector('.user');
    goBack.value = document.querySelector('.btn-back')
    url.value = window.location.href

    

})

watch(url, newValue=>{
    if(newValue == 'http://127.0.0.1:3000/dashboard'){
        goBack.value.style.display = 'none';
    } else {
        goBack.value.style.display = 'block';
    }
})
watch(authUser, newValue =>{
    storeDataSchools.dispatch('getWaitingRequests', newValue.school_id)
})

const logout = async()=>{
    mapActions['handelLogout']
    storeAuthUser.dispatch('handleLogout');
}

const handleSideBar = ()=>{
    sideBar.value.classList.toggle('active');

}

const back = ()=> {
    router.go(-1);
}

// const checkUrl = ()=>{
//     // url.value = window.location.href
//     // if(url.value == 'http://127.0.0.1:3000/dashboard'){
//     //     goBack.value.style.display = 'none';
//     // } else {
//     //     goBack.value.style.display = 'block';
//     // }
//     console.log('slot changed');
// }
</script>
<template>
<!-- <SpinnerLoading /> -->
<div v-if="authUser">
    <div class="min-h-screen relative flex flex-col flex-auto flex-shrink-0 antialiased bg-white dark:bg-gray-700 text-black dark:text-white">
        <AlerMessage />
        <!-- Header -->
        <div class="fixed pt-15 w-full flex items-center header pl-40 justify-between text-white text-lg   bg-blue-600 z-10">
            <div class="flex items-center ml-40 school justify-start md:justify-center  pl-3 w-14 md:w-64 h-20 bg-blue-600 dark:bg-gray-800 border-none">
                <img class="w-7 h-7 md:w-10 md:h-10 mr-2 rounded-md overflow-hidden" :src="authUser.school_image" />
                <span v-if="authUser.userType === 'director'" class="hidden md:block">S. {{ authUser.school_name }}</span>
                <!-- <span v-if="authUser.userType === 'teacher'" class="hidden md:block">T. {{ authUser.last_name +' ' +  authUser.first_name }}</span>
                <span v-if="authUser.userType === 'student'" class="hidden md:block">Dear. {{ authUser.student_last_name + ' '+ authUser.student_first_name }}</span> -->
            </div>
            <!-- <div class="fex justify-between items-center w-auto  h-25 text-2xl bg-red-800 dark:bg-gray-800 header-right"> -->
                <div class="h-20 text-2xl flex items-center  bg-blue-600 dark:bg-gray-800 mr-0">
                <!-- <div class="bg-white rounded flex items-center w-full max-w-xl mr-4 p-2 shadow-sm border border-gray-200">
                    <button class="outline-none focus:outline-none">
                        <svg class="w-5 text-gray-600 h-5 cursor-pointer" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                    </button>
                    <input type="search" name="" id="" placeholder="Search" class="w-full pl-3 text-sm text-black outline-none focus:outline-none bg-transparent" />
                </div> -->
                <router-link to="" class="user mr-5 cursor-pointer"> <i class="fa-regular fa-user"></i> </router-link>
                <div id="menu-btn" @click="handleSideBar"  class="fas fa-bars  cursor-pointer"></div>
                <ul class="flex items-center">

                    <li>
                        <div class="block w-px h-6 mx-3 bg-gray-400 dark:bg-gray-700"></div>
                    </li>
                    <li>
                        <a @click="logout" class="flex items-center text-100 p-10 cursor-pointer mr-4 sm:mr-2 hover:text-blue-100">
                            <span class="inline-flex  mr-1">
                                <!-- <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                                </svg> -->
                                <i class="fa fa-sign-out mr-3 sm:mr-2"></i>
                            </span>
                            Logout
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <!-- ./Header -->

        <!-- Sidebar -->
        <!-- <div v-if="authUser.userType == 'director'"> -->
            <!-- <div class="fixed flex flex-col top-0 left-0 w-20 hover:w-64 md:w-64 bg-blue-900 dark:bg-gray-900 h-full text-white transition-all duration-300 border-none z-10 sidebar"> -->
        <div class="fixed flex flex-col top-0  bg-blue-900 dark:bg-gray-900 h-full text-white transition-all duration-300 border-none z-10  sidebar">
            <div @click="handleSideBar" class="close cursor-pointer text-center flex justify-end p-2">
                <p class="bg-red-500 hover:bg-red-600 w-fit text-5xl h-30 p-2">X</p>
            </div>
          <div class="flex w-full pt-10 profile">
            <div>
                <img class="w-20 h-20 md:w-10  rounded-md  overflow-hidden block" :src="authUser.school_image" />
            </div>
            <span class="text-blue">Dir. {{ authUser.director_name }}</span>
            <button>Update profile</button>
        </div>
            <div class="overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow">
            <ul class="flex flex-col py-10 space-y-1">
                    <DirectorSidebarLinks v-if="authUser.userType == 'director'" />
                    <!-- <TeacherSidebarLinks v-if="authUser.userType == 'teacher'"/>
                    <StudentSidebarLinks v-if="authUser.userType == 'student'"/> -->
              </ul>
          </div>
        </div>
        <!-- ./Sidebar -->

        <!-- <div class="h-full ml-14 mt-14 md:ml-64"> -->
            <div class="h-full content rounded-md  md:ml-64">
            <!-- {{ authUser }} -->

            <div class='btn-back'>
                <button @click="back" class="back"> 
                    <i class="fa fa-arrow-left" aria-hidden="true"></i>
                    <p>back</p>
                </button>
            </div>
            <slot class="slot"></slot>
        </div>
    </div>
</div>
</template>

<style scoped>
.btn-back {
    /* background-color: blue; */
    margin-top: 2rem;
    /* min-width: 60%; */
    padding-left: 1% ;
    /* margin-bottom: 0; */
    /* display: flex;
    justify-content: space-between; */
}
.back {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    font-size: 16px;
    width: 6%;
    padding: 5px;
    color: white;
    background-color: rgb(202, 65, 34);
    border-radius: 10px;
    margin-right: 110px;
}

.back:hover {
    background-color: red;
}
 .back i {
    padding-left: 5px;
    /* margin-right: 5px; */
}


.sidebar.active{
   left: -30rem;
}
.profile {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    border-bottom: 1px solid white;
    font-size: 15px;
    padding-bottom: 15px;
}
.content {
    height: 100vh;
    padding-top:5rem;
    /* background-color: #ccc; */
    min-width: 100%;
    padding:5rem 6rem 5rem 25rem;
    margin-left: 0;
    text-align: center;
    /* margin-left: 11rem; */
    z-index: 1;
}
.user {
    display: none;
}

.close {
    display: none;
}
.profile div {
    /* background-color: red; */
    width: 50%;
    height: 100%;
}
.profile div img {
    min-width: 100%;
    min-height: 100%;
    border-radius: 50%;
    margin-bottom: 25px;
}
.profile span {
    margin-top: 10px;
}
.profile button {
    margin: 5px;
    background-color: rgb(59, 163, 59);
    color: white;
    padding: 10px;
    width: 80%;
    border-radius: 10px;
}
.profile button:hover {
    background-color: rgb(57, 215, 57); 
}
/* Custom style */
div .sidebar {
    width: 20rem;
    transition: .2s linear;
}
/* .header-right {
    width: calc(100% - 3.5rem);
} */

.sidebar:hover {
    width: 20rem;
}

@media (max-width:1300px) {
    .close {
        display: flex;
    }
    .back{
        min-width: 10%;
        justify-content: space-evenly;
        /* padding:5px 2rem; */
    }
    .content {
        margin-left: 1rem;
        text-align: center;
    }

    .btn-back { 
        padding-left: 2%;
    }
}

@media (max-width:900px) {
    .back{
        justify-content: space-evenly;
        width: 12%;
        padding:5px 2rem;
}
}
@media (max-width:400px) {
    .back{
        width: 20%;
        padding:5px 2rem;
}
}
@media (max-width:750px) {
    .back {
        padding:5px 2rem;
        width: 20%;
        margin-left: 12rem;
}
    .header {
        padding-left: 0;
    }
    .header .school {
        margin-left: 0;
    }
    .sidebar {
        top: 5rem;
    }
    .content {
    margin-left: -10rem;
    padding: 10% 2%;
    min-width: 100%;
}
    .profile {

        display: none;
    }
    .user {
        display: block;
    } 
    .close {
        display: flex;
    }
}
/* @media only screen and (min-width: 768px) {
    .header-right {
        width: calc(100% - 16rem);
    }
} */

</style>
