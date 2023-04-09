<script setup>
import Nav from './components/Nav.vue'
import Dashboard from './components/Dashboard.vue';
import { storeAuthUser } from './store/storeAuthUser';
import { computed, onMounted, ref } from 'vue';
import DashboardStudentsAndTeacher from './components/DashboardStudentsAndTeacher.vue';
import SpinnerLoading from './components/SpinnerLoading.vue';
import { mapActions } from 'vuex';

const authUser = computed(()=>storeAuthUser.getters.user)

onMounted(async()=>{
    mapActions['getUser']
    await storeAuthUser.dispatch('getUser')
    var x = document.getElementById("spinner")
   setTimeout(async()=>{       
    x.style.display = 'none';
    }, 1000);
}
)
</script>

<template>
  <!-- <SpinnerLoading /> -->
  <div id="spinner">
    <div class=" w-16 h-16  border-4 border-blue-700 bg-blue-700 border-dashed rounded-full animate-ping dark:border-violet-400"></div>
  </div>
 <div v-if="!authUser">
    <Nav />
    <main class="m-10">
      <RouterView />
    </main>
  </div>
  <div v-else>
      <!-- <SpinnerLoading /> -->
      <Dashboard v-if="authUser.userType == 'director'">
        <RouterView />
      </Dashboard>
      <DashboardStudentsAndTeacher v-else>
        <RouterView />
      </DashboardStudentsAndTeacher>
  </div>
</template>

<style scoped>
#spinner {
  background-color: white;
  width: 100%;
  height: 100vh;
  z-index: 1300;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: large;
} 
</style>
