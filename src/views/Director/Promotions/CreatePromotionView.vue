<script setup>
import { computed, onMounted, ref } from "vue";
import { mapActions } from "vuex";
import { storeDataSchools } from "../../../store/storeDataSchools";

const grades = computed(()=> storeDataSchools.getters.grades)
const errors = computed(()=> storeDataSchools.getters.errors)

const years= ref([])
const currentYear = ref('')
const classrooms = ref('')
const sections = ref('')
const selectedGrade = ref('')
const selectedClassroom = ref('')
const selectedSection = ref('')

const classrooms_new = ref('')
const sections_new = ref('')
const selectedGrade_new = ref('')
const selectedClassroom_new = ref('')
const selectedSection_new = ref('')
const form = ref({
    grade_id: '',
    classroom_id: '',
    section_id:'',
    academic_year: '',
    grade_id_new: '',
    classroom_id_new: '',
    section_id_new:'',
    academic_year_new: '',
})
onMounted(()=>{
    currentYear.value = new Date().getFullYear();
    years.value.push((currentYear.value - 1).toString() , (currentYear.value).toString(), (currentYear.value + 1).toString())
    mapActions['fetchGradesData']
    storeDataSchools.dispatch('fetchGradesData');
})

const selected = ()=> {
    classrooms.value = grades.value[selectedGrade.value].classrooms;
    // console.log(grades.value[form.value.grade].classrooms)
}
const selected2 = ()=> {
    sections.value = grades.value[selectedGrade.value].sectionsClassroom[selectedClassroom.value].sections;
    // console.log(grades.value[form.value.grade].classrooms)
}

const selected_new = ()=> {
    classrooms_new.value = grades.value[selectedGrade_new.value].classrooms;
    // console.log(grades.value[form.value.grade].classrooms)
}
const selected2_new = ()=> {
    sections_new.value = grades.value[selectedGrade_new.value].sectionsClassroom[selectedClassroom_new.value].sections;
    // console.log(grades.value[form.value.grade].classrooms)
}

const create= async()=> {

    //from
    form.value.grade_id = grades.value[selectedGrade.value].id;
    form.value.classroom_id = grades.value[selectedGrade.value].sectionsClassroom[selectedClassroom.value].id;
    form.value.section_id = selectedSection.value
    //to 
    form.value.grade_id_new = grades.value[selectedGrade_new.value].id;
    form.value.classroom_id_new = grades.value[selectedGrade_new.value].sectionsClassroom[selectedClassroom_new.value].id;
    form.value.section_id_new = selectedSection_new.value
    await mapActions['handleCreatePromotion', form.value]
    await storeDataSchools.dispatch('handleCreatePromotion', form.value)
}
</script>

<template>
<div class="container " v-if="grades"> 
  <form @submit.prevent="create"  class="parent">
    <div class="from">
        <h1>From Section: </h1>
        <div class="data">
            <div class="fields">
                <label for="grade">Select Grade:</label>
                <select class="field" v-model="selectedGrade" id="grade" @change="selected">
                    <option value="" selected>Select Grade</option>
                    <option v-for="(grade, index) in grades" :key="index" :value="index">{{ grade.name }}</option>
                </select>
                <span v-if="errors.grade_id">{{ errors.grade_id[0] }}</span>
            </div>
            <div class="fields">
                <label for="classroom">Select Classroom:</label>
                <select class="field" v-model="selectedClassroom" @change="selected2" id="classroom">
                    <option value="">Select Classroom</option>
                    <option v-for="(classroom,index) in classrooms" :key="index" :value="index">{{ classroom.name }}</option>
                </select>
                <span v-if="errors.classroom_id">{{ errors.classroom_id[0] }}</span>
            </div>
            <div class="fields">
                <label for="section">Select Section:</label>
                <select class="field" v-model="selectedSection"  id="section">
                    <option value="">Select Section</option>
                    <option v-for="section in sections" :key="section.id" :value="section.id">{{ section.name }}</option>
                </select>
                <span v-if="errors.section_id">{{ errors.section_id[0] }}</span>
            </div>
            <div class="fields">
                <label for="classroom">Academic Year:</label>
                <select class="field" v-model="form.academic_year" id="classroom">
                    <option value="">Select Section</option>
                    <option v-for="(year, index) in years" :key="index" :value="year">{{ year }}</option>
                </select>
                <span v-if="errors.academic_year">{{ errors.academic_year[0] }}</span>
            </div>
        </div>
    </div>
    <div class="to">
        <h1>To Section: </h1>
        <div class="data">
            <div class="fields">
                <label for="grade">Select Grade:</label>
                <select class="field" v-model="selectedGrade_new" id="grade" @change="selected_new">
                    <option value="" selected>Select Grade</option>
                    <option v-for="(grade, index) in grades" :key="index" :value="index">{{ grade.name }}</option>
                </select>
                <span v-if="errors.grade_id_new">{{ errors.grade_id_new[0] }}</span>
            </div>
            <div class="fields">
                <label for="classroom">Select Classroom:</label>
                <select class="field" v-model="selectedClassroom_new" @change="selected2_new" id="classroom">
                    <option value="">Select Classroom</option>
                    <option v-for="(classroom,index) in classrooms_new" :key="index" :value="index">{{ classroom.name }}</option>
                </select>
                <span v-if="errors.classroom_id_new">{{ errors.classroom_id_new[0] }}</span>
            </div>
            <div class="fields">
                <label for="classroom">Select Section:</label>
                <select class="field" v-model="selectedSection_new" id="classroom">
                    <option value="">Select Section</option>
                    <option v-for="section in sections_new" :key="section.id" :value="section.id">{{ section.name }}</option>
                </select>
                <span v-if="errors.section_id_new">{{ errors.section_id_new[0] }}</span>
            </div>
            <div class="fields">
                <label for="academic_year_new">Academic Year:</label>
                <select class="field" v-model="form.academic_year_new" id="academic_year_new">
                    <option value="">Select Section</option>
                    <option v-for="(year, index) in years" :key="index" :value="year">{{ year }}</option>
                </select>
                <span v-if="errors.academic_year_new">{{ errors.academic_year_new[0] }}</span>
            </div>
        </div>
    </div>
    <div class="button mt-10">
            <button type="submit" class="create field">Create</button>
        </div>
  </form>
</div>
</template>

<style scoped>
.container {
    /* background-color: rgb(166, 212, 243); */
    min-width: 100%;
    height: 100vh;
    /* left: 0; top: 0; right: 0; bottom: 0; */


    margin: 0 0 0 5rem;
    padding: 0;
}

.container .parent {
    height: auto;
    width: auto;
    /* background-color: red; */
}
.container .parent .from, .to {
    height: auto;
    width: 100%;
    /* background-color: green; */
    padding-top: 20px;
}

.container .parent .data {
    padding: 20px;
    height: auto;
    width: 90%;
    display:flex;
    justify-content: space-evenly;
    /* background-color: green; */
    padding-top: 20px;
    margin-left:  2%;
}

.container .parent .data .fields {
    margin-left: 1px;
}
.container .parent h1 {
    width: 40%;
    /* background-color: blue ; */
    border: 1px solid blue;
    background-color: rgb(221, 221, 232);
    padding: 4px 20px;
    color: blue ;
    border-radius: 5px;
    text-align: center;
    margin: 30px 27% 20px;
    font-size: large;
    font-weight: bold;
}
@media (max-width:1200px){  
        .container .parent .data {
        display:flex;
        flex-direction: column;
        justify-content: center;
    }
    .container .data .fields  { 
        display: flex;
        justify-content: space-around;
        margin-bottom: 5px;
    }
    .container  .data .fields  label {
        max-width: 25%;
        margin-right: 5px;
    }
}

@media (max-width:768px){ 
        .container .parent .data {
        display:flex;
        flex-direction: column;
        justify-content: center;
    }
    .container .parent .data .fields {
        display:flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
    }

}
.container form span {
    color: red;
    /* top: ; */
    margin-bottom: 10px;
    font-size: 13px;
}

.container .data .fields label {
    background-color: rgb(221, 221, 232);
    color: blue ;
    border: 1px solid blue;
    width: 90%;
    text-align: start;
    padding: 4px 7px;
    font-size: medium;
    border-radius: 5px;
}
.container  .field {
    background-color: white;
    border: 2px solid rgb(76, 76, 217);
    /* color: white; */
    width: 70%;
    text-align: start;
    padding: 4px 7px;
    font-size: medium;
    border-radius: 5px;
    margin-top: 10px;
    /* margin-bottom: 10px; */
}


.container   .button {
    margin: 5px auto;
    text-align: center;
}

.container  .create {
    background-color: rgb(76, 76, 217);
    text-align: center;
    color: white;
}
.container  .create:hover {
    background-color: blue;
}
</style>