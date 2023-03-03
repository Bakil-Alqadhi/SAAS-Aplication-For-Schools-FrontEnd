<script setup>
import Nav from './components/Nav.vue'
import Dashboard from './components/Dashboard.vue';
import { storeAuthUser } from './store/storeAuthUser';
import { computed } from 'vue';

const authUser = computed(()=>storeAuthUser.getters.user)
</script>

<template>
 <div v-if="authUser">
    <Nav />
    <main class="m-10">
      <RouterView />
    </main>
  </div>
  <div v-else>
    <main class="">
      <Dashboard >
        <RouterView />
      </Dashboard>
    </main>
  </div>
</template>
