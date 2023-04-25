<script setup>
import { computed, onMounted } from 'vue';
import { mapActions } from 'vuex';
import {storeAuthUser} from '../../store/storeAuthUser'
import {storeDataSchools} from '../../store/storeDataSchools'
import { useRouter } from 'vue-router';
const authUser = computed(() => storeAuthUser.getters.user);
const countNotifications = computed(() => storeDataSchools.getters.countNotifications )
// const router= useRouter()

onMounted(async () => {
    // storeAuthUser.dispatch('getUser')
    // storeDataSchools.dispatch('getWaitingRequests', authUser.school_id)
})

const getWaiting = async()=>{
    storeDataSchools.dispatch('getWaitingRequests')
    router.push('/waiting')
}
</script>
<template>
<!-- Sidebar -->
<li>
    <router-link to="/dashboard" href="#" class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6">
        <span class="inline-flex justify-center items-center ml-4">
            <i class="fa-solid fa-school"></i> </span>
        <span class="ml-2 text-2xl tracking-wide truncate">Dashboard {{ authUser.school_id }}</span>
    </router-link>
</li>
<li>
    <router-link to="/teachers" href="#" class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6">
        <span class="inline-flex justify-center items-center ml-4">
            <i class="fa-solid fa-person-chalkboard"></i> </span>
        <span class="ml-2 text-2xl tracking-wide truncate">Portfolio</span>
    </router-link>
</li>
<li>
    <router-link to="/teachers" href="#" class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6">
        <span class="inline-flex justify-center items-center ml-4">
            <i class="fa-solid fa-person-chalkboard"></i> </span>
        <span class="ml-2 text-2xl tracking-wide truncate">All Teachers</span>
    </router-link>
</li>
<li>
    <router-link to="/students" href="#" class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6">
        <span class="inline-flex justify-center items-center ml-4">
            <i class="fa-solid fa-person-chalkboard"></i> </span>
        <span class="ml-2 text-2xl tracking-wide truncate">All Students</span>
    </router-link>
</li>
<li>
    <router-link to="/grades/index" href="#" class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6">
        <span class="inline-flex justify-center items-center ml-4">
            <i class="fa-solid fa-person-chalkboard"></i> </span>
        <span class="ml-2 text-2xl tracking-wide truncate">Grades</span>
    </router-link>
</li>
<li>
    <router-link to="/sections/index" href="#" class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6">
        <span class="inline-flex justify-center items-center ml-4">
            <i class="fa-solid fa-person-chalkboard"></i> </span>
        <span class="ml-2 text-2xl tracking-wide truncate">Sections</span>
    </router-link>
</li>
<li>
    <router-link to="/classrooms/index" href="#" class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6">
        <span class="inline-flex justify-center items-center ml-4">
            <i class="fa-solid fa-person-chalkboard"></i> </span>
        <span class="ml-2 text-2xl tracking-wide truncate">Classrooms</span>
    </router-link>
</li>
<li>
    <router-link to="/schools" href="#" class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6">
        <span class="inline-flex justify-center items-center ml-4">
            <i class="fa-solid fa-users-between-lines"></i>
        </span>
        <span class="ml-2 text-2xl tracking-wide truncate">Classes</span>
    </router-link>
</li>
<li>
    <router-link to="/waiting" href="#" class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6">
        <span class="inline-flex justify-center items-center ml-4">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
            </svg>
        </span>
        <span class="ml-2 text-2xl tracking-wide truncate">Notifications</span>
        <span class="hidden md:block px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-red-500 bg-red-50 rounded-full">{{ countNotifications }}</span>
    </router-link>
    <!-- <button @click="getWaiting(authUser.school_id)" href="#" class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6">
        <span class="inline-flex justify-center items-center ml-4">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
            </svg>
        </span>
        <span class="ml-2 text-2xl tracking-wide truncate">get waiting</span>
        <span class="hidden md:block px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-red-500 bg-red-50 rounded-full">1.2k</span>
    </button> -->
</li>
<!-- ./Sidebar -->
</template>

<style scoped>
/* li{
    margin-bottom: 20px;
} */
</style>