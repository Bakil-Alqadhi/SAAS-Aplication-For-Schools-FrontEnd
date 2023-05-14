<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { mapActions } from "vuex";
import { storeDataSchools } from "../../../store/storeDataSchools";
import { useRouter } from "vue-router";
// const form = ref ([{
//         name: '',
//         grade: '',
//       }])

const grade_id = ref('')
const grades = computed(()=> storeDataSchools.getters.grades)
const errors = computed(()=> storeDataSchools.getters.errors)
const classroom = computed(()=> storeDataSchools.getters.classroom)
const router = useRouter()
const props = defineProps({
    id: String
})
onMounted(async()=>{
    mapActions['fetchOneClassroom', props.id]
    await  storeDataSchools.dispatch('fetchOneClassroom', props.id)
    mapActions['fetchGrades']
    await storeDataSchools.dispatch('fetchGrades')
    // console.log('id => '+ props.id)
    grade_id.value = classroom.value.grade_id
    console.log( 'grade = '+grade_id.value)

})

const update = async() =>{
    mapActions['updateClassroom', {
        'id': props.id,
        'name': classroom.name,
        'grade': classroom.grade_id
    }]
    await storeDataSchools.dispatch('updateClassroom', {
        'id': props.id,
        'name': classroom.value.name,
        'grade': classroom.value.grade_id
    })
}
const back = ()=>{
  router.go(-1);
}
</script>
<template>
<div class="container"> 
    <form @submit.prevent="update">
        <p @click="back">X</p>
        <h1>Update Classroom</h1>
        <div >
            <input class="field" type="text" v-model="classroom.name" placeholder="Classroom Name" />
            <span v-if="errors.name">{{ errors.name[0] }}</span>
        </div>
        <div>
            <select class="field" v-model="classroom.grade_id">
                <option v-for="grade in grades" :key="grade.id"  :value="grade.id">{{ grade.name }}</option>
            </select>
            <span v-if="errors.grade">{{ errors.grade[0] }}</span>
        </div>
        <div class="buttons">
            <button type="submit" class="update field">Update</button>
        </div>
    </form>
</div>
</template>

<style scoped>
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
    width: 300px;
    border-radius: 10px;
    position: relative;
}

.container form span {
    color: red;
    top: 0;
    font-size: 10px;
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
.container form .field {
    background-color: #ccc;
    border: 2px solid rgb(76, 76, 217);
    /* color: white; */
    width: 100%;
    text-align: start;
    padding: 4px 7px;
    font-size: medium;
    border-radius: 5px;
    margin-top: 10px;
}

.container form .field {
    background-color: white;
}

.container form  .update {
    background-color: rgb(76, 76, 217);
    text-align: center;
    color: white;
    margin: 20px 0;
}
.container form  .update:hover {
    background-color: blue;
}
</style>