<script setup>
import Nav from './components/Nav.vue'
import Dashboard from './components/Dashboard.vue';
import { storeAuthUser } from './store/storeAuthUser';
import { computed, onMounted, ref } from 'vue';

// const authUser = ref('')
// onMounted(()=>{
//   authUser.value = computed(()=>storeAuthUser.getters.user)
// })

const authUser = computed(()=>storeAuthUser.getters.user)
const school_id = ref('')
const guard = ref('')
onMounted(()=>{
  school_id.value = computed(()=>storeAuthUser.getters.school_id)
  guard.value = computed(()=>storeAuthUser.getters.guard)
  storeAuthUser.dispatch('getUser', guard.value,  school_id.value)
  // authUser.value = computed(()=>storeAuthUser.getters.user)

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
