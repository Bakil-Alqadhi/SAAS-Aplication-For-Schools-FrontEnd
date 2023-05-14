<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { mapActions } from "vuex";
import { storeDataSchools } from "../../../store/storeDataSchools";
import { useRouter } from "vue-router";
const classrooms = ref ([{
        name: '',
        grade: '',
      }])


const grades = computed(()=> storeDataSchools.getters.grades)
const errors = computed(()=> storeDataSchools.getters.errors)
const errorsList= ref('')
const router = useRouter()
function addClassroom() {
      classrooms.value.push({
        name: '',
        grade: '',
      });
    }
function removeClassroom(index) {
      classrooms.value.splice(index, 1);
    }

function saveClassrooms() {
    //   localStorage.setItem('classrooms', JSON.stringify(classrooms.value));
    // console.log(JSON.stringify(classrooms.value))
    storeDataSchools.dispatch('createClassroom', JSON.stringify(classrooms.value))
}
watch(errors, newValue => {
    errorsList.value.style['display'] = 'block'
})
onMounted(async()=>{
    errorsList.value = window.document.querySelector('.errors');
    mapActions['fetchGrades']
    await storeDataSchools.dispatch('fetchGrades')
    if (localStorage.getItem('classrooms')) {
      try {
        classrooms.value = JSON.parse(localStorage.getItem('classrooms'));
      } catch(e) {
        localStorage.removeItem('classrooms');
      }
    }
    console.log(grades);
})

const back = ()=>{
  router.go(-1);
}
</script>
<template>
  <div class="container">
    <form @submit.prevent="saveClassrooms">
        <p @click="back">X</p>
    <div class="errors">
        <span v-for="(error, index) in errors" :key="index">{{ error }}</span>
    </div>
    <div class="repeater" v-for="(classroom, index) in classrooms" :key="index">
      <input type="text" v-model="classroom.name" placeholder="Classroom Name" />
      <select v-model="classroom.grade">
        <option value="">Select Grade</option>
        <option v-for="grade in grades" :key="grade.id" :value="grade.id">{{ grade.name }}</option>
      </select>
      <button type="button" class="remove" @click="removeClassroom(index)">Remove</button>
    </div>
    <div class="buttons">
        <button type="button" class="add" @click="addClassroom">Add Classroom</button>
        <button type="submit" class="save">Save</button>
    </div>
  </form>
</div>

</template>

<style scoped>

body {
  transition:ease-in-out linear 2s;

}
.errors{
    display: none;
    background-color: rgb(245, 101, 101);
    color: white;
    width: 100%;
    /* height: 50px; */
    border-radius: 10px;
    /* margin-bottom: 5px; */
    /* margin-top: 20px; */
    padding: 3px 15px;
}

.errors span {
    width: 100%;
    display: block;
    font-size: 10px;
}
/* .container {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
} */

/* .container {
  background-color: #59313166;
  position: absolute;
  height: 100vh;
  width: 100%;
  z-index: 1200;
  margin:0 0;
  top: 50%; left: 50%; 
  display: flex;
  justify-content: center;
  align-items: center;  
  transform: translate(-50%, -50%);
} */

.container {
  background-color: #d6cdcd66;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  min-width: 100%;
  z-index: 1200;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  transition: linear 2s ;
    /* transition: opacity 0.3s ease-in-out, visibility 0s linear 0.3s; */


}

.container-form {
  background-color: #eee;
  width: 50%;
  z-index: 1300;
  height: 70%;
  padding: 20px;
}
.container form {
  position: relative;
  background-color: white;
    border: 1px solid #ccc;
    padding: 20px 20px 10px;
    border-radius: 10px;
    -webkit-box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
    -moz-box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
    /* box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2); */
    box-shadow: 0 5px 30px 0 rgba(0,0,0,0.2);
      transition: linear .4s ;

}

.container form p {
  position: absolute;
  background-color: rgb(210, 53, 18);
  color: white;
  font-size: large;
  font-weight: bold;
  width: 30px;
  /* height: 30px; */
  top: 5px;
  left: 5px;
  margin-bottom: 3px;
  text-align: center;
  border-radius: 3px;
  cursor: pointer;
}

.container form p:hover {
  background-color: red;
}
.repeater {
  margin: 15px;
  margin-top: 20px;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: space-evenly;
  /* transition: linear 5s ; */
  /* transition: all 0.3s ease-in-out; */
  -webkit-box-shadow: 0px 5px 5px -5px rgba(34, 60, 80, 0.6);
    -moz-box-shadow: 0px 5px 5px -5px rgba(34, 60, 80, 0.6);
    box-shadow: 0px 5px 5px -5px rgba(34, 60, 80, 0.6);

}

.repeater input {
    margin:0 20px 0 5px ;
    /* font-size: small; */
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 3px;
}
.repeater select {
    margin:0 20px 0 5px ;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 3px;
    /* font-size: small; */
}
.repeater select option {
    font-size: small;
}
.repeater button {
  /* position: absolute; */
  right: 10px;
  bottom: 10px;
  border-radius: 5px;
  border: none;
  /* background-color: #ccc; */
  color: #fff;
  padding: 5px 10px;
  /* ease */
}

.buttons {
    text-align: center;
    display: flex;
    justify-content: space-between;
}
button {
  border-radius: 5px;
  border: none;
  color: #fff;
  padding: 5px 10px;
  /* transition:  0.3s linear; */
}

.repeater  .remove {
    background-color: rgb(210, 53, 18) ;
}

.remove:hover {
    background-color: red;
}
.buttons .add {
    background-color: rgb(110, 79, 214);
    margin-right: 4px;
}
.buttons .save {
    background-color: rgb(88, 214, 79);
}

.save:hover {
  background-color: rgb(107, 240, 100);
}

 .add:hover  {
  background-color: rgb(51, 51, 221);
}

@media (max-width:768px){
    .container form {
    padding: 5px;
}
    .repeater {
        padding: 7px;
        margin-top: 30px;
    }

    .container form p {
      font-size: medium;
      width: 20px;
    }
    .errors {
      margin-top: 30px;
    }
}
</style>