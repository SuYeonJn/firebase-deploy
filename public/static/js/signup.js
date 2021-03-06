// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
//Third module is optionable (only to save in realtime database)
import {
  getDatabase,
  ref,
  set,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
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
const auth = getAuth(app);
const database = getDatabase(app);

// Sign up button is pressed

document.getElementById("signUp").addEventListener("click", function () {
  console.log("pressed");
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const passwordVerify = document.getElementById("pwverify").value;
  const username = document.getElementById("id").value;
  const name = document.getElementById("name").value;
  const year = document.getElementById("year").value;
  const month = document.getElementById("month").value;
  const day = document.getElementById("day").value;
  const gender = document.getElementById("gender").value;
  const job = document.getElementById("job").value;

  set(ref(database, "test/"), {
    test: "test",
  });

  if (password == passwordVerify) {
    // User is created in Authentication section, under User
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        // Signed in
        set(ref(database, "users/" + user.uid), {
          username: username,
          email: email,
          admin: false,
          member: true,
          name: name,
          birthYear: year,
          birthMonth: month,
          birthDay: day,
          gender: gender,
          job: job,
        });
        //Alert user that sign up was successful
        console.log("Created!");
        alert("User Created!");
        location.href = "index.html";
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        console.log(errorCode + errorMessage);
        alert(errorMessage);
      });
  } else {
    alert("Password does not match");
  }
});
