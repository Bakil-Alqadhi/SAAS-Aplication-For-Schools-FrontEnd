<script setup>
import {
  computed,
    onMounted,
    ref
} from "vue";
import { mapActions } from "vuex";
import {storeDataSchools} from '../store/storeDataSchools.js'

const schoolsData = computed(() => storeDataSchools.getters.schools);

onMounted(() => {
    mapActions['fetchSchools']
    storeDataSchools.dispatch("fetchSchools");
})
</script>
<!-- src="https://dummyimage.com/640x360/ccc/000" -->
<template>
<div class="flex justify-center flex-wrap" v-if="schoolsData">
    <div  v-for="(school, index) in schoolsData" :key="index" class="max-w-sm w-full mx-4 my-4 bg-white shadow-lg rounded-lg overflow-hidden">
        <div class="relative">
            <img class="w-full h-64 object-cover" :src="school.school_image" alt="School">
            <div class="absolute bottom-0 bg-black bg-opacity-50 w-full text-white p-4 description opacity-0">
                <p class="text-lg font-bold mb-2">Director: {{ school.director_name }}</p>
                <p class="text-sm">{{ school.about_director }}</p>
            </div>
        </div>
        <div class="px-4 py-2">
            <h2 class="text-gray-800 text-xl font-bold">{{ school.school_name }}</h2>
            <p class="text-gray-600 mt-2 mb-4">{{ school.address }}</p>
            <router-link :to="{name: 'SchoolDetailView', params:{id: school.id}}" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Read More</router-link>
        </div>
    </div>
    
</div>
<h1 v-else class="text-center">loading...</h1>
</template>

<style>
.description {
    bottom: 100%;
    transition: bottom 0.3s ease-in-out;
}

.relative:hover .description {
    bottom: 0;
    opacity: 1;
}
</style>
