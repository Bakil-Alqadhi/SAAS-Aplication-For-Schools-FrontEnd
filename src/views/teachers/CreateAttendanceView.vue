<script setup>
import { onMounted, computed, watch } from 'vue';
import {storeDataStudents} from '../../store/storeDataStudents';
import { storeDataTeachers } from '../../store/storeDataTeachers';

import { storeAuthUser } from '../../store/storeAuthUser';
import { mapActions } from 'vuex';

// const allTheStudents = computed(() => storeDataStudents.getters.students);
// const allTheTeachers = computed(() => storeDataTeachers.getters.teachers);
const authUser = computed(() => storeAuthUser.getters.user);

onMounted( async()=>{
    storeAuthUser.dispatch('getUser')
})

</script>
<template>
    <div class="container"  v-if="authUser">
        <router-link to="" class="card bg-red-400 hover:bg-red-600 hover:shadow-xl transition duration-300 transform hover:-translate-y-1 hover:scale-105">
            <p>Attendance For Today</p>
        </router-link>
        <router-link to="" class="card bg-green-400 hover:bg-green-600 hover:shadow-xl transition duration-300 transform hover:-translate-y-1 hover:scale-105">
            <p>Attendance For Today</p>
        </router-link>
        <router-link to="" class="card bg-blue-400 hover:bg-blue-600  hover:shadow-xl transition duration-300 transform hover:-translate-y-1 hover:scale-105">
            <p>Attendance For Today</p>
        </router-link>
        <router-link to="" class="card bg-teal-400 hover:bg-teal-600 hover:shadow-xl transition duration-300 transform hover:-translate-y-1 hover:scale-105">
            <p>Attendance For Today</p>
        </router-link>
        <router-link to="" class="card bg-orange-400 hover:bg-orange-600 hover:shadow-xl transition duration-300 transform hover:-translate-y-1 hover:scale-105">
            <p>Attendance For Today</p>
        </router-link>
        <router-link to="" class="card bg-blue-400 hover:bg-blue-600  hover:shadow-xl transition duration-300 transform hover:-translate-y-1 hover:scale-105">
            <p>Attendance For Today</p>
        </router-link>
    </div>
</template>

<style scoped>
.container {
    min-width: 100%;
    height: 100vh;
    padding-left: 2rem;
    /* display: flex;
    justify-content: space-between; */
    /* flex-wrap: wrap; */
}
.container .card  {
    display: inline-block;
    min-width: 30rem;
    height: 10rem;
    margin: 5px;
    cursor: pointer;
    font-size: large;
    text-align: center;
    color: white;
    border-radius: 5px;
    /* padding: 2rem ; */
}

.container .card p {
    margin-top: 30px;
}
</style>