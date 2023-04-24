const quiz_id = decodeURI(window.location.href.split("?").pop());
function special_fun(){
  document.getElementById('special').style.visibility = 'visible'
  const score_ = localStorage.getItem('score')
  document.getElementById('score').innerText = `Score: ${score_}`
}
if (quiz_id == ""){
  window.location.href = "https://bashamega.github.io/eduquiz/"
}
if(localStorage.getItem('played') == 'true'){
  special_fun()
}else{
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

  document.addEventListener('DOMContentLoaded', function() {
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
      localStorage.setItem('played', 'true')
      window.location.reload()
      alert(`You got ${correct} out of ${input.length} correct! Your score is ${score}.`);
    })
    document.getElementById('reset').addEventListener('click', ()=>{
      localStorage.clear()
      window.location.reload()
    })
  })
}

