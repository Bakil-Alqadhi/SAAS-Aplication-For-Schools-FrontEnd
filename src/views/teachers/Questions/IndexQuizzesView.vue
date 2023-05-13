<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { storeDataSchools } from "../../../store/storeDataSchools";

const quizzes = computed( ()=> storeDataSchools.getters.exams)

onMounted(async()=>{
    await storeDataSchools.dispatch('fetchTeacherQuizzes');
})

</script>
<template>
  
<div  class="grade-table-container">   
    <table v-if="quizzes" class="grade-table">
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Subject</th>
          <th>Teacher</th>
          <th>Grade</th>
          <th>Classroom</th>
          <th>Section</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(quiz, index) in quizzes" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ quiz.name }}</td>
          <td>{{ quiz.subject_name }}</td>
          <td>{{ quiz.teacher_last_name +' '+ quiz.teacher_first_name}}</td>
          <td>{{ quiz.grade_name }}</td>
          <td>{{ quiz.classroom_name }}</td>
          <td>{{ quiz.section_name }}</td>
          <td>
            <router-link to="/questions/create"  class="btn-update border border-green-500 hover:text-green-600">
              Questions
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.create-grade {
    font-size: 1.2rem;
}
.grade-table-container {
    /* min-width: 100%;
    margin: 20px 117px;
    padding: 2rem;
    text-align: center; */

    max-width: 90%;
    margin: 0 120px;
    padding: 2rem;
  }

  .grade-table {
    border-collapse: collapse;
    min-width: 90%;
    font-size: 1.5rem;
    text-align: center;
    overflow: hidden;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
    border-radius: 10px 10px 0 0;
  }

  .grade-table th {
    background-color: rgb(87, 87, 202);
    /* background-color: #333; */
    color: #fff;
    padding: 0.8rem;
    font-weight: bold;
    text-transform: uppercase;
  }

  .grade-table td {
    padding: 0.8rem;
  }

  .grade-table tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  .btn-update{
    padding: 0.6rem .9rem;
    /* border: none; */
    border-radius: 4px;
    font-size: 1.4rem;
    margin: 1rem;
    cursor: pointer;
    transition: transform 0.3s ease-in-out;
  }

  .btn-update:hover {
    transform: translateY(-3px);
  }


  .btn-update {
    /* background-color: #4caf50; */
    color: #4caf50;
  }



@media (max-width:768px){
  .btn-update{
        display: block;
        margin-top: 8px;
    }
    
    .grade-table-container {
     max-width: 60%;
    margin: 0 ;
  }

  .grade-table {

    min-width: 70%;
  }
}
@media (max-width:1200px){

  .grade-table {

    min-width: 80%;
  }
}
</style>