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
  <div class="px-40 py-5 text-lg grade-table-container">
    <form @submit.prevent="createGrade" class="max-w-lg mx-auto mt-8 bg-blue-100 rounded-lg p-10 ">
        <h1 class="block text-gray-800 text-center  font-bold mb-8">New Grade</h1>
        <div class="mb-4">
            <label class="block  font-bold mb-2" for="component-name">
                Grad's Name
            </label>
            <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="component-name" v-model="form.name"
            type="text"
            placeholder="Grade's name"
            />
            <span v-if="errors.name" class="text-red-500 text-md">{{ errors.name[0] }}</span>
        </div>
        <div class="mb-4">
            <label class="block  font-bold mb-2" for="grade">
            Grade
            </label>
            <input
            class="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
            id="grade"
            type="number" max="11" min="1"  v-model="form.number"
            placeholder="Grade's Number"
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

<style scoped>
.grade-table-container form{
    min-width: 50%;
}
h1 {
    font-size: large;
    background-color: white;
    border: 1px solid blue;
    color: blue;
    padding: 1rem;
    min-width: 100%;
    border-radius: 5px;
    margin-bottom: 2rem;
}

.grade-table-container form label {
    min-width: 100%;
    background-color: rgba(230, 213, 213, 0.575);
    padding: 1rem;
    text-align: start;
    font-size: medium;
    border: 1px solid blue;
    color: blue;
}
.grade-table-container form input {
    font-size: medium;
}
@media (max-width:768px){

.grade-table-container {
  margin-left:  11rem;
}
h1 {
    font-size: medium;
}
.grade-table-container form{
    min-width: 100%;
}
}
</style>