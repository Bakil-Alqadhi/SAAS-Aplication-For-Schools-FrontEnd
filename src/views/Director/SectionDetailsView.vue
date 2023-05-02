<script setup>
import { computed, onMounted } from "vue"
import { storeDataSchools } from "../../store/storeDataSchools"

const section = computed(()=>storeDataSchools.getters.section)
const props = defineProps({
    id: String
})
onMounted(()=>{
    storeDataSchools.dispatch('fetchOneSection', props.id)
    console.log(section.value)
})
</script>
<template>
<div v-if="section" class="container"> 
    <div class="btns-heaer">
        <button class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
        <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            <router-link :to="{name: 'EditSection', params: { id: props.id}}">
                Update Section's Data
            </router-link>        
        </span>
        </button>
        <button class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
        <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            <router-link :to="{name:'AddingStudentToSection', params: { id: props.id}}">
                Add Student To This Section
            </router-link>
        </span>
        </button>
        <button class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
        <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            All Teachers
        </span>
        </button>
        <button class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
        <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Add Students
        </span>
        </button>
        <button class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
        <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Add Teacher
        </span>
        </button>
        <button class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800">
        <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Teal to Lime
        </span>
        </button>
        <button class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400">
        <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Red to Yellow
        </span>
        </button>

    </div>
    <div class="data">
        <h1>The total jointed students to this section is <span v-if="section.students">{{ section.students.length }}</span> <span v-else>0</span></h1>
        <h1>The total jointed Teachers to this section is </h1>
    </div>
</div>
</template>

<style scoped>
.container {
    background-color: rgb(166, 212, 243);
    height: 100vh;
    min-width: 100%;
    padding: 1px 1px 20px;
    margin-bottom: 0;
}
.container .btns-heaer {
    /* background-color: blue; */
    margin-top: 3%;
    padding: 30px;
}
.container .btns-heaer button {
    font-size: large;
    margin: 5px 5px 10px ;
    min-width: 30%;
    height: 50px;
    text-align: center;
}

.container .btns-heaer button span {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.container h1{
    /* background-color: rgb(221, 221, 232); */
    background-color: white;
  border: 1px solid blue;
  padding: 10px;
  color: blue;
  border-radius: 5px;
  font-weight: bold;
  margin:20px  40px;
  font-size: large;
 }
 .container h1 ul {
    margin: 10px;

 }
 .container h1 ul li {
    padding: 10px;
    border: 1px solid rgb(17, 17, 202);
    border-radius: 5px;
    font-size: medium;
    list-style-type: square;
    margin-left: 30px;
    max-width: 20%;
    color: rgb(52, 48, 48);
    display: inline-block;
    flex-wrap: wrap;
 }
 .container h1 ul li:hover {
    background-color:rgb(26, 155, 198);
    color: white;
 }

 @media (max-width:1200px){
    .container h1 ul li {
        display: flex;
        width: 30%;
        margin-bottom: 10px;
        justify-content: center;
    }
}
</style>