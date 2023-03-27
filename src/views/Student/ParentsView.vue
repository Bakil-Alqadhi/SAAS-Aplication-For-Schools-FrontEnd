<script setup>
// import { fb,db } from "../../firebase-config";
import { storage } from '../../firebase'
import { ref, uploadBytes, getDownloadURL} from "firebase/storage"

// import { fb } from "../../firebase";
// import { ref } from "vue";

// const file = '';
const upload = (e)=>{
   const  file = e.target.files[0];
    console.log(e.target.files[0].name)
    const storageRef = ref( storage,'Students/'+ file.name);
    uploadBytes(storageRef, file ).then(
        (snapshot ) => {
            console.log(snapshot);
        // Get the download URL of the uploaded file
        getDownloadURL(snapshot.ref).then((url) => {
      console.log('File download URL:', url);
      // Use the URL to display the image or store it in your database
    });
  }).catch((error) => {
    console.log(error);
  });

    //storageRef.put(file);
}
</script>
<template>
<input type="file" @change="upload" >
<!-- <img :src="file" alt=""> -->
</template>