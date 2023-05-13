<script setup>
import { computed, onMounted, ref } from "vue";
import { storeDataSchools } from "../../../store/storeDataSchools";


const errors = computed(()=> storeDataSchools.getters.errors)
const questions = ref([{
    title: '',
    answers: '',
    right_answer: '',
    score: ''
    } 
])

const form = ref({
    title: '',
    answers: '',
    right_answer: '',
    score: ''

})

const removeQuestion = (index) =>{
    questions.value.splice(index, 1);
}
const addQuestion = ()=>{
    questions.value.push({
        title: '',
        answers: '',
        right_answer: '',
        score: ''
    })
}

const store = ()=>{
   
    // console.log('=============')
    //     console.log(form.value)
    //     console.log('=============') 
    storeDataSchools.dispatch('handleCreateQuiz', form.value)
}
</script>

<template>
<div class="container"> 
    <form class="main-form" @submit.prevent="store">
        <!-- <h1>Create New Quiz</h1> -->
        <div class="main" v-for="(question, index) in questions" :key="index">
            <div class="parent" >
            <label for="title">Question's Name:</label>
            <input class="field" v-model="question.title" type="text" id="title"  placeholder="Question" />
            <span v-if="errors.title">{{ errors.title[0] }}</span>
        </div>
        <div class="parent" >
            <label for="answers">Question's Answers:</label>
            <textarea v-model="question.answers" name="answers" id=""  placeholder="Answers"></textarea>
            <span v-if="errors.answers">{{ errors.answers[0] }}</span>
        </div>
        <div class="parent" >
            <label for="right_answer">The Right Answer:</label>
            <input class="field" v-model="question.right_answer" type="text" id="right_answer"  placeholder="Right Answer" />
            <span v-if="errors.title">{{ errors.title[0] }}</span>
        </div>
        <div class="parent" >
            <label for="score">The Marks:</label>
            <input class="field" v-model="question.score" type="number" min="1" id="score"  placeholder="Score" />
            <span v-if="errors.title">{{ errors.title[0] }}</span>
        </div>
        <div class="parent">
            <button type="button" @click="removeQuestion(index)" class="text-white bg-red-400 hover:bg-red-600" >Remove Question</button>

        </div>
        </div>
        <div class="buttons mt-10 flex justify-around">
            <button type="button" @click="addQuestion" class="add" >Add Question</button>
            <button type="submit" class="create">Save</button>
        </div>

    </form>
</div>
</template>

<style scoped>
.container {
    /* background-color: rgba(230, 213, 213, 0.575); */
    min-width: 90%;
    height: 100vh;
    margin: 0 auto;
    /* position: fixed; */
    padding: 0 0 30px;
    /* z-index: 1400; */
    left: 0; top: 0; right: 0; bottom: 0;
    display: flex;
    align-items: start;
    justify-content: center;

}
.container form{
    padding: 10px;
    /* padding-top: 40px; */
    min-width: 90%;
    height: auto;
    border-radius: 10px;
    position: relative;
    /* overflow: visible; */
    /* visibility: hidden; */
    border: 1px solid rgb(160, 160, 162);
}

.container form .main {
    /* background-color:green ; */
    border: 1px solid rgb(182, 182, 194);
    padding: 1rem;
    border-radius: 5px;
    margin-bottom: 1rem;
}
.container form textarea {
    width: 100%;
    min-height: 10rem;
}
.container form span {
    color: red;
    /* top: ; */
    text-align: start;
    margin-bottom: 10px;
    font-size: 13px;
}
.container form p {
    position: absolute;
    background-color: rgb(210, 53, 18);
    color: white;
    font-size: large;
    font-weight: bold;
    width: 30px;
    top: 5px;
    /* left: 5px; */
    margin-bottom: 3px;
    text-align: center;
    border-radius: 3px;
    cursor: pointer;
}

.container form p:hover {
  background-color: red;
}
.container form h1 {
    width: 100%;
    /* background-color: blue ; */
    border: 1px solid blue;
    padding: 4px;
    color: blue ;
    border-radius: 5px;
    text-align: center;
    margin: 30px 0 20px;
    font-size: large;
    font-weight: bold;
}
.container form label {
    background-color: rgb(221, 221, 232);
    color: blue ;
    border: 1px solid blue;
    width: 100%;
    /* color: white; */
    text-align: start;
    padding: 4px 7px;
    font-size: medium;
    border-radius: 5px;
    /* margin-top: 20px; */
    /* margin-bottom: 20px; */
}
.container form .field, textarea {
    background-color: white;
    border: 2px solid rgb(76, 76, 217);
    /* color: white; */
    width: 100%;
    text-align: start;
    padding: 4px 7px;
    font-size: medium;
    border-radius: 5px;
    margin-top: 10px;
    /* margin-bottom: 10px; */
}


.container form  button {
    padding: .5rem 2rem;
    font-size: large;
    color: white;
    text-align: center;
    border-radius: 5px;
}
.container form   .add {
    background-color: rgb(76, 76, 217);

}
.container form  .create {
    background-color: rgb(31, 171, 31);

}
.container form  .add:hover {
    background-color: blue;
}
.container form  .create:hover {
    background-color: rgb(51, 226, 51);
}
.parent {
    margin-bottom: 10px;
    text-align: start;
}
@media (max-width:768px){ 
    .container form {
        width: 300px;
    }
}
</style>