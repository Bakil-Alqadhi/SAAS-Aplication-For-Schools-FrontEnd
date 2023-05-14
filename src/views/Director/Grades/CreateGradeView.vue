<script setup>
import { computed, ref } from 'vue';
import { mapActions } from 'vuex';

import { storeDataSchools } from '../../../store/storeDataSchools';
const errors = computed(()=> storeDataSchools.getters.errors);
const form = ref({
    name: '',
    number: ''
})
const createGrade =  ()=> {
    mapActions['createGrade']
    storeDataSchools.dispatch('createGrade', form.value)
}

</script>
<template>
  <div class="p-40 text-lg">
    <form @submit.prevent="createGrade" class="max-w-sm mx-auto mt-8 bg-blue-100 rounded-lg p-10 ">
        <h1 class="block text-gray-800 text-center font-bold mb-8">Create New Grade</h1>
        <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2" for="component-name">
                Grad's Name
            </label>
            <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="component-name" v-model="form.name"
            type="text"
            placeholder="Enter component name"
            />
            <span v-if="errors.name" class="text-red-500 text-md">{{ errors.name[0] }}</span>
        </div>
        <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2" for="grade">
            Grade
            </label>
            <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="grade"
            type="number" max="11" min="1"  v-model="form.number"
            placeholder="Enter grade"
            />
            <span v-if="errors.number" class="text-red-500 text-md">{{ errors.number[0] }}</span>

        </div>
        <div class="flex items-center justify-between">
            <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            >
            Save
            </button>
            <router-link :to="{ name: 'GradesHome'}"
            class="bg-gray-500 hover:bg-gray-700 text-white cursor-pointer font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Cancel
            </router-link>
        </div>
    </form>
</div>

</template>

<style>

</style>