<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { mapActions } from "vuex";
import { storeDataSchools } from "../../store/storeDataSchools";

const classrooms = computed( ()=> storeDataSchools.getters.classrooms)
const message = computed( ()=> storeDataSchools.getters.gradeMessage)

// var x = ref('')
onMounted( async()=>{
    // x.value = document.getElementById("table_data");

})
var counter = ref(0);
const show = ()=>{
   var  x = document.querySelector(".table");
   if(counter.value == 0 ){
    counter.value ++;
    document.getElementById("btn-show").innerHTML = "-";
    x.classList.add("show")
    x.style.opacity = "1"
   } else {
    counter.value = 0;
    document.getElementById("btn-show").innerHTML = "+";
    x.classList.remove("show")
   }
}

</script>
<template>
    <div v-if="classrooms" class="container">
        <div class="parent">
            <div class="data">
                <div class="grade">
                    <h1>Grade</h1>
                    <span id="btn-show" @click="show">+</span>
                </div>
                <div class="table">
                    <table id="table_data">
                    <thead>
                        <tr>
                        <th>Section</th>
                        <th>Classroom Name</th>
                        <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody >
                        <tr class="element">
                            <td>section</td>
                            <td>classroom</td>
                            <td>update</td>
                        </tr>
                        <tr class="element">
                            <td>section</td>
                            <td>classroom</td>
                            <td>update</td>
                        </tr>
                        <tr class="element">
                            <td>section</td>
                            <td>classroom</td>
                            <td>update</td>
                        </tr>
                    </tbody>
                </table>
                </div>
            </div>
            <div class="data">
                <div class="grade">
                    <h1>Grade</h1>
                    <span id="btn-show" @click="show">+</span>
                </div>
                <div class="table">
                    <table id="table_data">
                    <thead>
                        <tr>
                        <th>Section</th>
                        <th>Classroom Name</th>
                        <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody >
                        <tr class="element">
                            <td>section</td>
                            <td>classroom</td>
                            <td>update</td>
                        </tr>
                        <tr class="element">
                            <td>section</td>
                            <td>classroom</td>
                            <td>update</td>
                        </tr>
                        <tr class="element">
                            <td>section</td>
                            <td>classroom</td>
                            <td>update</td>
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
    /* background-color: rgb(111, 111, 189); */
    min-width: 100%;
    height: 100vh;
}
.container .parent {
    /* background-color: red; */
    min-width: 70%;
    display: flex;
    justify-content: center;
    text-align: center;
    flex-wrap: wrap;
    padding-top: 40px;
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
    border-radius: 10px;
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
    background-color: #c3b6b67c;
    width: 95%;
    padding: 5px;
    height: auto;
    display: none;
    opacity: 0;
    transition: opacity 1s ease-out;

}
.container .data table{
    width: 100%;
    margin: 15px;
}

.container .data .show {
    display: block;
    /* min-width: 95%; */

}
.container .data tbody tr {
    /* background-color:white ; */
    /* display: inline-table; */
    height: 30px;
    margin: 0;
    /* margin: 20px; */
    /* border-radius: 5px; */
}
</style>