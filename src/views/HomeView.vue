<script setup>
import axios from "axios";
import { onMounted, computed, ref } from "vue"
import { mapActions } from "vuex";
import { storeAuthUser } from "../store/storeAuthUser";

// const user = computed(() => storeAuthUser.getters.user)
// const me = ref({})
// onMounted( async()=> {
//   // storeAuthUser.dispatch('getUser')

//   //for testing
//   await axios.get('/me')
//   .then(response => {
//     me.value = response.data
//     console.log(response.data)
//   })
//   .catch( error =>console.log(error))
// })
const logout = async()=>{
  mapActions['handelLogout']
  storeAuthUser.dispatch('handleLogout');
}
</script>

<template>
<!-- <h1 v-if="user">Home hi Page ==> {{ user }}</h1>
<h1 v-else>There is no user</h1>  -->
<!-- {{ me }} -->
<button @click="logout">Logout</button>
<p>home page</p>
</template>