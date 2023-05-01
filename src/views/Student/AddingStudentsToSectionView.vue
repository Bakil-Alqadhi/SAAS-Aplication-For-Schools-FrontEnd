<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { storeDataStudents } from '../../store/storeDataStudents';
import { storeDataSchools } from '../../store/storeDataSchools';
import { storeAuthUser } from '../../store/storeAuthUser';

const students = computed(() => storeDataStudents.getters.students);

const checkboxes =ref([]);

const props = defineProps({
    id: String,
})
onMounted(()=>{
    storeDataStudents.dispatch('fetchOneSectionStudents', props.id)
    checkboxes.value = document.getElementsByName("students[]")
})

const addStudentsToSection = ()=>{
    const selectedStudents = []
    for(let i=0; i< checkboxes.value.length; i++){
        if(checkboxes.value[i].checked){
            selectedStudents.push(checkboxes.value[i].value)
        }
    }
    // console.log(selectedStudents)
    // console.log(JSON.stringify(selectedStudents))
    storeDataSchools.dispatch('addStudentsToSection', {
        section: props.id,
        students: JSON.stringify(selectedStudents)
    })
}
</script>
<template>
    <div  v-if="students" class="grade-table-container">   
     <!-- bg-green-500  -->
    <div class="flex justify-end">

      <!-- bg-gray-800 -->
        <button @click="addStudentsToSection" class="relative create-grade inline-flex items-center justify-center px-10 py-4 mb-5 overflow-hidden font-bold tracking-tighter  text-white bg-green-600 rounded-lg group"> 
            <span class="absolute w-0 h-0 transition-all duration-500 ease-out bg-blue-500 rounded-full group-hover:w-60 group-hover:h-56"></span>
            <span class="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
            <span class="relative">Save</span>
        </button>
    </div>
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
        <tr v-for="(student, index) in students" :key="index">
            <td>{{ index + 1 }}</td>
            <td>
                <img class="h-12 w-12 rounded-full object-cover" :src="student.image" alt="Student Image">
            </td>
            <td>{{ student.student_first_name + ' ' + student.student_last_name }}</td>
            <td>{{ student.grad_name }}</td>
            <td>{{ student.classroom_name }}</td>
            <td>
                <router-link :to="{name: 'WaitingStudentDetailView', params:{id: student.id}}">
                    <i class="far fa-eye hover:text-blue-500  hover:cursor-pointer"></i>
                </router-link>
                    <input type="checkbox" name="students[]" :value="student.id" class="add">
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
    /* max-width: 600px;
    margin: 0 auto; */
    max-width: 100%;
    height: 100vh;
    margin: 0 100px;
    padding:7rem 2rem 2rem;
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

  .add {
    /* padding: 0.6rem 1rem; */
    margin-top: 5px;
    background-color: red;
    border-radius: 4px;
    margin-left: 2rem;
    cursor: pointer;
  }

@media (max-width:768px){

    .btn-delete {
        margin-top: 8px;
    }
    .grade-table-container {
        margin: 0 auto;
    }

}
</style>