<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { storeDataStudents } from "../../../store/storeDataStudents";
import { useRouter } from "vue-router";

const examQuestions = computed(()=>storeDataStudents.getters.examQuestions)
const router = useRouter()
const props = defineProps({
    exam:String
})
const timer = ref('')
const answers = ref([])
const chosenAnswers = ref([])

// Set the time limit in seconds ( 1 hour = 3600 seconds)
const timeLimit = 3600;
onMounted(async()=>{ 
    // console.log(props.quiz)
    await storeDataStudents.dispatch('fetchOneExam', props.exam)

    if(examQuestions.value.length){
        // Calculate the end time and convert the time limit from seconds to milliseconds
        // const endTime = Date.now() + (timeLimit * 1000)
        let endTime = localStorage.getItem('endTime');
        let remainingTime = localStorage.getItem('remainingTime');

        if (!endTime || !remainingTime) {
            endTime = Date.now() + (timeLimit * 1000);
            remainingTime = timeLimit;
            localStorage.setItem('endTime', endTime);
            localStorage.setItem('remainingTime', remainingTime);
        } else {
            endTime = parseInt(endTime);
            remainingTime = parseInt(remainingTime);
        }

        const timerInterval = setInterval(() => {
            remainingTime --;
                // Check if the time limit has been reached
            if (remainingTime <= 0) {
                clearInterval(timerInterval);
                // Perform any actions when the time limit is reached
                // e.g., submit the exam, display results, etc.
                // return;
                    // alert('Time of Exam is finished )')
                    localStorage.removeItem('endTime');
                    localStorage.removeItem('remainingTime')
                    storeDataStudents.dispatch('handleStoreAnswers', {
                        'answers': answers.value,
                        'quiz_id': props.exam
                    })
            }

            // Calculate minutes and seconds
            const minutes = Math.floor(remainingTime / 60);
            const seconds = remainingTime % 60;

            // Format the time display
            timer.value = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

            // Update the remaining time in local storage
            localStorage.setItem('remainingTime', remainingTime);

        }, 1000); // Update every 1 second (1000 milliseconds)

        //pushing all the questions and the answers to the array 
        examQuestions.value.forEach(element => {
            answers.value.push({ 
                'question_id': element.id,
                'score': element.score,
                'right_answer': element.right_answer,
                'answer': ''
            })
        });
    }
})

function addAnswer( answer, index){
    answers.value[index]['answer'] = answer;
}

const storeAnswers = ()=>{
    storeDataStudents.dispatch('handleStoreAnswers', {
        'answers': answers.value,
        'quiz_id': props.exam
    })
    localStorage.removeItem('endTime');
    localStorage.removeItem('remainingTime')
}
</script>

<template>
<div class="container" v-if="examQuestions.length">
    <div class="parent">
        <h1 class="timer">Time : {{ timer }}</h1>
    <div class="questions">
        <form @submit.prevent="storeAnswers">
            <div class="question" v-for="(question, index) in examQuestions" :key="index">
                <h1 class="title">{{ index +1 + '. '+ question.title }}</h1>
                <div class="answers" v-for="(answer, index2) in question.answers" :key="index2">
                    <input type="radio" id="answer"  @click="addAnswer(answer, index)" v-model="chosenAnswers[index]" :value="answer">
                    <label for="answer">{{ answer }}</label>    
                </div>
            </div>
            <div class="btns">
                <!-- <button class="close">Close</button> -->
                <button type="submit" class="send">Send</button>
            </div>
        </form>
    </div>
    </div>
</div>
</template>
<style scoped>
.container {
    /* position: absolute; */
    top: 0; left: 0; bottom: 0;
    position: fixed;
    max-width: 100%;
    height: 100vh;
    z-index: 1500;
    padding-top: 2rem;

    /* background-color: rgb(183, 200, 200); */
    backdrop-filter: blur(1rem);
}
.container .parent{
    padding-top: 2rem;
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

.btns {
    margin:auto  2rem;
    display: flex;
    justify-content: space-between;
    max-width: 90%;  
}
.btns button {
    border-radius: 5px;
    padding: .5rem;
    font-size: medium;
    color: white;
    min-width: 7rem;

}
.btns .close {
    background-color: crimson;
}

.btns .close:hover {
    background-color: red;
}
.btns .send {
    background-color: forestgreen;
}

.btns .send:hover {
    background-color: green;
}
@media (max-width:768px){
  .title {
    line-height: 4rem;
  }
}
</style>