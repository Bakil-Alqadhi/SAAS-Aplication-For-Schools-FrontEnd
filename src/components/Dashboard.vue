<script setup>
import DirectorSidebarLinks from './director/DirectorSidebarLinks.vue'
import TeacherSidebarLinks from './teacher/TeacherSidebarLinks.vue'
import StudentSidebarLinks from './student/StudentSidebarLinks.vue'
import {storeDataSchools} from '../store/storeDataSchools'
import SpinnerLoading from './SpinnerLoading.vue'

import {
    storeAuthUser
} from '../store/storeAuthUser';
import {
    computed,
    onMounted,
    ref,
    watch
} from 'vue';
import { mapActions } from 'vuex';


const authUser = computed(() => storeAuthUser.getters.user);

onMounted(async () => {
//     mapActions['getUser']
//    await storeAuthUser.dispatch('getUser')
})

watch(authUser, newValue =>{
    storeDataSchools.dispatch('getWaitingRequests', newValue.school_id)
})

const logout = async()=>{
    mapActions['handelLogout']
    storeAuthUser.dispatch('handleLogout');
}
</script>
<template>
<!-- <SpinnerLoading /> -->
<div v-if="authUser">
    <div class="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white dark:bg-gray-700 text-black dark:text-white">

        <!-- Header -->
        <div class="fixed pt-15 w-full flex items-center text-white text-1xl justify-between h-14 bg-blue-800 z-10">
            <div class="flex items-center  justify-start md:justify-center pl-3 w-14 md:w-64 h-14 bg-blue-800 dark:bg-gray-800 border-none">
                <img class="w-7 h-7 md:w-10 md:h-10 mr-2 rounded-md overflow-hidden" :src="authUser.school_image" />
                <span v-if="authUser.userType === 'director'" class="hidden md:block">Dir. {{ authUser.director_name }}</span>
                <!-- <span v-if="authUser.userType === 'teacher'" class="hidden md:block">T. {{ authUser.last_name +' ' +  authUser.first_name }}</span>
                <span v-if="authUser.userType === 'student'" class="hidden md:block">Dear. {{ authUser.student_last_name + ' '+ authUser.student_first_name }}</span> -->
            </div>
            <div class="flex justify-between items-center h-14 text-2xl bg-blue-800 dark:bg-gray-800 header-right">
                <!-- <div class="bg-white rounded flex items-center w-full max-w-xl mr-4 p-2 shadow-sm border border-gray-200">
                    <button class="outline-none focus:outline-none">
                        <svg class="w-5 text-gray-600 h-5 cursor-pointer" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                    </button>
                    <input type="search" name="" id="" placeholder="Search" class="w-full pl-3 text-sm text-black outline-none focus:outline-none bg-transparent" />
                </div> -->
                <div></div>
                <ul class="flex items-center">

                    <li>
                        <div class="block w-px h-6 mx-3 bg-gray-400 dark:bg-gray-700"></div>
                    </li>
                    <li>
                        <a @click="logout" class="flex items-center text-lg  cursor-pointer mr-4 hover:text-blue-100">
                            <span class="inline-flex mr-1">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                                </svg>
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
            <!-- <div class="fixed flex flex-col top-0 left-0 w-14 hover:w-64 md:w-64 bg-blue-900 dark:bg-gray-900 h-full text-white transition-all duration-300 border-none z-10 sidebar"> -->
        <div class="fixed flex flex-col top-0  bg-blue-900 dark:bg-gray-900 h-full text-white transition-all duration-300 border-none z-10 sidebar">
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

        <div class="h-full ml-14 mt-14 mb-10 md:ml-64">
            <!-- {{ authUser }} -->

            <slot></slot>
        </div>
    </div>
</div>
</template>

<style scoped>
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
    width: 16rem;
}
.header-right {
    width: calc(100% - 3.5rem);
}

.sidebar:hover {
    width: 16rem;
}

@media only screen and (min-width: 768px) {
    .header-right {
        width: calc(100% - 16rem);
    }
}

</style>
