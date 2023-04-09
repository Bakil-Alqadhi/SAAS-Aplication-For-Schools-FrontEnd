<script setup>
import { onMounted } from "vue";

onMounted(() => {
    var x = document.getElementById("spinner")
   setTimeout(async()=>{       
    x.style.display = 'none';
    }, 1000);
})
</script>

<template>
    <!-- <div class="w-16 h-16 border-4 border-blue-700 border-dashed rounded-full animate-spin dark:border-violet-400"></div> -->
    <div id="spinner">
    <div class=" w-16 h-16  border-4 border-blue-700 bg-blue-700 border-dashed rounded-full animate-ping dark:border-violet-400"></div>
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