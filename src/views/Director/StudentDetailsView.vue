<script setup>
import { computed,  watch, onMounted } from 'vue';
import { storeDataStudents } from '../../store/storeDataStudents';
import { storeAuthUser } from '../../store/storeAuthUser';
import { storeDataSchools } from '../../store/storeDataSchools';
import { useRouter } from "vue-router";
const router = useRouter()
const props= defineProps({
    id: String
})
const student = computed(()=> storeDataStudents.getters.student)
const authUser = computed(()=> storeAuthUser.getters.user)
onMounted(async()=>{
  await storeDataStudents.dispatch('fetchOneStudent', {  student: props.id })
})

const handleAccept = async()=>{
    await storeDataSchools.dispatch('acceptNewMember', {  
      'member_id' : props.id,
      'userType': 'student' 
  })
}
const back = ()=> {
    router.go(-1);
}
</script>
<template>
  <div v-if="student" class=" container">
    <div class="main student">
      <h1>Student Information</h1>
      <div class="about">
        <div class="data">
          <div class="item">
            <label for="name">Full Name:</label>
            <p id="name">{{ student.student_first_name + ' '+ student.student_middle_name + ' '+ student.student_last_name}}</p>
          </div>
          <div class="item">
            <label for="birthday">Birthday: </label>
          <p id="birthday">{{ student.birthday }}</p>
          </div>
          <div class="item">
            <label for="phone">Phone:</label>
          <p for="phone">{{ student.student_phone }}</p>
          </div>
          <div class="item">
            <label for="email">Email:</label>
          <p for="email">{{ student.student_email }}</p>
          </div>
          <div class="item">
            <label for="address">Address:</label>
            <p id="address">{{ student.address }}</p>
          </div>
          <div class="item">
            <label for="address">Grade and Classroom:</label>
            <p id="address">{{ student.grad_name + ', '+ student.classroom_name }}</p>
          </div>
        </div>
        <div class="image">
          <img :src="student.image" class="" alt="Student Photo">
        </div>
      </div>
    </div>
    <div class="main parent">
      <h1>Parent Information</h1>
      <div class="about">
        <div class="data">
          <div class="item">
            <label for="name">Full Name:</label>
            <p id="name">{{ student.parent_first_name + ' '+ student.parent_last_name }}</p>
          </div>
          <div class="item">
            <label for="phone">Phone:</label>
          <p for="phone">{{ student.parent_phone }}</p>
          </div>
          <div class="item">
            <label for="email">Email:</label>
          <p for="email">{{ student.parent_email }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="text-center mt-5" v-if="!student.isJoined">
      <button @click="handleAccept" class="bg-blue-600  hover:bg-blue-700 font-bold rounded-lg  text-white">Accept</button>
      <!-- <button @click="handleRejection" class="bg-red-600 hover:bg-red-700 font-bold rounded-lg  text-white">Reject</button> -->
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
  /* padding: 30px; */
  max-width: 80%;
    margin: 0 auto;
    padding: 2rem 1rem;
}

.container .main {
  background-color: white;
  margin: 20px;
}
.container .main h1{
  width: 40%;
  font-size: large;

}
.container .main .about {
  /* background-color: blueviolet; */
  width: 100%;
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
.item p {
  padding: 10px;
  text-align: center;
  margin-left: 10px;
}
.container .main .about .image {
  margin-right: 50px;
  max-width: 400px;
}
.container .main .about img {
  border-radius: 10px;
}

@media (max-width:540px){
  .container {
    max-width: 90%;
    margin-left:11rem;
    margin-bottom:11rem;
  }
  .container .main .about .item label {
  display: block;
  max-width: 70%;
}

}
@media (max-width:768px){
  .container .main .about {
  /* display: flex;  */
  flex-direction: column;
  /* justify-content: space-between; */
}
.container .main h1{
  width: 100%;
}
.image {
  margin-top: 1rem;
}
.item label {
  min-width: 80%;
  text-align: center;
  align-content: center;
}
.item p {
  /* text-align: start; */
  min-width: fit-content;
  /* padding: 0; */
}
}
@media (max-width:1040px){
.item label {
  max-width: 50%;
}
}
</style>