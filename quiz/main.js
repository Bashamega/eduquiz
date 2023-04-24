const quiz_id = decodeURI(window.location.href.split("?").pop());
document.querySelector('h1').innerText = quiz_id;

if (quiz_id == ""){
  window.location.href = "https://bashamega.github.io/eduquiz/"
}

function run(){
    fetch("../data/quiz/tiles.json")
    .then((res) => res.json())
    .then((data) => {
      if (Array.isArray(data) && data.length > 0) {
        const quiz = data.find((tile) => tile.name === quiz_id);
        if (quiz) {
          document.getElementById("title").innerHTML = quiz_id;
          const sets = quiz.term;
          for (const question_term of quiz.term) {
            const question_div = document.createElement("div");
            question_div.innerHTML = `<p>${question_term.question}</p><br><input type='text' name="q_${question_term.answer}">`;
            document.getElementById("options").append(question_div);
          }
        
        }
      }
    });

    document.getElementById("submit").addEventListener('click', ()=>{
      let score = 0;
      let correct = 0;
      let error = 0;
      const input = document.querySelectorAll('input')
      for (var i = 0; i < input.length; i++){
        const answer = input[i].name.replace('q_', '');
        if (input[i].value.toLowerCase() == answer.toLowerCase()){
          score++;
          correct++;
        }else{
          error++;
        }
      }
      localStorage.setItem('Score', String(score));
      let question = correct + error

      
      document.getElementById('container').style.visibility = 'hidden'
      
    })
}

console.log(run);
run();
