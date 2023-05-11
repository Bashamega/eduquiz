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
function latest(){
  let slides = 0
  fetch(json_fetch_url)
  .then((res) => res.json())
  .then((data) => {
    if (Array.isArray(data) && data.length > 0) {
      const titles = data.map((tile) => {
        const title_ = tile.name;
        return tile;
      });
      titles.forEach((title) => {
        
        const div = document.createElement("div");
        if(slides == 5){
        }else{
          div.classList.add(title.tags);
          div.classList.add('tile')

          const name_const = encodeURI(title.name);
          div.id = "list";
          div.innerHTML = `<heading>${title.name}</heading>`;

          
          document.getElementById("latest").append(div);
          slides = slides + 1
        }
        


      });
      const div = document.createElement("div");
        

      div.id = "";

      div.innerHTML = `<button>View all</button>`;
      document.getElementById("latest").append(div);
      div.addEventListener('click', function(){
        const close = document.getElementsByClassName('material-symbols-outlined')[0]
        close.addEventListener('click', function(){
          modal.close()
        })
        const modal = document.getElementById('dialog')
        modal.showModal()
        titles.forEach((title_) =>{
          const div = document.createElement("div");
          div.classList.add(title_.tags);
          div.classList.add('tile')

          const name_const = encodeURI(title_.name);
          div.id = "list";
          div.innerHTML = `<heading>${title_.name}</heading>`;

            
          modal.append(div);
          
        })
      })

    
    }
    
  })
  .catch((err) => {
    console.log(err);
  });
}

function Login() {
    const email = document.getElementById('user_name').value;
    const pass = document.getElementById('password').value;
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, pass)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user.email;
        console.log(user)
        document.getElementById('login').parentNode.removeChild(document.getElementById('login'))
        document.getElementById('admin_dashboard').style.visibility = "visible"
        document.getElementById('name').innerHTML = `<p>Hello ${user}</p>`
        sessionStorage.setItem('loader_done', true)
        latest()
        quiz()
        
        
        // ...
    })
    .catch((error) => {
        document.getElementById('error').style.visibility = 'visible'
    });

  }
document.getElementById('Login_btn').addEventListener('click', Login)
