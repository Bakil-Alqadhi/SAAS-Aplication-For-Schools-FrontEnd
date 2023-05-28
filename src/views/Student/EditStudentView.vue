<script setup>
import { computed,  watch, onMounted } from 'vue';
import { storeDataStudents } from '../../store/storeDataStudents';
import { storeAuthUser } from '../../store/storeAuthUser';
import { storeDataSchools } from '../../store/storeDataSchools';
import { mapActions } from 'vuex';

const props= defineProps({
    id: String
})
const student = computed(()=> storeDataStudents.getters.student)
const authUser = computed(()=> storeAuthUser.getters.user)
onMounted(async()=>{
  await storeDataStudents.dispatch('fetchOneStudent', {  student: props.id })
})

const handleUpdate = async()=>{
  storeDataStudents.dispatch('handleUpdateStudent', student.value)
    // console.log(student.value)
}
const handleDeleteAccount = async()=> {
  if(confirm("Are you sure?")){
  mapActions['handleDeleteStudent', props.id]
  storeDataStudents.dispatch('handleDeleteStudent', props.id)
  }
}
</script>
<template>
  <div v-if="student && authUser" class=" container">
    <form @submit.prevent="handleUpdate" action="">
      <div class="main student">
      <h1>Student Information</h1>
      <div class="about">
        <div class="data">
          <div class="item">
            <label for="first_name">Your Name:</label>
            <input type="text" name="" id="first_name" v-model="student.student_first_name"/>
          </div>
          <div class="item">
            <label for="first_name">Middle Name:</label>
            <input type="text" name="" id="first_name" v-model="student.student_middle_name"/>
          </div>
          <div class="item">
            <label for="last_name">Last Name:</label>
            <input type="text" name="" id="last_name" v-model="student.student_last_name" />
          </div>
          <div class="item">
            <label for="birthday">Birthday: </label>
          <input type="date" name="" id="birthday" v-model="student.birthday" />
          </div>
          <div class="item">
            <label for="phone">Phone:</label>
          <input type="text" name="" id="phone" v-model="student.student_phone">

          </div>
          <div class="item">
            <label for="email">Email:</label>
          <input type="email" name="" v-model="student.student_email" id="email">
          </div>
          <div class="item">
            <label for="address">Address:</label>
            <input type="text" name="" id="address" v-model="student.address">
          </div>
        </div>
        <div class="image">
          <img :src="student.image" class="" alt="Student Photo">
          <div class="mt-10 p-10 border-white border-1 border-solid">
            <input type="file" placeholder="image"  >
          </div>
        </div>
      </div>
    </div>
    <div class="main parent">
      <h1>Parent Information</h1>
      <div class="about">
        <div class="data">
          <div class="item">
            <label for="first_name">Your Name:</label>
            <input type="text" name="" id="first_name" v-model="student.parent_first_name"/>
          </div>
          <div class="item">
            <label for="last_name">Last Name:</label>
            <input type="text" name="" id="last_name" v-model="student.parent_last_name" />
          </div>
          <div class="item">
            <label for="phone">Phone:</label>
            <input type="text" name="" id="phone" v-model="student.parent_phone">
          </div>
          <div class="item">
            <label for="email">Email:</label>
            <input type="email" name="" v-model="student.parent_email" id="email">
          </div>
        </div>
      </div>
    </div>
    <div class="text-center mt-5">
      <button type="submit" class="bg-green-600 update  hover:bg-green-700 font-bold rounded-lg  text-white">Update</button>
    </div> 
    </form>

    <div class="text-center delete">
      <button @click="handleDeleteAccount" class="bg-red-600 hover:bg-red-700 font-bold rounded-lg  text-white">Delete Your Account</button>  
    </div> 
 </div>
</template>

<style scoped>

button {
  width: auto;
  padding: 7px;
  margin: 10px;
  font-size: large;
}
.container {
  /* background-color: aqua; */
  padding: 30px;
  position: relative;
  /* z-index: 1000; */
}

.delete {
  position: absolute;
  bottom: 30px;
  left:40px;
  /* top: 0; */
}
.container .main {
  background-color: rgb(151, 194, 243);
  padding: 5px;
  border-radius: 5px;
  margin: 20px;
}
.container .main h1{
  width: 40%;
  font-size: large;

}
.container .main .about {
  min-width: 100%;
  height: auto;
  display: flex; 
  justify-content: space-between;
  padding: 10px;
}

.container .main .about .data {
  /* display: inline-block; */
  width: 50%;
}
.container .main .about .item {
  display: flex;
  /* justify-content: space-between; */
  width: 100%;
  font-size: medium;
  margin-top: 10px;
}
.container .main h1, .item label{
  background-color: rgb(221, 221, 232);
  border: 1px solid blue;
  padding: 10px;
  color: blue;
  border-radius: 10px;
  font-weight: bold;
 }
.item label {
  max-width: 20%;
  width: 30%;
  font-size: small;
  margin-bottom: 5px;
}
.item input {
  color: black;
  padding: 5px;
  font-size: 1.3rem;
  /* text-align: center; */
  border-radius: 10px;
  margin-left: 10px;
}
.container .main .about .image {
  margin-right: 50px;
}
.container .main .about img {
  border-radius: 10px;
}

@media (max-width:540px){
  .container .delete {
  bottom: -20px;
  left: 40px;
  /* top: 0; */
}
.update {
  margin-left: -210px;
  /* top: 0; */
}
.item label {
  display: block;
  max-width: 100%;
}
.container .main .about .data {
    width: 100%;
  }
.item label {
  min-width: 100%;
  display: block;
}
.item input {
  width: 100%; 
}

}
@media (max-width:768px){
  .delete {
  bottom: -15px;
  left:90px;
}

  .container .main .about .data {
    width: 100%;
  }
.container .main h1{
  width: 100%;
}

.container .main .about {
  /* background-color: white; */
  flex-direction: column;
  /* text-align: center; */
}
.container .main .about .item {
  /* background-color: red; */
  width: 100%;
  flex-wrap: wrap;
  margin-bottom: 10px;
}
.item label {
  width: 100%;
  /* display: block;   */
}

.item input {
  margin-left: 0;

}
}
@media (max-width:1040px){
  .delete {
  bottom: 25px;
  left: 30px;
  /* top: 0; */
}
  .container .main .about {
    text-align: center;
  }
  .container .main .about .data {
    width: 80%;
  }
.item label {
  min-width: 100%;
  display: block;
}
.item input {
  margin-left: 0;
  width: 100%; 
}
.container .main .about {
  /* background-color: white; */
  flex-direction: column;
  /* min-width: 100%; */
  /* text-align: center; */
}
.container .main .about .item {
  /* background-color: red; */
  min-width: 100%;
  flex-wrap: wrap;
  margin-bottom: 10px;
}
}
</style>