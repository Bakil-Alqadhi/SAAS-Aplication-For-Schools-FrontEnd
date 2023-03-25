<script setup>
import Nav from './components/Nav.vue'
import Dashboard from './components/Dashboard.vue';
import { storeAuthUser } from './store/storeAuthUser';
import { computed, onMounted, ref } from 'vue';

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
      <Dashboard >
        <RouterView />
      </Dashboard>
  </div>
</template>
