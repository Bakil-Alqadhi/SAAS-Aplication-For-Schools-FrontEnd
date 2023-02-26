<script setup>
import axios from "axios";
import { storeDataSchools } from "../store/storeDataSchools";
import {
    onMounted,
    ref,
    defineProps,
    computed
} from "vue";
import { mapActions } from "vuex";

const props= defineProps({
    id: String
})
const school = computed(()=> storeDataSchools.getters.school)

onMounted(() => {
    mapActions['fetchOneSchool', props.id]
    storeDataSchools.dispatch('fetchOneSchool',props.id)
    // console.log(props.id)
})
</script>

<template>
<div v-if="school">
     <!-- School Details Section -->
<section class="text-gray-600 body-font overflow-hidden bg-white">
  <div class="container px-5 py-24 mx-auto">
    <div class="lg:w-4/5 mx-auto flex flex-wrap">
      <img alt="school logo" class="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src="https://via.placeholder.com/800x600">
      <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
        <h2 class="text-sm title-font text-gray-500 tracking-widest uppercase">hi {{ school.school_name }}</h2>
        <h1 class="text-gray-900 text-3xl title-font font-medium mb-4">School Details</h1>
        <div class="flex mb-4">
          <div class="h-1 w-20 bg-indigo-500 rounded"></div>
        </div>
        <p class="leading-relaxed mb-4">{{ school.about_school }}</p>
        <div class="flex border-t border-gray-200 py-2">
          <span class="text-gray-500">Address:</span>
          <span class="ml-auto text-gray-900">{{ school.address }}</span>
        </div>
        <div class="flex border-t border-gray-200 py-2">
          <span class="text-gray-500">Phone:</span>
          <span class="ml-auto text-gray-900">{{ school.phone }}</span>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Director Details Section -->
<section class="text-gray-600 body-font overflow-hidden bg-white">
  <div class="container px-5 py-24 mx-auto">
    <div class="lg:w-4/5 mx-auto flex flex-wrap">
      <div class="lg:w-1/2 w-full lg:pr-10 lg:py-6 mt-6 lg:mt-0 order-last lg:order-first">
        <h2 class="text-sm title-font text-gray-500 tracking-widest uppercase">{{ school.director_name }}</h2>
        <h1 class="text-gray-900 text-3xl title-font font-medium mb-4">About the Director</h1>
        <div class="flex mb-4">
          <div class="h-1 w-20 bg-indigo-500 rounded"></div>
        </div>
        <p class="leading-relaxed mb-4">{{ school.about_director }}</p>
      </div>
      <img alt="director image" class="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded order-first lg:order-last" src="https://via.placeholder.com/800x600">
    </div>
  </div>
</section>
</div>
<h1 v-else class="text-center">Loading...</h1>
</template>

<style>
.section-1 {
  animation: fade-in 1s ease-out;
}

.section-1 img {
  animation: slide-left 1s ease-out;
}

/* Director Details Section */
.section-2 {
  animation: fade-in 1s ease-out;
}

.section-2 img {
  animation: slide-right 1s ease-out;
}

/* Animations */
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slide-left {
  from {
    transform: translateX(50%);
  }
  to {
    transform: translateX(0);
  }
}
</style>