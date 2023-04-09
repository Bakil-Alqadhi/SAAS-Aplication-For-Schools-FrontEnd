<script setup>
import { computed,  watch, onMounted } from 'vue';
import { storeDataStudents } from '../../store/storeDataStudents';
import { storeAuthUser } from '../../store/storeAuthUser';
const props= defineProps({
    id: String
})
const student = computed(()=> storeDataStudents.getters.student)
// const authUser = computed(() => storeAuthUser.getters.user);
onMounted(async()=>{
  await storeDataStudents.dispatch('fetchOneStudent', {  student: props.id })
})


</script>
<template>
  <div v-if="student" class="max-w-3xl mx-auto mx-10 mt-8">
    <h2 class="text-2xl font-medium mb-4">Student Information</h2>
    <table class="w-full border-collapse border border-gray-200">
      <tbody>
        <tr>
          <td class="p-4 border border-gray-200 font-medium">Name:</td>
          <td class="p-4 border border-gray-200"> {{ student.student_first_name + ' '+ student.student_middle_name + ' '+ student.student_last_name}} </td>
        </tr>
        <tr>
          <td class="p-4 border border-gray-200 font-medium">Birthday:</td>
          <td class="p-4 border border-gray-200"> {{ student.birthday }} </td>
        </tr>
        <tr>
          <td class="p-4 border border-gray-200 font-medium">Class:</td>
          <td class="p-4 border border-gray-200"> student.class </td>
        </tr>
        <tr>
          <td class="p-4 border border-gray-200 font-medium">Image:</td>
          <td class="p-4 border border-gray-200"><img :src="student.image" class="h-24 rounded-full object-cover" alt="Student Photo"></td>
        </tr>
        <tr>
          <td class="p-4 border border-gray-200 font-medium">Phone:</td>
          <td class="p-4 border border-gray-200"> {{ student.student_phone }} </td>
        </tr>
        <tr>
          <td class="p-4 border border-gray-200 font-medium">Email:</td>
          <td class="p-4 border border-gray-200"> {{ student.student_email }} </td>
        </tr>
        <tr>
          <td class="p-4 border border-gray-200 font-medium">Address:</td>
          <td class="p-4 border border-gray-200"> {{ student.address }} </td>
        </tr>
      </tbody>
    </table>
    <h2 class="text-2xl font-medium mt-8 mb-4">Parent Information</h2>
    <table class="w-full border-collapse border border-gray-200">
      <tbody>
        <tr>
          <td class="p-4 border border-gray-200 font-medium">Name:</td>
          <td class="p-4 border border-gray-200"> {{ student.parent_first_name + ' '+ student.parent_last_name }} </td>
        </tr>
        <tr>
          <td class="p-4 border border-gray-200 font-medium">Phone:</td>
          <td class="p-4 border border-gray-200"> {{ student.parent_phone }} </td>
        </tr>
        <tr>
          <td class="p-4 border border-gray-200 font-medium">Email:</td>
          <td class="p-4 border border-gray-200"> {{ student.parent_email }} </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
