<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { storeDataStudents } from '../../store/storeDataStudents';
import { storeAuthUser } from '../../store/storeAuthUser';
import { storeAuthSchools } from '../../store/storeAuthSchools';
import { storeDataSchools } from '../../store/storeDataSchools';
import { mapActions } from 'vuex';

const allTheStudents = computed(() => storeDataStudents.getters.students);
// const authUser = computed(()=> storeAuthUser.getters.user)
// watch( authUser, newValue => {
//     storeDataStudents.dispatch('fetchStudents', newValue.school_id)
//     console.log(allTheStudents);  

// })

onMounted(()=>{
  storeDataStudents.dispatch('fetchStudents')
})


const graduate = (id, name)=>{
  if(confirm("Are you sure, You want to delete "+ name + "?")){
    mapActions('handleCreateGraduateOneStudent', id)
    storeDataSchools.dispatch('handleCreateGraduateOneStudent', id)
  }
}
</script>
<template>
    <div  v-if="allTheStudents" class="grade-table-container">   
    <table class="grade-table">
      <thead>
        <tr>
            <th>Id</th>
            <th>Image</th>
            <th>Full name</th>
            <th>Grade</th>
            <th>Classroom</th>
            <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(student, index) in allTheStudents" :key="index">
            <td>{{ index + 1 }}</td>
            <td>
                <img class="h-12 w-12 rounded-full object-cover" :src="student.image" alt="Student Image">
            </td>
            <td>{{ student.student_first_name + ' ' + student.student_last_name }}</td>
            <td>{{ student.grad_name }}</td>
            <td>{{ student.classroom_name }}</td>
            <td>
                <button class="btn-show" >
                  <router-link :to="{name: 'WaitingStudentDetailView', params:{id: student.id}}" >
                    <!-- <i class="far fa-eye hover:text-blue-500 hover:cursor-pointer"></i> -->
                    Show
                </router-link>
                </button>
                <button  class="btn-update hover:text-green-600">
                  Promotion
                </button>
                <button @click="graduate(student.id, student.student_first_name)"  class="btn-delete">
                  Graduate
                </button>
                <!-- <button  @click="deleteClassroom(student.id)" class="btn-delete">Delete</button> -->
            </td>
        </tr>
        <!-- Add more rows here -->
      </tbody>
    </table>
  </div>

</template>
<style scoped>

.create-grade {
    font-size: 1.2rem;
}
.grade-table-container {
    max-width: 100%;
    margin: auto;
    padding: 2rem;
  }
td,th {
  text-align: center;
  }
  .grade-table {
    border-collapse: collapse;
    width: 100%;
    font-size: 1.2rem;
    text-align: left;
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


  .btn-show {
    /* background-color: #4caf50; */
    color: #4c74af;
    border: 1px solid #4c74af;
  }
  .btn-update {
    /* background-color: #4caf50; */
    color: #4caf50;
    margin-top: 4px;
    border: 1px solid #4caf50;
  }

  .btn-delete {
    /* background-color: #f44336; */
    color: #f44336;
    margin-top: 4px;
    border: 1px solid #f44336;
  }

@media (max-width:768px){
     .btn-delete {
        /* display: block; */
        margin-top: 8px;
    }
    
    /* .grade-table-container {
    max-width: 600px;
    margin: 0 auto;
  } */

  .grade-table-container {
    min-width: 90%;
    margin:0  11rem;
  }
}
</style>