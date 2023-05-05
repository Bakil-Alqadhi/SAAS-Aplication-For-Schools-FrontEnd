<script setup>
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { storeDataSchools } from "../../../store/storeDataSchools";

const props = defineProps({
    id: String
})
const exam = computed(()=> storeDataSchools.getters.exam)
const errors = computed(()=> storeDataSchools.getters.errors)
const years = ref([])
// const form = ref ([{
//         name: '',
//         term: '',
//         academic_year: '',
//     }])

const router = useRouter()

onMounted(async()=>{
    const currentYear = new Date().getFullYear();
    years.value.push((currentYear - 1).toString() , (currentYear).toString(), (currentYear + 1).toString())
   await storeDataSchools.dispatch('fetchOneExam', props.id)
   
})

const back = ()=>{
  router.go(-1);
}

const update = ()=>{
    console.log('=============')
        console.log(exam.value)
        console.log('=============') 
    storeDataSchools.dispatch('handleUpdateExam', exam.value)
}
</script>

<template>
<div class="container" v-if="exam"> 
    <form class="main-form" @submit.prevent="update">
        <p  @click="back">X</p>
        <h1>Update Exam Data</h1>
        <div class="parent" >
            <label for="section_name">Exam's Name:</label>
            <input class="field" v-model="exam.name" type="text" id="section_name"  placeholder="Exam's Name" />
            <span v-if="errors.name">{{ errors.name[0] }}</span>
        </div>
        <div class="parent" >
            <label for="section_name">Exam's Term:</label>
            <input class="field" v-model="exam.term" type="number" min="1" max="2" id="section_name"  placeholder="Exam's Term" />
            <span v-if="errors.term">{{ errors.term[0] }}</span>
        </div>
        <div class="parent" >
            <label for="section_name">Academic Year:</label>
            <select class="field" v-model="exam.academic_year" id="academic_year_new">
                    <option value="" selected>Select Year</option>
                    <option v-for="(year, index) in years" :key="index" :value="year">{{ year }}</option>
            </select>
            <span v-if="errors.academic_year">{{ errors.academic_year[0] }}</span>
        </div>
        <div class="buttons mt-10">
            <button type="submit" class="create field">Update</button>
        </div>

    </form>
</div>
</template>

<style scoped>
.container form span {
    color: red;
    /* top: ; */
    text-align: start;
    margin-bottom: 10px;
    font-size: 13px;
}
.container form p {
    position: absolute;
    background-color: rgb(210, 53, 18);
    color: white;
    font-size: large;
    font-weight: bold;
    width: 30px;
    top: 5px;
    /* left: 5px; */
    margin-bottom: 3px;
    text-align: center;
    border-radius: 3px;
    cursor: pointer;
}

.container form p:hover {
  background-color: red;
}
.container form h1 {
    width: 100%;
    /* background-color: blue ; */
    border: 1px solid blue;
    padding: 4px;
    color: blue ;
    border-radius: 5px;
    text-align: center;
    margin: 30px 0 20px;
    font-size: large;
    font-weight: bold;
}
.container form label {
    background-color: rgb(221, 221, 232);
    color: blue ;
    border: 1px solid blue;
    width: 100%;
    /* color: white; */
    text-align: start;
    padding: 4px 7px;
    font-size: medium;
    border-radius: 5px;
    /* margin-top: 20px; */
    /* margin-bottom: 20px; */
}
.container form .field {
    background-color: white;
    border: 2px solid rgb(76, 76, 217);
    /* color: white; */
    width: 100%;
    text-align: start;
    padding: 4px 7px;
    font-size: medium;
    border-radius: 5px;
    margin-top: 10px;
    /* margin-bottom: 10px; */
}


.container form  .create {
    background-color: rgb(76, 76, 217);
    text-align: center;
    color: white;
    margin: 5px 0;
}
.container form  .create:hover {
    background-color: blue;
}
.parent {
    margin-bottom: 20px;
    text-align: start;
}
.container {
    background-color: rgba(230, 213, 213, 0.575);
    min-width: 100%;
    height: 100vh;
    position: fixed;
    z-index: 1400;
    left: 0; top: 0; right: 0; bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
}
.container form{
    background-color:white ;
    padding: 10px;
    width: 450px;
    border-radius: 10px;
    position: relative;
    /* visibility: hidden; */
}
@media (max-width:768px){ 
    .container form {
        width: 300px;
    }
}
</style>