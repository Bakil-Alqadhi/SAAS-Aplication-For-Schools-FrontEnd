<script setup>

</script>

<template>
 
<div class="container">
    <div class="parent">
        <h1>Create New Section</h1>
        <form action="">
            <div class="grades">
                <div>
                    <label for="section_name">Section's Name:</label>
                    <input type="text" id="section_name" placeholder="section's name">
                </div>
                <div>
                <label for="grade">Section's Name:</label>
                <select name="" id="grade">
                    <option value="">v-once</option>
                    <option value="">v-once</option>
                    <option value="">v-once</option>
                    <option value="">v-once</option>
                </select>   
                </div>
            </div>
            <button type="submit">Submit</button>
        </form>
    </div>
</div>
</template>

<style scoped>
body {
  background-color: red;
  font-family: "Raleway", sans-serif;
  color: ivory;
  font-size: 20px;
  transition: .2s linear;
}

.container {
background-color: red;
  max-width: 100%;
  height: 100vh;
  margin: auto;
  color: #36454F;
  display: flex;
  justify-content: center;
}

.container .parent {
    background-color: rgb(154, 154, 164);
    width: 40%;
    height: 40%;
    padding: 10px;
    margin-top: 10px;
    border-radius: 10px;
    /* display: flex;
    align-items: center;
    justify-content: center; */
}

.container .parent h1 {
    width: 100%;
    text-align: center;
    margin: 10px;
    font-weight: bold;
    font-size: 15px;
    color: white;

}
.container .parent form {
    width: 100%;
    /* background-color: aqua; */
    /* display: flex;
    align-items: center; */
    /* justify-content: center; */
}
.container .parent form label {
    width: 100%;
    padding: 4px;
    background-color: rgb(113, 113, 186);
    color: white;
    border: 1px solid blue;
    border-radius: 5px;
    display: block;
    margin-bottom: 4px;
    font-weight: bold;
}

.container .parent form input {
    width: 100%;
    padding: 4px;
    background-color: #eee;
    /* color: white; */
    border: 1px solid blue;
    border-radius: 5px;
    display: block;
    margin-bottom: 4px;
}
.container .parent form select {
    width: 100%;
    padding: 4px;
    background-color: rgba(119, 127, 129, 0.174);
    color: white;
    border: 1px solid blue;
    border-radius: 5px;
    display: block;
    margin-bottom: 4px;
    font-weight: bold;
}

.container .parent form select option {
    background-color: #ccc;
    color: black;
    padding: 3px;
    margin: 3px;
}
.container .parent form  .grades{
    margin-bottom: 5px;
}
</style>