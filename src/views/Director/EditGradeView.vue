<script setup>
import { computed, onMounted, ref } from 'vue';
import { mapActions } from 'vuex';

import { storeDataSchools } from '../../store/storeDataSchools';
const errors = computed(()=> storeDataSchools.getters.errors);
const grade = computed(()=> storeDataSchools.getters.grade);

const props= defineProps({
    id: String
})

const form = ref({
    name: '',
    number: ''
})

onMounted(async()=> {
    mapActions['fetchOneGrade', props.id]
    storeDataSchools.dispatch('fetchOneGrade', props.id)
})
const updateGrade =  ()=> {
    // console.log(grade.value.name)
    mapActions['updateGrade']
    storeDataSchools.dispatch('updateGrade', {
        'id': props.id,
        'name': grade.value.name,
        'number': grade.value.number
    })
}

</script>
<template>
  <div v-if="grade" class="p-40 text-lg">
    <form @submit.prevent="updateGrade" class="max-w-sm mx-auto mt-8 bg-blue-100 rounded-lg p-10 ">
        <h1 class="block text-gray-800 text-center font-bold mb-8">Update New Grade</h1>
        <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2" for="component-name">
                Grad's Name
            </label>
            <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="component-name" v-model="grade.name"  
            type="text"
            
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
            type="number" max="11" min="1"  v-model="grade.number" 
            
            />
            <span v-if="errors.number" class="text-red-500 text-md">{{ errors.number[0] }}</span>

        </div>
        <div class="flex items-center justify-between">
            <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            >
            Update
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