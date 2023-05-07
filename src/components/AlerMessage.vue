<script setup>
import {storeDataSchools} from '@/store/storeDataSchools'
import { storeDataTeachers } from '../store/storeDataTeachers';
import { storeDataStudents } from '../store/storeDataStudents';
import { computed, ref, watch } from 'vue'
const message1 = computed(()=> storeDataSchools.getters.message)
const message2 = computed(()=> storeDataTeachers.getters.message)
const message3 = computed(()=> storeDataStudents.getters.message)
const message = ref('')

const deleteMessage1 = computed(()=> storeDataSchools.getters.deleteMessage)
const deleteMessage2 = computed(()=> storeDataTeachers.getters.deleteMessage)
const deleteMessage3 = computed(()=> storeDataStudents.getters.deleteMessage)
const deleteMessage = ref('')

watch(message1, newValue => {
    message.value = newValue
})

watch(message2, newValue => {
    message.value = newValue
})

watch(message3, newValue => {
    message.value = newValue
})

watch(deleteMessage1, newValue => {
    deleteMessage.value = newValue
})

watch(deleteMessage2, newValue => {
    deleteMessage.value = newValue
})

watch(deleteMessage3, newValue => {
    deleteMessage.value = newValue
})

</script>

<template>
  <div class="alert-message" v-if="message">
        <div class="message success">
            <i class="fa-regular fa-circle-check"></i>
            <p>{{ message }}</p>
        </div>
        <!-- <div class="message">
            <i class="fa-regular fa-circle-check"></i>
            <p>Data Updated Successfully</p>
        </div>
        <div class="message">
            <i class="fa-regular fa-circle-check"></i>
            <p>Data Updated Successfully</p>
        </div>
        <div class="message">
            <i class="fa-regular fa-circle-check"></i>
            <p>Data Updated Successfully</p>
        </div> -->
    </div>
    <div class="alert-message" v-if="deleteMessage" >
        <div class="delete-message success">
            <i class="fa-solid fa-triangle-exclamation"></i>
            <p class="pt-2">{{ deleteMessage }}</p>
        </div>
    </div>
</template>


<style scoped>
.alert-message {
    position: absolute;
    width: 330px;
    height: 90px;
    background-color: red;
    right: 20px; top: 10px;
    z-index: 20;
    text-align: center;
}
.alert-message .message, .delete-message {
    width: 100%;
    height: 100%;
    font-size: large;
    padding:30px 10px;
    display: flex;
    justify-content: space-around;
    color: white;
}
.message {
    background-color: rgb(57, 199, 57);
}
.delete-message {
    background-color: rgb(198, 47, 21);
}
.alert-message  i {
    color: rgb(248, 244, 244);
    /* width: 20px;
    height: 20px; */
    font-size: 40px;
}
.alert-message  p {
    margin-top: 5px;
}
</style>