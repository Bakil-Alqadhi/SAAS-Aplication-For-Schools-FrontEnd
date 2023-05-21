<script setup>
import { computed, onMounted, ref } from "vue";
import SchoolsView from '../views/SchoolsView.vue'
import TeacherSidebarLinks from '../components/teacher/TeacherSidebarLinks.vue' 
import StudentSidebarLinks from '../components/student/StudentSidebarLinks.vue'
import { storeAuthUser } from '../store/storeAuthUser'
import { mapActions } from "vuex";
// import router from "../router";
import { useRouter } from "vue-router";
import AlerMessage from "./AlerMessage.vue";

let profile = ref('')
let sideBar= ref('')
let body= ref('')

const router = useRouter()

const authUser = computed(() => storeAuthUser.getters.user);

onMounted(()=>{
   // window.location.reload()
  // storeAuthUser.dispatch('getUser')
   profile.value = window.document.querySelector('.header .flex .profile');
   sideBar.value = window.document.querySelector('.side-bar');
   body.value = window.document.querySelector('.body');
})
const handleUser = () =>{
   profile.value.classList.toggle('active');
}

const handleSideBar = () =>{
   sideBar.value.classList.toggle('active');
   body.value.classList.toggle('active');
}

window.onscroll = () =>{
   profile.value.classList.remove('active');
   if(window.innerWidth < 1200 ){
      // sideBar.value.classList.remove('active');
      body.value.classList.remove('active');
   }

}

const school_name = localStorage.getItem('school_name');

const logout = async()=>{
    mapActions['handelLogout']
    storeAuthUser.dispatch('handleLogout');
}

const showEdit = (id)=> {
   if(authUser.value.userType == 'teacher'){
      router.push({ name: 'EditTeacher', params:{ id: id}})
   } else if(authUser.value.userType == 'student'){
      router.push({ name: 'EditStudent', params:{ id: id}})
   }
   profile.value.classList.remove('active');
}
</script>


<template>
<body class="body" v-if="authUser">
  <header class="header">
   <AlerMessage />
      <section class="flex">

        <a href="home.html" class="logo">{{ school_name }}</a>

        <form action="search.html" method="post" class="search-form">
          <input type="text" name="search_box" required placeholder="search courses..." maxlength="100">
          <button type="submit" class="fas fa-search"></button>
        </form>

        <div class="icons">
          <div id="menu-btn" @click="handleSideBar" class="fas fa-bars"></div>
          <div id="user-btn" @click="handleUser" class="fas fa-user"></div>
        </div>
        <div class="profile">
            <img :src=authUser.image class="image" alt="">
            <h3 v-if="authUser.userType === 'teacher'" class="name">T.{{ authUser.last_name +' ' +  authUser.first_name }}</h3>
            <h3 v-if="authUser.userType === 'student'" class="name">Dear. {{ authUser.student_last_name + ' '+ authUser.student_first_name }}</h3>
            <p class="role">{{ authUser.userType }}</p>
            <button @click="showEdit(authUser.id)" class="btn">view profile</button>
            <!-- <router-link :to="{name: 'EditTeacher', params:{ id: authUser.id}}" v-if="authUser.userType === 'teacher'"  class="btn">view profile</router-link> -->
            <a @click="logout" class="option-btn">logout</a>
         </div>
      </section>
</header>


<div class="side-bar">

   <div @click="handleSideBar" id="close-btn">
      <i class="fas fa-times"></i>
   </div>

   <div class="profile">
      <img :src="authUser.image" class="image" alt="">
      <h3 v-if="authUser.userType === 'teacher'" class="name">T.{{ authUser.last_name +' ' +  authUser.first_name }}</h3>
      <h3 v-if="authUser.userType === 'student'" class="name">Dear. {{ authUser.student_last_name + ' '+ authUser.student_first_name }}</h3>
      <p class="role">{{ authUser.userType }}</p>
      <!-- <a href="profile.html" class="btn">view profile</a> -->
   </div>

   <nav class="navbar">
      <TeacherSidebarLinks v-if="authUser.userType == 'teacher'"/>
      <!-- <StudentSidebarLinks v-else-if="authUser.userType == 'student'"/> -->
      <!-- <a href="home.html"><i class="fas fa-home"></i><span>home</span></a>
      <a href="about.html"><i class="fas fa-question"></i><span>about</span></a>
      <a href="courses.html"><i class="fas fa-graduation-cap"></i><span>courses</span></a>
      <a href="teachers.html"><i class="fas fa-chalkboard-user"></i><span>teachers</span></a>
      <a href="contact.html"><i class="fas fa-headset"></i><span>contact us</span></a> -->
   </nav>
</div>

<div class="content">
   <slot></slot>
</div>


<!-- <footer class="footer">
  <div>
      &copy; copyright @ 2023 by <span>mr. Al-Qadhi B.</span>
  </div>
</footer> -->

</body>

</template>

<style >
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@200;300;400;500;600;700&display=swap');

/* :root{
   --main-color:#8e44ad;
   --red:#e74c3c;
   --orange:#f39c12;
   --light-color:#888;
   --light-bg:#eee;
   --black:#2c3e50;
   --white:#fff;
   --border:.1rem solid rgba(0,0,0,.2);
   background-color: black;
} */

*{
   font-family: 'Nunito', sans-serif;
   margin:0; padding:0;
   box-sizing: border-box;
   outline: none; border:none;
   text-decoration: none;
}

html{
   font-size: 62.5%;
   overflow-x: hidden;
   /* background-color: blue; */
}

.body{
   background-color: #eee;
   padding-left: 25rem;
   transition: .2s linear;

}

body .active {
   padding-left: 0;
}

section{
   padding:2rem;
   margin: 0 auto;
   max-width: 1200px;
}

.inline-btn,
.inline-option-btn,
.inline-delete-btn,
.btn,
.delete-btn,
.option-btn{
   border-radius: .5rem;
   color:#fff;
   font-size: 1.8rem;
   cursor: pointer;
   text-transform: capitalize;
   padding:1rem 3rem;
   text-align: center;
   margin-top: 1rem;
}

.btn,
.delete-btn,
.option-btn{
   display: block;
   width: 100%;
}

.inline-btn,
.inline-option-btn,
.inline-delete-btn{
   display: inline-block;
}

.btn,
.inline-btn{
   /* background-color: #8e44ad; */
   background-color: #4450ad;
}

.option-btn,
.inline-option-btn{
   background-color:#e74c3c;
}

.delete-btn,
.inline-delete-btn{
   background-color: #e74c3c;
}

.inline-btn:hover,
.inline-option-btn:hover,
.inline-delete-btn:hover,
.btn:hover,
.delete-btn:hover,
.option-btn:hover{
   background-color: black;
   color:#fff;
}

.flex-btn{
   display: flex;
   gap: 1rem;
}
.header{
   position: sticky;
   top:0; left:0; right: 0;
   background-color: white;
   z-index: 1000;
   border-bottom: .1rem solid rgba(0,0,0,.1);
}


.header .flex{
   display: flex;
   align-items: center;
   justify-content: space-between;
   position: relative;
   padding: 1.5rem 2rem;
}

.header .flex .logo{
   font-size:2.5rem;
   color: black;
}

.header .flex .search-form{
   width: 50rem;
   border-radius: .5rem;
   background-color: #eee;
   padding: .5rem 2rem;
   display: none;
   gap:2rem;

}

.header .flex .search-form input{
   width: 100%;
   font-size: 1rem;
   color:black;
   background:none;
}

.header .flex .search-form button{
   background:none;
   font-size: 1rem;
   cursor: pointer;
   color:black;
}

.header .flex .search-form button:hover{
   color: #8e44ad;
}

.header .flex .icons div{
   font-size: 1.5rem;
   color: black;
   background-color: #eee;
   border-radius: .5rem;
   height: 3.5rem;
   width: 3.5rem;
   line-height: 3.5rem;
   cursor: pointer;
   text-align: center;
   margin-left: .7rem;
}

.header .flex .icons div:hover{
   background-color: black;
   color:white;
}

.header .flex .profile{
   position: absolute;
   text-align: center;
   top:120%; right: 2rem;
   background-color: #eee;
   border-radius: .5rem;
   padding: 2rem;
   width: 30rem;
   transform-origin: top right;
   transform: scale(0);
   transition: .2s linear;


}

.header .flex .profile .image{
   height: 10rem;
   width: 10rem;
   border-radius: 50%;
   margin: auto;
   /* object-fit: contain; */
   margin-bottom: .5rem;
}

.header .flex .profile .name {
  font-size: 2rem;
   color:black;
   overflow: hidden;
   text-overflow: ellipsis;
   white-space: nowrap;
}
.header .flex .profile span {
  color: #eee;
  font-size: 1.6rem;
}


.header .flex .profile.active{
   transform: scale(1);
}

/* Start Sidebar css  */


.content {
   background-color: white;
   /* color: #eee; */
   /* width: 100px; */
   height: 100vh;
   text-align: center;
   padding-top: 20px;
   /* margin-top: 40px; */
   object-fit: contain;
   z-index: 1500;
}
.side-bar{
   position: fixed;
   top: 0; left: 0;
   width: 25rem;
   background-color: white;
   height: 100vh;
   border-right: .1rem solid rgba(0,0,0,.2);
   z-index: 1200;
   overflow: auto;
   transition: .2s linear;
}

.side-bar #close-btn{
   text-align: right;
   padding: 2rem 1rem 0 0;
   /* display: none; */
}

.side-bar #close-btn i{
   text-align: right;
   font-size: 2.5rem;
   background:red;
   border-radius: .5rem;
   color:white;
   cursor: pointer;
   height: 3.5rem;
   width: 3.5rem;
   line-height: 3.5rem;
   text-align: center;
}

.side-bar #close-btn i:hover{
   background: black;
}

.side-bar .profile{
   padding:1.5rem 2rem;
   text-align: center;
   margin-bottom: 1rem;
   border-bottom: .1rem solid rgba(0,0,0,.2);

}

.side-bar .profile .image{
   height: 10rem;
   width: 10rem;
   border-radius: 50%;
   margin: auto;
   /* object-fit: contain; */
   margin-bottom: .5rem;
}

.side-bar .profile .name{
   font-size: 2rem;
   color: black;
   overflow: hidden;
   text-overflow: ellipsis;
   white-space: nowrap;
}

.side-bar .profile .role{
   font-size: 1.6rem;
   color: #888;
}


.side-bar .navbar {
   padding: 0 1rem;
}

.side-bar .navbar a{
   display: block;
   padding: 2rem;
   font-size: 1.8rem;
   border-radius: 10px;
}

.side-bar .navbar a i{
   margin-right: 1.5rem;
   /* color:#8e44ad; */
   color:#4450ad;
   transition: .2s linear;
}

.side-bar .navbar a span{
   color:#888;
}

.side-bar .navbar a:hover{
   background-color: #eee;
}

.side-bar .navbar a:hover i{
   margin-right: 1.8rem;
}

.side-bar.active{
   left: -30rem;
}
/* End Sidebar css */

.footer {
   position: fixed;
   background-color: white;
   bottom: 0; right: 0; left: 0;
   border-top: .1rem solid rgba(0,0,0,.2);
   padding: 2rem;
   font-size: 1.5rem;
   text-align: center;
   color: black;
   margin-top: 2rem;
   z-index: 1000;
}

/* media queries */
@media (max-width:991px){

   .body {
      padding-left: 0;
   }

   .side-bar {
      transition: .2s linear;
      left: -30rem;
   }
   .side-bar.active {
      left: 0;
      box-shadow: 0 0 0 100vw rgba(0,0,0,.7);
   } 
   .side-bar #close-btn {
      margin-left: 1rem;
      display: inline-block;
   }

}


@media (max-width:991px){

html{
   font-size: 55%;
}

}

@media (max-width:768px){
.header .flex .profile{
   top:120%; right: 2rem;
   padding: 2rem;
   width: 20rem;
}

.side-bar.active {
   width: 20rem;
}
}
</style>