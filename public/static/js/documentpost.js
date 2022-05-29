// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot, serverTimestamp, doc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-storage.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2D8pmuo_y8DVuh9hqNFmA8kZGsfuQiE4",
  authDomain: "outta-sexy-web.firebaseapp.com",
  projectId: "outta-sexy-web",
  storageBucket: "outta-sexy-web.appspot.com",
  messagingSenderId: "442716455224",
  appId: "1:442716455224:web:42483957a4f0d1f2e601cd",
  measurementId: "G-7NV2JY54JT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

$(document).on('mouseenter', '.onetex' ,function(e) {
    $('.one, .oneone, .oneonetwo, .onetwo').css('display', 'block');
    $('.two, .twoone, .twotwo, .twothree').css('display', 'none');
    $('.thi, .thione').css('display', 'none');
})

$(document).on('mouseenter', '.twotex' ,function(e) {
    $('.one, .oneone, .oneonetwo, .onetwo').css('display', 'none');
    $('.two, .twoone, .twotwo, .twothree').css('display', 'block');
    $('.thi, .thione').css('display', 'none');
})

$(document).on('mouseenter', '.thitex' ,function(e) {
    $('.one, .oneone, .oneonetwo, .onetwo').css('display', 'none');
    $('.two, .twoone, .twotwo, .twothree').css('display', 'none');
    $('.thi, .thione').css('display', 'block');
})

function WeightChange(a){
    $(document).ready(function(){ 
        $(a).hover(function(){  
            $(a).css('font-weight', '700');
        }, function(){  
            $(a).css('font-weight', '500');
        })}) 
    }
  
  WeightChange('.oneone');
  WeightChange('.oneonetwo');
  WeightChange('.onetwo');
  WeightChange('.twoone');
  WeightChange('.twotwo');
  WeightChange('.twothree');
  WeightChange('.thione');

  const db = getFirestore();
  const colRef = collection(db, 'datasets');
  var postid = localStorage.getItem("postid1");

  onSnapshot(colRef, (snapshot) => {
    snapshot.docs.forEach((doc) => {
      console.log(doc.id);
      console.log(postid);
      if(doc.id===postid){
        console.log("filling data");
        document.getElementById('title').value = doc.data().제목;
        document.getElementById('body').value = doc.data().내용;
        document.getElementById('filelink').text = doc.data().파일명;
        document.getElementById('filelink').href = doc.data().파일;
      }
    });
  });

  const delbutton = document.getElementById("delete")

  if(postid==null){
    delbutton.disabled = true;
  }
  else{
    delbutton.disabled = false;
  }

  var files = [];

  var fileInput = document.getElementById('file');

  fileInput.onchange = e => {
    files = e.target.files;
    console.log(files);
  };

  const savebtn = document.getElementById("save");

  savebtn.addEventListener('click',(e) => {
    var title = document.getElementById('title').value;
    var body = document.getElementById('body').value;
    var filename = document.getElementById('filelink').text;
    var filelink = document.getElementById('filelink').href;
    
    if(files.length==0){
      if(postid==null)  {
        alert("No file selected");
        return
      }
    }
    if(title==""){
        alert("Input Title");
        return
    }
    if(body==""){
        alert("Input Body");
        return
    }
    console.log(files.length);
    if(files.length==0){
      console.log("HERE1")
      updateDoc(doc(db, "datasets", postid), {
        제목: title,
        내용: body
      }).then(function() {
        setTimeout(function() {
          alert("Document successfully updated!");
          location.href = "document.html";
          }, 50);
      })
      .catch(function(error) {
          console.error("Error writing document: ", error);
      });
    }
    else{
      console.log("HERE2")
      const storage = getStorage();

      const storageRef = ref(storage, "datasets/"+files[0].name);

      console.log(title);
      console.log(body);
      console.log(files[0]);

      // uploadBytes(storageRef, files[0]).then((snapshot) => {
      //   console.log('Uploaded a blob or file!');
      // });
      const uploadTask = uploadBytesResumable(storageRef, files[0]);

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on('state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      }, 
      (error) => {
        console.log(error)
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;

          // ...

          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      }, 
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          if(postid==null){
            addDoc(colRef, {
                제목: title,
                내용: body,
                파일명: files[0].name,
                파일: downloadURL,
                작성일: serverTimestamp()
            }).then(function() {
              setTimeout(function() {
                alert("Document successfully written!");
                location.href = "document.html";
                }, 50);
            })
            .catch(function(error) {
                console.error("Error writing document: ", error);
            });
          }
          else{
            updateDoc(doc(db, "datasets", postid), {
              제목: title,
              내용: body,
              파일명: files[0].name,
              파일: downloadURL
            }).then(function() {
              setTimeout(function() {
                alert("Document successfully updated!");
                location.href = "document.html";
                }, 50);
            })
            .catch(function(error) {
                console.error("Error writing document: ", error);
            });
          }
        });
      }
      );
    };
});

$(document).on("click","#delete",async function(){
  await deleteDoc(doc(db, "datasets", postid));
  alert("Deleted");

  location.href="document.html";
});

$(document).on("click","#cancel",async function(){
  location.href="document.html";
});
