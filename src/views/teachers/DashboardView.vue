<script setup>
import { onMounted, computed, watch } from 'vue';
import {storeDataStudents} from '../../store/storeDataStudents';
import { storeDataTeachers } from '../../store/storeDataTeachers';

import { storeAuthUser } from '../../store/storeAuthUser';
import { mapActions } from 'vuex';

// const allTheStudents = computed(() => storeDataStudents.getters.students);
// const allTheTeachers = computed(() => storeDataTeachers.getters.teachers);
const authUser = computed(() => storeAuthUser.getters.user);

// watch(authUser, newValue =>{
//   storeDataStudents.dispatch('fetchStudents', newValue.school_id)
//     storeDataTeachers.dispatch('fetchTeachers', newValue.school_id)
// })
onMounted( async()=>{
    mapActions['getUser']
  storeAuthUser.dispatch('getUser')
})

</script>
<template>
    <div class="container"  v-if="authUser">
        <h1>hello teacher</h1>
    </div>
</template>

<style scoped>
.container {
    background-color: red;
    min-width: 100%;
    height: 100vh;
}
</style>