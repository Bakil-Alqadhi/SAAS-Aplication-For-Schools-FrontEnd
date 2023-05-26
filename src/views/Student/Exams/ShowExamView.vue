<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { storeDataStudents } from "../../../store/storeDataStudents";

const examQuestions = computed(()=>storeDataStudents.getters.examQuestions)
const props = defineProps({
    exam:String
})
const timer = ref('')

// Set the time limit in seconds ( 1 hour = 3600 seconds)
const timeLimit = 3600;
onMounted(async()=>{ 
    console.log(props.quiz)
    await storeDataStudents.dispatch('fetchOneExam', props.exam)

    // Calculate the end time and convert the time limit from seconds to milliseconds
    const endTime = Date.now() + (timeLimit * 1000)

    const timerInterval = setInterval(() => {
        // Calculate the remaining time in seconds
        const remainingTime = Math.floor((endTime - Date.now()) / 1000);
            // Check if the time limit has been reached
        if (remainingTime <= 0) {
            clearInterval(timerInterval);
            // Perform any actions when the time limit is reached
            // e.g., submit the exam, display results, etc.
            return;
        }

        // Calculate minutes and seconds
        const minutes = Math.floor(remainingTime / 60);
        const seconds = remainingTime % 60;

        // Format the time display
        timer.value = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }, 1000); // Update every 1 second (1000 milliseconds)


})

</script>

<template>
<div class="container" v-if="examQuestions">
    <h1 class="timer">Time : {{ timer }}</h1>
    <div class="questions">
        <form action="">
            <div class="question" v-for="(question, index) in examQuestions" :key="index">
                <h1 class="title">{{ index +1 + '. '+ question.title }}</h1>
                <div class="answers" v-for="(answer, index2) in question.answers" :key="index2">
                    <input type="radio" id="answer" :value="answer">
                    <label for="answer">{{ answer }}</label>    
                </div>
            </div>
        </form>
    </div>
</div>
</template>
<style scoped>
.container {
    margin: auto;
    max-width: 60%;
    /* background-color: rgb(183, 200, 200); */
}
.container .timer {
    background-color: blue;
    color: white;
    width: 15rem;
    font-size: large;
    padding: 1rem;
    border-radius: 5px;
}

.container .questions {

    margin-top: 2rem;
}
.container .questions .question {
    background-color: #eee;
    width: 95%;
    margin: 1rem 0 ;
    padding: 2rem ;
}
.container .questions .title {
    /* background-color: red; */
    text-align: start;
    max-width: 100%;
    font-size: large;
    font-weight: bold;
}
.container .questions .question .answers {
    text-align: start;
    margin-top: 1rem;
    font-size: medium;
}

.container .questions .question .answers label {
    margin-left: 1rem;
}
input {
    cursor: pointer;
}

@media (max-width:768px){
  .title {
    line-height: 4rem;
  }
}
</style>