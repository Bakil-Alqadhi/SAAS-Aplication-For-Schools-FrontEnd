<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { mapActions } from "vuex";
import { storeDataTeachers } from "../../../store/storeDataTeachers";

const questions = computed( ()=> storeDataTeachers.getters.questions)

const props = defineProps({
  id: String
})

onMounted(async()=>{
    // await mapActions['fetchQuestions']
    await storeDataTeachers.dispatch('fetchQuestions', props.id);
})


const deleteQuestion =async (id)=> {
  if(confirm("Are you sure?")){
    await storeDataTeachers.dispatch('handleDeleteQuestion', {
      'quiz' : props.id,
      'id' : id
    })
  }
}

</script>
<template>
  <div class="flex justify-between new">

<!-- bg-gray-800 -->
  <router-link :to="{ name: 'CreateQuestion', params: { id: props.id}}"  class="relative create-grade inline-flex items-center justify-center px-10 py-4 mb-4 overflow-hidden font-bold   text-white bg-green-600 rounded-lg group"> 
      <span class="absolute w-0 h-0 transition-all duration-500 ease-out bg-blue-500 rounded-full group-hover:w-60 group-hover:h-56"></span>
      <span class="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
      <span class="relative text">New Question</span>
  </router-link>
</div>
<div v-if="questions" class="grade-table-container">   
     <!-- bg-green-500  -->
    <table class="grade-table">
      <thead>
        <tr>
          <th>Id</th>
          <th>Title</th>
          <th>Answers</th>
          <th>Right Answer</th>
          <!-- <th>Quiz</th> -->
          <th>Score</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(question, index) in questions" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ question.title }}</td>
          <td>{{ question.answers }}</td>
          <td>{{ question.right_answer }}</td>
          <!-- <td>{{ question.quiz_name }}</td> -->
          <td>{{ question.score }}</td>
          <td>
            <!-- <router-link class="btn-show" :to="{name: 'ShowClassroom', params:{id: subject.id}}">
                <i class="far fa-eye hover:text-blue-500 hover:cursor-pointer"></i>
            </router-link> -->
            <router-link :to="{name: 'EditQuestion', params:{quiz: props.id , question: question.id}}"  class="btn-update hover:text-green-600">
              <i class="fas fa-edit"></i>
            </router-link>
            <button  @click="deleteQuestion(question.id)" class="btn-delete">
              <i class="fa fa-trash" aria-hidden="true"></i>
            </button>
          </td>
        </tr>
        <!-- Add more rows here -->
      </tbody>
    </table>
  </div>
  <div v-else class="text-4xl text-red-300">
    <h1>There is no data yet</h1>
  </div>
</template>

<style>
.new {
  min-width: 90%;
  padding:0 2rem;
  margin-bottom: 1rem;
  margin: 0 120px;
}
.new .text {
  font-size: 13px;
}
.create-grade {
    font-size: 1.2rem;
}
.grade-table-container {
    min-width: 90%;
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

  .btn-update,
  .btn-show,
  .btn-delete {
    padding: 0.6rem .9rem;
    border: none;
    border-radius: 4px;
    font-size: 1.4rem;
    margin-right: 0.2rem;
    cursor: pointer;
    transition: transform 0.3s ease-in-out;
  }

  .btn-update:hover,
  .btn-delete:hover,
  .btn-show:hover {
    transform: translateY(-3px);
  }


  .btn-update {
    color: #4caf50;
  }

  .btn-delete {
    color: #f44336;
  }


@media (max-width:768px){
  .btn-update,
  .btn-show{
        display: block;
        margin-top: 8px;
    }
    
    .grade-table-container, .new {
     max-width: 100%;
    margin: 0 ;
  }

  .grade-table {

    min-width: 70%;
  }
}
/* @media (max-width:1200px){

  .grade-table {

    min-width: 100%;
  }
} */
</style>