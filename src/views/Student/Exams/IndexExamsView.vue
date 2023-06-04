<script setup>
import { computed, onMounted } from "vue";
import { storeDataStudents } from "../../../store/storeDataStudents";
import { useRouter } from "vue-router";
const exams = computed(()=>storeDataStudents.getters.exams)
const router = useRouter()

onMounted(()=>{
    storeDataStudents.dispatch('fetchExams')
})

const handlePassExam = (id)=>{
  if(confirm("You have an hour for this exam, Please don't reload the page, or close it, the exam will be canceled!, are your sure you want to continue?")){
    router.push({name: 'ShowExam', params:{exam: id}})
  }
}
</script>

<template>
  
    <div  class="grade-table-container">   
        <table v-if="exams" class="grade-table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Subject's Name</th>
              <th>Exam's Name</th>
              <th>Pass / total</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(exam, index) in exams" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ exam.subject_name }}</td>
              <td>{{ exam.name }}</td>
              <td>
                <!-- <router-link :to="{name: 'ShowExam', params:{exam: exam.id}}"  class="btn-update hover:text-green-500">
                    <i class="fa-solid fa-file-pen"></i>
                </router-link> -->
                <button v-if="!exam.totalScore && exam.questions" @click="handlePassExam(exam.id)"  class="btn hover:text-green-500">
                    <i class="fa-solid fa-file-pen"></i>
                </button>
                <p v-else>{{ exam.totalScore? exam.totalScore: 'Not available yet' }}</p>
                <!-- <p   v-else-if="exam.totalScore != -1">{{ exam.totalScore }}</p> -->
                <!-- <p v-else>Not available yet</p> -->
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
    
    <style scoped>
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
        text-align: center;
      }
    
      .grade-table tr:nth-child(even) {
        background-color: #f2f2f2;
      }
    
      .btn{
        background-color: white;
        color: #7ccf7e;
        padding: 0.6rem .9rem;
        border: none;
        border-radius: 4px;
        font-size: 1.4rem;
        text-align: center;
        margin-right: 0.2rem;
        cursor: pointer;
        transition: transform 0.3s ease-in-out;
      }
    
      .btn:hover {
        transform: translateY(-3px);
      }
    
    @media (max-width:768px){
      .btn{
            display: block;
            margin-top: 8px;
        }
        
        .grade-table-container {
         min-width: 90%;
        margin: 0 ;
      }
    
      .grade-table {
    
        min-width: 100%;
      }
    }
    @media (max-width:1200px){
    
      .grade-table {
    
        min-width: 100%;
      }
    }
    </style>