<script setup>
import SchoolsView from '../SchoolsView.vue';
import AboutView from './AboutView.vue';
</script>

<template>
  <div class="parent">
    <!-- <SchoolsView /> -->
    <div class="home">
      <div class="text">
        <div class="about">
          <h1>Shkola Platform For Schools</h1>
          <p>Create your own school and manage it just from your home, with Shkola platform everything is ready and free</p>
        </div>
        <div class="btn">
          <button class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
          <span class="relative px-5 bg-orange-500 text-white py-2.5 transition-all ease-in duration-75  dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              <router-link to="/school-register">
                  Join for free
              </router-link>        
          </span>
        </button>
        </div>
      </div>
      <div class="image">
        <img src="../../../public/images/studying-online.jpg" alt="">
      </div>
    </div>
    <!-- schools section -->
    <div class="schools">
      <div class="part">
        <h1>Some of Our schools</h1>
      </div>
      <div class="data">
        <SchoolsView />
        <SchoolsView />
      </div>
      <div class="section-about">
        <div class="part">
        <h1>About Us</h1>
      </div>
        <AboutView />
      </div>

      <!-- <div class="section-contact">
        <div class="part mb-10">
        <h1>Contact Us</h1>
      </div>
        <AboutView />
      </div> -->
    </div>
  </div>
</template>

<style scoped>
.parent {
  /* background-image: url('/public/images/school.png'); */
  min-width: 100%;
  min-height: 100vh;
  /* background-repeat: no-repeat;
  background-size: cover; */
}

.parent .home {
  padding: 0 20rem 0 20rem;
  min-width: 100%;
  height: 575px;
  /* background-color: red; */
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.parent .home .image {
  max-width: 60%;
  max-height: 100%;
  background-color: red;

  /* min-width: 500px;
  min-height: 400px; */
}
.parent .home .image  img {
  max-width: 100%;
  max-height: 100%;
} 
.parent .home .text {
  /* background-color:blue ; */
  /* background-image: url('../../../public/images/colorful-school-tools.jpg'); */
  min-width: 40%;
  min-height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.parent .home .text h1 {
  font-size: 5rem;
  font-family: "Josefin Sans",sans-serif;
  color: rgb(148, 44, 200);
}
.parent .home .text .about p {
  text-align: start;
  margin-top: 20px;
  font-size: 1.6rem;
  font-family: "Josefin Sans",sans-serif;
  color: rgb(148, 44, 200);
}
.parent .home .text .btn {
  font-size: 2rem;
  text-align: center;
  background-color: transparent;
  /* min-width: 100%;
  min-height: 100%; */
}
.parent .home .text  button{

  font-size: 2rem;
  width: 200px;
  height: 40px;

}
.parent .home .text  button span{
  text-align: center;
  width: 100%;
  height: 100%;
  padding-top: 1rem;

}

.parent .schools .part {
  color: rgb(148, 44, 200);
  font-size: 8rem;
}


@media (max-width:768px){ 
  .parent .home{
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
}

.parent .schools .part h1{
  font-size: 4rem;
}
.parent .home .image  img {
  display: none;

} 
}
</style>