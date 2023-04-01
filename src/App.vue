<script setup>
import Nav from './components/Nav.vue'
import Dashboard from './components/Dashboard.vue';
import { storeAuthUser } from './store/storeAuthUser';
import { computed, onMounted, ref } from 'vue';
import DashboardStudentsAndTeacher from './components/DashboardStudentsAndTeacher.vue';

const authUser = computed(()=>storeAuthUser.getters.user)

onMounted(async()=>{
    await storeAuthUser.dispatch('getUser')
})
</script>

<template>
 <div v-if="!authUser">
    <Nav />
    <main class="m-10">
      <RouterView />
    </main>
  </div>
  <div v-else>
      <Dashboard v-if="authUser.userType == 'director'">
        <RouterView />
      </Dashboard>
      <DashboardStudentsAndTeacher v-else>
        <RouterView />
      </DashboardStudentsAndTeacher>
  </div>
</template>
