// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA7o5ixoTN2uuCGZWUCjRvE1JyNdmDmLPY",
    authDomain: "eduquizdata.firebaseapp.com",
    databaseURL: "https://eduquizdata-default-rtdb.firebaseio.com",
    projectId: "eduquizdata",
    storageBucket: "eduquizdata.appspot.com",
    messagingSenderId: "181660775547",
    appId: "1:181660775547:web:dd670bae696579dea0dede"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const json_fetch_url = "https://bashamega.github.io/eduquiz/data/quiz/tiles.json"
const url = "https://bashamega.github.io/eduquiz/"


function Login() {
    const email = document.getElementById('user_name').value;
    const pass = document.getElementById('password').value;
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, pass)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user.email;
        console.log(user)
        document.getElementById('admin_dashboard').style.visibility = "visible"
        document.getElementById('name').innerHTML = `<p>Hello ${user}</p>`
        document.getElementById('login').parentNode.removeChild(document.getElementById('login'))
        check()
        
        // ...
    })
    .catch((error) => {
        document.getElementById('error').style.visibility = 'visible'
    });

  }
document.getElementById('Login_btn').addEventListener('click', Login)
