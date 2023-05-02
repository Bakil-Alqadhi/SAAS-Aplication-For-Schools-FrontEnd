<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { mapActions } from "vuex";
import { storeDataSchools } from "../../store/storeDataSchools";

const classrooms = computed( ()=> storeDataSchools.getters.classrooms)
const gradesData= computed(() => storeDataSchools.getters.sections)


onMounted( async()=>{
    mapActions['fetchTeacherSection']
    await  storeDataSchools.dispatch('fetchTeacherSection')    
})


const deleteSection =async (id)=> {
  if(confirm("Are you sure?")){
    mapActions(['deleteSection', id])
    if(storeDataSchools.dispatch('deleteSection', id)){
      launch_toast()
    }
  }
}

</script>
<template>
    <div v-if="gradesData" class="container">
        <div class="parent">
            <div class="data" v-for="(grade, index) in gradesData" :key="index">
                <div class="grade">
                    <h1>{{ grade.grade_name }}</h1>
                    <!-- <span id="btn-show" @click="show">+</span> -->
                </div>
                <div class="table">
                    <table id="table_data" v-if="grade.sectionsData">
                    <thead class="header">
                        <tr>
                        <th>Section</th>
                        <th>Classroom Name</th>
                        <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody >
                        <tr class="element" v-for="section in grade.sectionsData" :key="section.section_id">
                            <td>{{ section.section_name }}</td>
                            <td>{{ section.classroom_name }}</td>
                            <td>
                                <router-link :to="{ name: 'EditSection', params: { id: section.section_id }}" class="btn-update">
                                    update
                                </router-link>
                                <button  @click="deleteSection(section.section_id)" class="btn-delete">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

.container {
    min-width: 100%;
    height: 100vh;
}

.container .parent {
    /* background-color: rgb(163, 152, 152); */
    min-width: 70%;
    display: flex;
    justify-content: center;
    text-align: center;
    flex-wrap: wrap;
    padding-top: 20px;
}
.container .parent .data {
    /* background-color: green; */
    width: 70%;
    display: block;
    /* margin-top: 50px; */
    margin-bottom: 5px;
    padding: 5px;
}

.grade{
    background-color: rgb(78, 146, 197);
    color: white;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    border-radius: 5px;
}

.grade span {
    border: 1px solid white;
    width: 30px;
    height: 30px;
    text-align: center; 
    border-radius: 20px;
    font-size: 20px;
    margin: 3px;
    cursor: pointer;
}

.grade h1 {
    font-size: 30px;
    margin: 5px 10px;
}

.container .data .table {
    margin: 5px auto;
    width: 95%;
    padding: 5px;
    height: auto;
}
.container .data table{
    width: 100%;
    /* margin: 15px; */
}
.container .data .header {
    margin-bottom: 2rem;
    background-color: rgb(69, 94, 158);
    font-size: 1.6rem;
    color: white;

}
.container .data .show {
    display: block;
    /* min-width: 95%; */

}
.container .data tbody{
    background-color:rgb(202, 202, 211) ;
    margin: 5px 0 5px;
    color: black;
}

.element {
    padding: 5px;
    height: 35px;
    font-size: 1.4rem;
}
.btn-update {
    background-color: #4caf50;
    color: #fff;
  }

  .btn-delete {
    background-color: #f44336;
    color: #fff;
  }

  .btn-update:hover,
.btn-delete:hover {
    /* padding: 10px; */
    transform: translateY(-3px);
  }

.btn-update,
.btn-delete {
padding: 0.6rem 1rem;
border: none;
border-radius: 4px;
font-size: 0.9rem;
margin-right: 0.6rem;
cursor: pointer;
transition: transform 0.3s ease-in-out;
}

</style>