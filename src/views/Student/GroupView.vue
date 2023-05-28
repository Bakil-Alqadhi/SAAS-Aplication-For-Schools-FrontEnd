<script setup>
import { computed, onMounted } from "vue";
import { storeDataStudents } from "../../store/storeDataStudents";
const students = computed(()=>storeDataStudents.getters.students)

onMounted(()=>{
    storeDataStudents.dispatch('fetchGroupStudents')
})

</script>

<template>
  
    <div  class="grade-table-container">   
        <table v-if="students" class="grade-table">
          <thead>
            <tr>
              <th>Id</th>
              <th class="text-start">Name</th>
              <th class="text-center">Email</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(student, index) in students" :key="index">
              <td>{{ index + 1 }}</td>
              <td class="text-start">{{ student.first_name + ' '+ last_name }}</td>
              <td class="text-center">{{ student.email }}</td>
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
        /* text-align: start; */
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