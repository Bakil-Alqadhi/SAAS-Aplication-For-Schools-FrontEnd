
<template>
  <div class="parent-about">
    <div class="child">
        <div class="info">
            <h1>Shkola Platform what is it?</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, consectetur. Distinctio veniam illum ex molestias exercitationem hic provident porro quis. Adipisci, nemo quis quia magni totam earum sit voluptatum consequuntur!</p>
        </div>
        <div class="image">
            <img src="../../../public/images/write.jpg" alt="">
        </div>
    </div>
    <div class="child">
        <div class="image">
            <img src="../../../public/images/gril.jpg" alt="">
        </div>
        <div class="info ml-6">
            <h1>Who can use Shkola?</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, consectetur. Distinctio veniam illum ex molestias exercitationem hic provident porro quis. Adipisci, nemo quis quia magni totam earum sit voluptatum consequuntur!</p>
        </div>
    </div>
    <div class="child">
        <div class="info pb-10">
            <h1>Who is Bakil ?</h1>
            <p>Bakil is a software engineer studying in Russia, and he developed this amazing platform from scratch to the end on his own, and adopted this platform as a graduation project for his bachelor's degree.</p>
        </div>
        <div class="image">
            <img src="../../../public/images/alqadhi-bakil (1).jpg" alt="">
        </div>
    </div>
  </div>
</template>

<style >
.parent-about {
    /* width: 100%;
    height: 100%; */
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    /* background-color: rgb(41, 41, 187); */
    padding: 0 20rem 0 20rem;

} 
.parent-about .child {
    /* padding: 0 auto; */
    /* background-color: red; */
    min-height: 30rem;
    margin-bottom:  14rem;
    padding: 2rem;
    display: flex;
    justify-content: space-between;
    /* align-items: center; */

}

.parent-about .image {
  max-width: 50%;
  max-height: 100%;
}
.parent-about .image  img {
    border-radius: 10px;
  min-width: 100%;
  min-height: 100%;
  max-width: 100%;
  max-height: 100%;
} 
.parent-about .child .info h1 {
    text-align: start;
    color: rgb(148, 44, 200);
    margin-bottom: 2rem;
    font-size: 4rem;
/* 
    min-width: 40%;
  min-height: 70%;
    max-width: 60%; */
}
.parent-about .child .info p {
    font-size: 2rem;
    text-align: start;
}

@media (max-width:768px){ 
    .parent-about {
        padding: 0;
    }
  .parent-about .child{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.parent-about .child .info h1{
  font-size: 3rem;
}
.info {
    margin-bottom: 1rem;

}
.parent-about .image {
  max-width: 70%;
  margin-bottom: 1rem;
  
}
}
</style>