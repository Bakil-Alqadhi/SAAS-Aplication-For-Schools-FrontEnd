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
const school = computed(()=> storeDataSchools.getters.school.school)
const teachers = computed(()=> storeDataSchools.getters.school.teachers)

onMounted(() => {
    mapActions['fetchOneSchool', props.id]
    storeDataSchools.dispatch('fetchOneSchool',props.id)
    // console.log(props.id)
})
</script>

<template>
<div v-if="school" >
     <!-- School Details Section -->
<section class="text-gray-600 body-font overflow-hidden bg-white">
  <div class="container px-5  mx-auto">
    <div class="lg:w-4/5 mx-auto flex flex-wrap">
      <img alt="school logo" class="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" :src="school.school_image">
      <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
        <h2 class="text-sm title-font text-gray-500 tracking-widest uppercase">{{ school.school_name }}</h2>
        <h1 class="text-gray-900 text-3xl text-start title-font font-medium mb-4">School Details</h1>
        <div class="flex mb-4">
          <div class="h-1 w-20 bg-indigo-500 rounded"></div>
        </div>
        <p class="leading-relaxed mb-4">{{ school.about_school }}</p>
        <div class="flex border-t border-gray-200 py-2">
          <span class="text-gray-500">Title:</span>
          <span class="ml-auto text-gray-900">{{ school.school_name }}</span>
        </div>
        <div class="flex border-t border-gray-200 py-2">
          <span class="text-gray-500"><i class="fa fa-map-marker mr-2"></i>Address:</span>
          <span class="ml-auto text-gray-900">{{ school.address }}</span>
        </div>
        <div class="flex border-t border-gray-200 py-2">
          <span class="text-gray-500"><i class="far fa-envelope mr-2"></i>Email:</span>
          <span class="ml-auto text-gray-900">
            {{ school.email }}
          </span>
        </div>
        <div class="flex border-t border-gray-200 py-2">
          <span class="text-gray-500"><i class="fas fa-phone mr-2"></i>Phone:</span>
          <span class="ml-auto text-gray-900">
            {{ school.phone }}
          </span>
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
        <h1 class="text-gray-900 text-3xl text-start title-font font-medium mb-4">About Director</h1>
        <div class="flex mb-4">
          <div class="h-1 w-20 bg-indigo-500 rounded"></div>
        </div>
        <p class="leading-relaxed mb-4">{{school.director_name }} - {{ school.about_director }}</p>
      </div>
      <img alt="director image" :src="school.school_image" class="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded order-first lg:order-last" >
    </div>
  </div>
</section>

<!-- Teachers Data -->
<!-- <div class="flex justify-center flex-wrap">
    <div  v-for="(teacher, index) in teachers" :key="index" class="max-w-sm w-full mx-4 my-4 bg-white shadow-lg rounded-lg overflow-hidden">
        <div class="relative">
            <img class="w-full h-64 object-cover" :src="teacher.image_path" alt="teacher">
            <div class="absolute bottom-0 bg-black bg-opacity-50 w-full text-white p-4 description opacity-0">
                <p class="text-lg font-bold mb-2">{{ teacher.first_name + ' ' + teacher.last_name }}</p>
                <p class="text-sm">{{ teacher.about }}</p>
            </div>
        </div>
        <div class="px-4 py-2">
            <h2 class="text-gray-800 text-xl font-bold">Teacher {{ index +1 }}: {{ teacher.last_name }}</h2>
            <p class="text-gray-600 mt-2 mb-4">{{ teacher.email }}</p>
        </div>
    </div>
    
</div> -->
<div  class="teachers mx-20">
  <div v-for="(teacher, index) in teachers" :key="index"  class="bg-white teacher shadow-md rounded-lg  max-w-lg">
    <!-- Teacher's image -->
    <div class="bg-gray-300 h-64 w-full flex items-center justify-center">
      <img class="h-56 w-56 object-cover rounded-full" :src="teacher.image" alt="Teacher's image">
    </div>

    <!-- Teacher's full name -->
    <div class="px-6 py-4">
      <div class="font-bold text-3xl mb-2">{{ teacher.first_name }}</div>

      <!-- Teacher's email -->
      <p class="text-gray-700 text-base mb-2">
        <i class="far fa-envelope mr-2"></i> {{ teacher.email }}
      </p>

      <!-- Teacher's phone -->
      <p class="text-gray-700 text-base mb-2">
        <i class="fas fa-phone mr-2"></i> {{ teacher.phone }}
      </p>

      <!-- Teacher's about -->
      <p class="text-gray-700 text-base mb-2">{{ teacher.about }}</p>

      <!-- Teacher's status -->
      <!-- <div class="text-sm font-bold text-gray-600 mb-2">
        @if (teacher.status == 'active')
          <span class="px-2 py-1 bg-green-200 text-green-800 rounded-full">{{ teacher.status }}</span>
        @elseif (teacher.status == 'inactive')
          <span class="px-2 py-1 bg-red-200 text-red-800 rounded-full">{{ teacher.status }}</span>
        @endif
      </div> -->
    </div>
  </div>
</div>

</div>
<h1 v-else class="text-center">Loading...</h1>
</template>

<style>
.teachers {
  max-width: 70%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  /* background-color: red; */
  margin:0  auto;

}
.teachers .teacher {
  min-width: 30%;
  margin-bottom: 1rem;
  min-width: 30rem;
  min-height: 30rem;

  max-width: 30rem;
  max-height: 30rem;
}
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