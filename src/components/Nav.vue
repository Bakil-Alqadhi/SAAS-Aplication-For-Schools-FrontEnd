<script setup>
import { onMounted, ref } from "vue";



let links= ref('')

onMounted(()=>{
   // window.location.reload()
  // storeAuthUser.dispatch('getUser')
   links.value = window.document.querySelector('.menu');
   
})
const showLinks = ()=>{
  // links.value.style.display = 'block' 
  links.value.classList.toggle('active');
  links.value.classList.toggle('menu');

}
</script>

 <template >

<div class="container">
    <div class="header">
     <div class="logo">
      <h1>Shkola</h1>
     </div>

     <div class="links">
        <div id="menu-btn" @click="showLinks" class="fas fa-bars">
        </div>
        <div class="menu">
          <router-link class="link" to="/"  >Home</router-link>
        <router-link class="link" to="/about"  >About</router-link>
        <router-link class="link" to="/schools"  >Our Schools</router-link>
        <!-- <router-link  class="link" to="/"  >Content</router-link> -->
        <router-link  class="link" to="/login" >Login</router-link>
        <button class="register">Register</button>
        <div class="choose">
          <router-link class="reg" to="/register-first-step"  >Student</router-link>
          <router-link class="reg" to="/teacher-register">Teacher</router-link>
        </div>
        </div>
      
        <!-- <router-link to="/teacher-register" class="px-4 py-2 mt-2 text-2xl font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">New Teacher</router-link>
        <RouterLink  to="/school-register" class="px-4 py-2 mt-2 text-2xl font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">Register</RouterLink>
        <RouterLink   to="/login" class="px-4 py-2 mt-2 text-2xl font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">Login</RouterLink>
        <RouterLink   to="/register-first-step" class="px-4 py-2 mt-2 text-2xl font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">New Student</RouterLink>
        <RouterLink  to="/school-register" class="px-4 py-2 mt-2 text-2xl font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">New School</RouterLink> -->

     </div>
     </div>
    <div class="content">
      <slot></slot>
      <!-- <SchoolsView /> -->
    </div>
    <!-- <div class="footer">

    </div> -->
</div>
</template>
<style scoped>
.container {
  /* background-color: blue; */
  max-width: 100%;
  max-height: 100%;
  /* min-width: 100%; */
  /* padding-top: 10rem; */
  /* min-height: 100vh; */
}
.container .header {
  min-width: 100%;
  min-height: 80px;
  background-color: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: large;
  position: relative;
}

.container .header #menu-btn {
  display: none;
  cursor: pointer;
}

.container .header #menu-btn:hover {
  color: rgb(148, 44, 200);
}

.container .header .active {
    /* display: none; */
    display: block;
    background-color: rgb(189, 189, 200);
    border-radius: 5px;
    min-width: 300px;
    min-height: 400px;
    max-width: 300px;
    max-height: 400px;
    position: absolute;
    right: 2rem;
    top: 10rem;
    display: flex;
    flex-wrap: wrap;
    color: white;
  }
.container .header .link {
  margin-right: 10px;
  padding: 1rem;
  border-radius: 5px;
}
.container .header .link:hover, .register:hover {
  background-color: white;
  border-bottom: 1px blue solid;
  color: blue;
}
.container .content {
  min-width: 100%;
  min-height: 100vh;
  padding-top: 0;
  padding-bottom: 1rem;
}
.register {
  position: relative;
}
.container .header  .choose {
  position: absolute;
  text-align: center;
   top:75%; right: 28rem;
   background-color: rgb(66, 66, 144);
   border-radius: .5rem;
   padding: .5rem;
   width: 15rem;
   color: white;
   transform-origin: top right;
   transform: scale(0);
   transition: .2s linear;
   display: flex;
   flex-direction: column;
}
.container .header  .choose:hover {
  transform: scale(1);
}

.container .header  .choose .reg {
  padding: .5rem;
  margin-bottom: 3px;
  border: 1px #eee solid;
  border-radius: 5px;
}
.container .header  .choose .reg:hover {
  background-color: rgb(36, 36, 236);

}
.container .register:hover + .choose {
  transform: scale(1);

}

@media (max-width:768px),
(max-width:1200px){ 
  .container .header {
    justify-content: space-around;
  }

  .container .header .menu {
    display: none;
  }
  
  .container .header .active .link, .register {
    margin: 10px;
    max-height: 60px;
    min-width: 90%;
    padding: 1rem;
    border-radius: 5px;
    display: block;
  }
  .container .header #menu-btn {
    display: block;
  }

  .register {
    text-align: start;
  }
  .container .header  .choose  {
    position: relative;
    text-align: center;
   top:55%; right: 0;
  }
;
  

}
</style>

<!-- component -->
<!-- <div  class="w-full text-gray-700 p-6 bg-pink-200-100 border-b-gray-300 border-b-2 border-b-solid bg-white dark-mode:text-gray-200 dark-mode:bg-gray-800">
  <div x-data="{ open: false }" class="flex flex-col max-w-screen-xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8">
    <div class="p-4 flex flex-row items-center justify-between">
      <a href="#" class="text-3xl font-semibold tracking-widest text-gray-900 uppercase rounded-lg dark-mode:text-white focus:outline-none focus:shadow-outline">Your Skola</a>
      <button class="md:hidden rounded-lg focus:outline-none focus:shadow-outline" >
        <svg fill="currentColor" viewBox="0 0 20 20" class="w-6 h-6">
          <path x-show="!open" fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z" clip-rule="evenodd"></path>
          <path x-show="open" fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
        </svg>
      </button>
    </div>
    <nav :class="{'flex': open, 'hidden': !open}" class="flex-col  text-3xl flex-grow pb-4 md:pb-0 hidden md:flex md:justify-end md:flex-row">
      <button @click="getuser">get user</button>
      <router-link to="/" class="px-4 py-2 mt-2 text-2xl font-semibold text-gray-900 bg-gray-200 rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">Home</router-link>
      <router-link to="/schools" class="px-4 py-2 mt-2 text-2xl font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">Schools</router-link>
      <router-link to="/teacher-register" class="px-4 py-2 mt-2 text-2xl font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">New Teacher</router-link>
      <a class="px-4 py-2 mt-2 text-2xl font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">Contact</a>
      <RouterLink  to="/school-register" class="px-4 py-2 mt-2 text-2xl font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">Register</RouterLink>
      <RouterLink   to="/login" class="px-4 py-2 mt-2 text-2xl font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">Login</RouterLink>
      <RouterLink   to="/register-first-step" class="px-4 py-2 mt-2 text-2xl font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">New Student</RouterLink>
      <button   class="px-4 py-2 mt-2 text-2xl font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">logout</button>
      <RouterLink  to="/school-register" class="px-4 py-2 mt-2 text-2xl font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">New School</RouterLink>
    </nav>
  </div>
</div> -->


 <!-- <div x-data="{ open: false }" class="flex flex-col max-w-screen-xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8"> -->
      <!-- <div class="p-4 flex flex-row items-center justify-between"> -->
        <!-- <a href="#" class="text-3xl font-semibold tracking-widest text-gray-900 uppercase rounded-lg dark-mode:text-white focus:outline-none focus:shadow-outline">Your Skola</a> -->
        <!-- <button class="md:hidden rounded-lg focus:outline-none focus:shadow-outline" >
          <svg fill="currentColor" viewBox="0 0 20 20" class="w-6 h-6">
            <path x-show="!open" fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z" clip-rule="evenodd"></path>
            <path x-show="open" fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
          </svg>
        </button> -->
      <!-- </div> -->
      <!-- <nav> -->
        <!-- <router-link to="/" class="px-4 py-2 mt-2 text-2xl font-semibold text-gray-900 bg-gray-200 rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">Home</router-link>
        <router-link to="/schools" class="px-4 py-2 mt-2 text-2xl font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">Schools</router-link>
        <router-link to="/teacher-register" class="px-4 py-2 mt-2 text-2xl font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">New Teacher</router-link>
        <a class="px-4 py-2 mt-2 text-2xl font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">Contact</a>
        <RouterLink  to="/school-register" class="px-4 py-2 mt-2 text-2xl font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">Register</RouterLink>
        <RouterLink   to="/login" class="px-4 py-2 mt-2 text-2xl font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">Login</RouterLink>
        <RouterLink   to="/register-first-step" class="px-4 py-2 mt-2 text-2xl font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">New Student</RouterLink>
        <RouterLink  to="/school-register" class="px-4 py-2 mt-2 text-2xl font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">New School</RouterLink>
     -->
     <!-- </nav>  -->



      <!-- <div  class="relative" x-data="{ open: false }">
        <button class="flex flex-row items-center w-full px-4 py-2 mt-2 text-2xl font-semibold text-left bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:focus:bg-gray-600 dark-mode:hover:bg-gray-600 md:w-auto md:inline md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
          {{ authUser }} <span>Dropdown</span>
          <svg fill="currentColor" viewBox="0 0 20 20" :class="{'rotate-180': open, 'rotate-0': !open}" class="inline w-4 h-4 mt-1 ml-1 transition-transform duration-200 transform md:-mt-1"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </button>
      </div>     -->
     <!-- <div x-show="open" x-transition:enter="transition ease-out duration-100" x-transition:enter-start="transform opacity-0 scale-95" x-transition:enter-end="transform opacity-100 scale-100" x-transition:leave="transition ease-in duration-75" x-transition:leave-start="transform opacity-100 scale-100" x-transition:leave-end="transform opacity-0 scale-95" class="absolute right-0 w-full mt-2 origin-top-right rounded-md shadow-lg md:w-48">
          <div class="px-2 py-2 bg-white rounded-md shadow dark-mode:bg-gray-800">
            <a class="block px-4 py-2 mt-2 text-2xl font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">Link #1</a>
            <a class="block px-4 py-2 mt-2 text-2xl font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">Link #2</a>
            <a class="block px-4 py-2 mt-2 text-2xl font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">Link #3</a>
          </div>
        </div> -->