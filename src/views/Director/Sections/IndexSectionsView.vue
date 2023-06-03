<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { mapActions } from "vuex";
import { storeDataSchools } from "../../../store/storeDataSchools";

const classrooms = computed( ()=> storeDataSchools.getters.classrooms)
const message = computed( ()=> storeDataSchools.getters.gradeMessage)
const gradesData= computed(() => storeDataSchools.getters.sections)


var counter = ref(0);
// var x = ref('')
onMounted( async()=>{
    if(message.value){
        launch_toast()
    }
    mapActions['fetchSections']
    await  storeDataSchools.dispatch('fetchSections')    
})
// const show = ()=> {
//    var  x = document.querySelector(".table");
//    if(counter.value == 0  || counter.value < (gradesData.value).length){
//     counter.value ++;
//     document.getElementById("btn-show").innerHTML = "-";
//     x.classList.add("show")
//     x.style.opacity = "1"
//    } else {
//     counter.value = 0;
//     document.getElementById("btn-show").innerHTML = "+";
//     x.classList.remove("show")
//    }
// }

function launch_toast() {
    var x = document.getElementById("toast")
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 4000);
}


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
        <div class="head">
        <!-- bg-gray-800 -->
            <router-link to="/sections/create"  class="relative btn-create create-grade inline-flex items-center justify-center px-10 py-4  overflow-hidden font-bold tracking-tighter  text-white bg-green-600 rounded-lg group"> 
                <span class="absolute w-0 h-0 transition-all duration-500 ease-out bg-blue-500 rounded-full group-hover:w-60 group-hover:h-56"></span>
                <span class="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
                <span class="relative">New Section</span>
            </router-link>
        </div>
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
                <div v-else id="table_data">Nothing</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    /* background-color: rgb(111, 111, 189); */
    min-width: 100%;
    height: 100vh;
    padding: 2rem;
}
.container .head {
    text-align: start;
    
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

/* .container .data {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: ;
} */

.container .data .table {
    margin: 5px auto;
    /* background-color: #c3b6b67c; */
    width: 95%;
    padding: 5px;
    height: auto;
    /* display: none; */
    /* opacity: 1; */
    /* transition: opacity 1s ease-out; */

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
    /* display: inline-table; */
    /* height: 30px; */
    margin: 5px 0 5px;
    color: black;
    /* margin: 20px; */
    /* border-radius: 5px; */
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

@media (max-width:768px){

.container {
  margin-left:  11rem;
}

}

</style>