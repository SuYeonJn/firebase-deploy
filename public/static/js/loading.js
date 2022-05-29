import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import {
  getDatabase,
  ref,
  child,
  get,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyD2D8pmuo_y8DVuh9hqNFmA8kZGsfuQiE4",
    authDomain: "outta-sexy-web.firebaseapp.com",
    projectId: "outta-sexy-web",
    storageBucket: "outta-sexy-web.appspot.com",
    messagingSenderId: "442716455224",
    appId: "1:442716455224:web:42483957a4f0d1f2e601cd",
    measurementId: "G-7NV2JY54JT"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const dbRef = ref(getDatabase(app));

onAuthStateChanged(auth, (user) => {
  if(user==null){
    alert("You are not a member! Please sign up.");
    location.href = "index.html";
  }
  else{
  const uid = user.uid;

  get(child(dbRef, `users/` + uid)).then((snapshot) => {
    if (snapshot.exists()) {
      const member = snapshot.val().member;
      const admin = snapshot.val().admin;
      if (member == true) {
        if (admin == true) {
          location.href = "document.html";
        } else {
          location.href = "documentuser.html";
        }
      } else {
        
      }
    } else {
      console.log("No data");
    }
  });
  }
});
